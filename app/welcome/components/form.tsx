"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { ChangeEvent, useState } from "react";
import axios, { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  username: z
    .string()
    .min(1)
    .max(50)
    .regex(/^[a-zA-Z0-9]+$/, {
      message: "String should contain only letters and numbers",
    }),
  displayName: z.string().min(1).max(50),
  userId: z.string().min(1),
});

type FormSchema = z.infer<typeof formSchema>;

const WelcomeForm = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      displayName: "",
      userId: session?.user.id,
    },
  });

  const handleUsernameOnChange = async (
    e: ChangeEvent<HTMLInputElement>,
    onChnage: (value: string) => void
  ) => {
    onChnage(e.target.value);
    try {
      setLoading(true);
      const res = await axios.get(`api/profile/${e.target.value}`);

      form.setError("username", {
        type: "manual",
        message: !res.data.isValid ? "This username is already taken" : "",
      });
    } catch (error) {
      console.log("USERNAME_CHECK_ERROR", error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (values: FormSchema) => {
    console.log("Username: ", values.username);
    try {
      setLoading(true);
      const res = await axios.post("api/profile", values);
      console.log("res:", res);

      router.push(`/${res.data.username}`);
    } catch (error) {
      const err = error as AxiosError;
      console.log("[ERROR_ON_CREATING_PROFILE]", error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: err.response?.data as string,
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <Form {...form}>
      <form className="grid gap-y-3" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  placeholder="username"
                  value={field.value}
                  onChange={(e) => handleUsernameOnChange(e, field.onChange)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="displayName"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Display name</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="mt-2 text-end">
          <Button disabled={loading} type="submit" variant={"default"}>
            Continue
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default WelcomeForm;
