"use client";

import { useFormState, useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { postMessageAction } from "@/lib/actions";
import { useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { useStableUserId } from "@/hooks/use-stable-user-id";
import { Card, CardContent } from "../ui/card";
import { Loader2 } from "lucide-react";

type MessagePostFormProps = {
  flightNumber: string;
};

const formSchema = z.object({
  message: z.string().min(5, "Message must be at least 5 characters long.").max(200, "Message cannot exceed 200 characters."),
  type: z.enum(["boarding", "gate", "delay", "info", "question"]),
});

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      Post Update
    </Button>
  );
}

export function MessagePostForm({ flightNumber }: MessagePostFormProps) {
  const [state, formAction] = useFormState(postMessageAction, { message: null, errors: {} });
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();
  const userId = useStableUserId();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
      type: "info",
    },
  });

  useEffect(() => {
    if (state.message === "Message posted successfully.") {
      form.reset();
      formRef.current?.reset();
      toast({
        title: "Success!",
        description: "Your message has been posted.",
      });
    } else if (state.message === "Validation failed." || state.message === "Failed to post message.") {
      toast({
        variant: "destructive",
        title: "Error",
        description: state.message,
      });
    }
  }, [state, form, toast]);

  if (!userId) {
    return <div className="h-24"><Loader2 className="m-auto h-6 w-6 animate-spin text-muted-foreground" /></div>
  }

  return (
    <Card>
        <CardContent className="p-4">
            <Form {...form}>
                <form
                    ref={formRef}
                    action={formAction}
                    className="space-y-4"
                >
                    <input type="hidden" name="flightNumber" value={flightNumber} />
                    <input type="hidden" name="userId" value={userId} />

                    <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                <Textarea
                                    placeholder={`Posting as ${userId}. Share a helpful update...`}
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
                                    </SelectTrigger>
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
                        <SubmitButton />
                    </div>
                </form>
            </Form>
        </CardContent>
    </Card>
  );
}
