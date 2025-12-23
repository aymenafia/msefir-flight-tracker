
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useUser, useFirestore, useAuth } from "@/firebase";
import { Card, CardContent } from "../ui/card";
import { Loader2 } from "lucide-react";
import { postMessage } from "@/lib/firestore-mutations";
import { initiateGoogleSignIn } from "@/firebase/auth-mutations";

type MessagePostFormProps = {
  flightId: string;
};

const formSchema = z.object({
  text: z.string().min(5, "Message must be at least 5 characters long.").max(200, "Message cannot exceed 200 characters."),
  type: z.enum(["boarding", "gate", "delay", "info", "question"]),
});

type FormData = z.infer<typeof formSchema>;

export function MessagePostForm({ flightId }: MessagePostFormProps) {
  const { toast } = useToast();
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const auth = useAuth();

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
    
    postMessage(firestore, flightId, { 
        ...data, 
        userId: user.uid,
        userDisplayName: user.displayName || 'Anonymous',
        userPhotoURL: user.photoURL || null,
    });
    
    reset();
    toast({
        title: "Success!",
        description: "Your message has been posted.",
    });
  };

  const handleGoogleSignIn = () => {
    initiateGoogleSignIn(auth);
  };

  if (isUserLoading) {
    return <div className="h-24 flex justify-center items-center"><Loader2 className="m-auto h-6 w-6 animate-spin text-muted-foreground" /></div>
  }
  
  if (!user || user.isAnonymous) {
    return (
        <Card>
            <CardContent className="p-4 text-center text-muted-foreground flex flex-col items-center gap-4">
                <p>Sign in to join the conversation.</p>
                <Button onClick={handleGoogleSignIn} variant="outline">
                    <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 381.7 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 126 21.2 174 55.9L381.2 150.2C345.4 116.7 298.6 96 248 96c-88.8 0-160.1 71.1-160.1 160s71.3 160 160.1 160c92.2 0 148.2-64.5 152.7-99.6H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
                    Sign in with Google
                </Button>
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
