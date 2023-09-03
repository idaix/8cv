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
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Profile, Project } from "@prisma/client";
import { useForm } from "react-hook-form";
import * as z from "zod";

const currentYear = new Date().getFullYear();

const formSchema = z.object({
  title: z.string().min(1).max(100),
  year: z.number().min(2000).max(currentYear),
  link: z.string().regex(/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i, {
    message: "Invalid URL",
  }),
  client: z.string(),
  description: z.string(),
});

type FormSchema = z.infer<typeof formSchema>;

interface IProps {
  // initialData?: Project;
}

const ProjectForm: React.FC<IProps> = () => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      link: "",
      client: "",
      description: "",
    },
  });
  return (
    <section className=" h-full">
      <Form {...form}>
        <form className="grid gap-y-3">
          <FormField
            name="title"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title*</FormLabel>
                <FormControl>
                  <Input placeholder="Woooof" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="year"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Year*</FormLabel>
                <FormControl>
                  <Input placeholder={currentYear.toString()} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="client"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company or client</FormLabel>
                <FormControl>
                  <Input placeholder="Acme inc." {...field} />
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
                <FormLabel>Link to project</FormLabel>
                <FormControl>
                  <Input placeholder="https://example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="description"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us about your project"
                    {...field}
                  ></Textarea>
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

export default ProjectForm;
