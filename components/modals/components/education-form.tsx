"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Education } from "@prisma/client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";

const currentYear = new Date().getFullYear();

const formSchema = z.object({
  title: z.string().max(100),
  fromYear: z.coerce
    .number()
    .min(1000, {
      message: `Oh no, bruh! 🙄 Unless you've got a time machine hidden somewhere. Please check your project year again; it should be between 1000 and ${currentYear}. Time travel isn't on our feature list! 😉`,
    })
    .max(currentYear),
  toYear: z.coerce.number().max(currentYear),

  university: z.string(),
  location: z.string(),
  description: z.string(),
});

type FormSchema = z.infer<typeof formSchema>;
interface IProps {
  initialData?: Education;
}

const EducationForm: React.FC<IProps> = ({ initialData }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData?.title ?? "",
      university: initialData?.university ?? "",
      description: initialData?.description ?? "",
      fromYear: initialData?.fromYear ?? currentYear,
      toYear: initialData?.toYear ?? currentYear,
      location: initialData?.location ?? "",
    },
  });

  const onSubmit = async (values: FormSchema) => {
    setLoading(true);
    try {
      if (initialData) {
        const res = await axios.patch(
          `api/profile/${session?.user.username}/education/${initialData.id}`,
          values
        );
        toast({
          title: `"${res.data.title}" updated.`,
        });
      } else {
        const res = await axios.post(
          `api/profile/${session?.user.username}/education`,
          values
        );
        toast({
          title: `"${res.data.title}" added.`,
        });
      }
      router.refresh();
    } catch (error) {
      console.log("[ERROR_ON_CREATING_EDUCATION]", error);
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
            name="fromYear"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>From*</FormLabel>
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
            name="toYear"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>To*</FormLabel>
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
            name="title"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Degree or certification</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="Bachelor of IT"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="university"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>School or institution*</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="Harvard University"
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
                <FormLabel>location</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="Where was it"
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
                    placeholder="Add some details"
                    {...field}
                  ></Textarea>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center justify-end mb-10">
            <Button disabled={loading} type="submit">
              Save
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
};

export default EducationForm;
