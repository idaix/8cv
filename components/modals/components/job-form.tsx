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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
          <div className="grid gap-3 grid-cols-2">
            <FormField
              name="type"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type*</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger disabled={loading}>
                        <SelectValue placeholder="Select job type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="full-time">Full time</SelectItem>
                      <SelectItem value="part-time">Part time</SelectItem>
                      <SelectItem value="intership">Intership</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="location"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location*</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger disabled={loading}>
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="remote">Remote</SelectItem>
                      <SelectItem value="onsite">Onsite</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
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

          {/* select => location */}
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
