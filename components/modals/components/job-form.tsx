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
import { Job } from "@prisma/client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  companyName: z.string().min(1).max(100),
  companyURL: z.string().min(1).max(100),
  // companyLogo: z.string().min(1).max(100),
  jobTitle: z.string().min(1).max(100),
  link: z
    .string()
    .optional()
    .refine(
      (value) => {
        if (!value) return true; // If value is not provided, it's valid.
        return /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(value); // Check URL format.
      },
      {
        message: "Invalid URL",
      }
    ),
  description: z.string(),
  type: z.string(),
  location: z.string(),
  keywords: z.string(),
});

type FormSchema = z.infer<typeof formSchema>;

interface IProps {
  initialData?: Job;
}

const JobForm: React.FC<IProps> = ({ initialData }) => {
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: initialData?.companyName ?? "",
      companyURL: initialData?.companyURL ?? "",
      jobTitle: initialData?.jobTitle ?? "",
      description: initialData?.description ?? "",
      keywords: initialData?.keywords ?? "",
      link: initialData?.link ?? "",
      location: initialData?.location ?? "",
      type: initialData?.type ?? "",
    },
  });

  const onSubmit = async (values: FormSchema) => {
    setLoading(true);
    try {
      if (initialData) {
        await axios.patch(
          `api/profile/${session?.user.username}/job/${initialData.id}`,
          values
        );
        toast({
          title: `Successfully updated.`,
        });
      } else {
        await axios.post(`api/profile/${session?.user.username}/job`, values);
        toast({
          title: `Successfully added.`,
        });
      }
      router.refresh();
    } catch (error) {
      console.log("[ERROR_ON_CREATING_OR_UPDATE_JOB]", error);
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
          <div className="grid grid-cols-2 gap-x-3">
            <FormField
              name="companyName"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name*</FormLabel>
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
              name="companyURL"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company URL*</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="www.example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            name="jobTitle"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job title*</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="Frontend developer"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="keywords"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>keywords</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="ReactJs, tailwind CSS"
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
                <FormLabel>Apply link*</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="www.apply.your_website.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* select => type */}
          {/* select => location */}
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

          <div className="flex items-center justify-end ">
            <Button disabled={loading} type="submit">
              Save
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
};

export default JobForm;
