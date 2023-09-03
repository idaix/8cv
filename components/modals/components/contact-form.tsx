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
import { zodResolver } from "@hookform/resolvers/zod";
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
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "",
      link: "",
    },
  });
  return (
    <section className=" h-full">
      <Form {...form}>
        <form className="grid gap-y-3">
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
        </form>
      </Form>
    </section>
  );
};

export default ContactForm;
