"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useUser, useFirestore } from "@/firebase";
import { Card, CardContent } from "../ui/card";
import { Loader2 } from "lucide-react";
import { postMessage } from "@/lib/firestore-mutations";

type MessagePostFormProps = {
  flightNumber: string;
};

const formSchema = z.object({
  text: z.string().min(5, "Message must be at least 5 characters long.").max(200, "Message cannot exceed 200 characters."),
  type: z.enum(["boarding", "gate", "delay", "info", "question"]),
});

type FormData = z.infer<typeof formSchema>;

export function MessagePostForm({ flightNumber }: MessagePostFormProps) {
  const { toast } = useToast();
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
      type: "info",
    },
  });

  const { formState, handleSubmit, reset } = form;

  const onSubmit = async (data: FormData) => {
    if (!user || !firestore) {
        toast({ variant: "destructive", title: "You must be signed in to post." });
        return;
    }
    
    await postMessage(firestore, flightNumber, { ...data, userId: user.uid });
    
    reset();
    toast({
        title: "Success!",
        description: "Your message has been posted.",
    });
  };

  if (isUserLoading) {
    return <div className="h-24 flex justify-center items-center"><Loader2 className="m-auto h-6 w-6 animate-spin text-muted-foreground" /></div>
  }
  
  if (!user) {
    return (
        <Card>
            <CardContent className="p-4 text-center text-muted-foreground">
                <p>Please sign in to join the conversation.</p>
            </CardContent>
        </Card>
    )
  }

  return (
    <Card>
        <CardContent className="p-4">
            <Form {...form}>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    <FormField
                        control={form.control}
                        name="text"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                <Textarea
                                    placeholder={`Share a helpful update...`}
                                    className="resize-none"
                                    {...field}
                                />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex justify-between items-center">
                       <FormField
                            control={form.control}
                            name="type"
                            render={({ field }) => (
                                <FormItem>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Select type" />
                                    </Trigger>
                                    </FormControl>
                                    <SelectContent>
                                    <SelectItem value="info">Info</SelectItem>
                                    <SelectItem value="gate">Gate</SelectItem>
                                    <SelectItem value="boarding">Boarding</SelectItem>
                                    <SelectItem value="delay">Delay</SelectItem>
                                    <SelectItem value="question">Question</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" disabled={formState.isSubmitting}>
                            {formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Post Update
                        </Button>
                    </div>
                </form>
            </Form>
        </CardContent>
    </Card>
  );
}
