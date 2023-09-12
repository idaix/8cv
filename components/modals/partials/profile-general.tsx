"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Profile } from "@prisma/client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  username: z
    .string()
    .min(1)
    .max(50)
    .regex(/^[a-zA-Z0-9]+$/, {
      message: "String should contain only letters and numbers",
    }),
  headline: z.string(),
  about: z.string(),
  location: z.string(),
  website: z.string().regex(/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i, {
    message: "Invalid URL",
  }),

  displayName: z.string().min(1).max(50),
  imageURL: z.string().min(0),
});

type FormSchema = z.infer<typeof formSchema>;

interface IProps {
  initialData?: Profile;
}

const General: React.FC<IProps> = ({ initialData }) => {
  const [loading, setLoading] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "unauthenticated") {
    console.log("Login required");
    redirect("/?event=openModal");
  }

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: initialData?.username,
      headline: initialData?.headline ?? "",
      about: initialData?.about ?? "",
      location: initialData?.location ?? "",
      website: initialData?.website ?? "",
      displayName: initialData?.name,
      imageURL: initialData?.image ?? "",
    },
  });

  const onSubmit = async (values: FormSchema) => {
    setLoading(true);
    try {
      await axios.patch(`api/profile/${session?.user.username}`, values);
      toast({
        title: "Profile updated, Thank you",
      });
      router.refresh();
    } catch (error) {
      console.log("[ERROR_ON_UPDATING_PROFILE]", error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className=" h-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-y-3">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    disabled
                    placeholder="username"
                    value={field.value}
                    onChange={field.onChange}
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
                  <Input disabled={loading} placeholder="Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="headline"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>What do you do?</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="Designer, Developer, etc"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="location"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="Where you're based"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="website"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="https://example.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="about"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>About</FormLabel>
                <FormControl>
                  <Textarea
                    disabled={loading}
                    placeholder="Tell us about yourself"
                    {...field}
                  ></Textarea>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center justify-end mb-10">
            <Button type="submit">Save</Button>
          </div>
        </form>
      </Form>
    </section>
  );
};

export default General;
