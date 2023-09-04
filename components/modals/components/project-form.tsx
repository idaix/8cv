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
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const currentYear = new Date().getFullYear();

const formSchema = z.object({
  title: z.string().min(1).max(100),
  year: z.coerce.number().min(2000).max(currentYear),
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
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      link: "",
      client: "",
      description: "",
      year: currentYear,
    },
  });

  const onSubmit = async (values: FormSchema) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `api/profile/${session?.user.username}/project`,
        values
      );
      toast({
        title: `Project "${res.data.title}" added.`,
      });
      router.refresh();
    } catch (error) {
      console.log("[ERROR_ON_CREATING_PROJECT]", error);
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
            name="title"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title*</FormLabel>
                <FormControl>
                  <Input disabled={loading} placeholder="Woooof" {...field} />
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
                  <Input
                    disabled={loading}
                    type="number"
                    placeholder={currentYear.toString()}
                    {...field}
                  />
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
                  <Input
                    disabled={loading}
                    placeholder="Acme inc."
                    {...field}
                  />
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
            name="description"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    disabled={loading}
                    placeholder="Tell us about your project"
                    {...field}
                  ></Textarea>
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

export default ProjectForm;
