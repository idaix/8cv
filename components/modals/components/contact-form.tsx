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
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  type: z.string().min(1).max(50),
  link: z.string().min(1),
});

type FormSchema = z.infer<typeof formSchema>;

interface IProps {
  // initialData?: Project;
}

const ContactForm: React.FC<IProps> = () => {
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "",
      link: "",
    },
  });

  const onSubmit = async (values: FormSchema) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `api/profile/${session?.user.username}/contact`,
        values
      );
      toast({
        title: `${res.data.type} link added.`,
      });
      router.refresh();
    } catch (error) {
      console.log("[ERROR_ON_CREATING_LINK]", error);
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
            name="type"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type*</FormLabel>
                <FormControl>
                  <Input placeholder="Personal, Github, etc" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="link"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Link*</FormLabel>
                <FormControl>
                  <Input placeholder="https://example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center justify-end">
            <Button type="submit">Save</Button>
          </div>
        </form>
      </Form>
    </section>
  );
};

export default ContactForm;
