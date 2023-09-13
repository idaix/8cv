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
import { UploadButton } from "@/utils/uploadthing";
import { zodResolver } from "@hookform/resolvers/zod";
import { Project, ProjectImage } from "@prisma/client";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const currentYear = new Date().getFullYear();

const formSchema = z.object({
  title: z.string().min(1).max(100),
  year: z.coerce
    .number()
    .min(1000, {
      message: `Oh no, bruh! 🙄 Unless you've got a time machine hidden somewhere. Please check your project year again; it should be between 1000 and ${currentYear}. Time travel isn't on our feature list! 😉`,
    })
    .max(currentYear),
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
  client: z.string(),
  description: z.string(),
  images: z.object({ url: z.string() }).array(),
});

type FormSchema = z.infer<typeof formSchema>;

interface IProps {
  initialData?: Project & {
    images: ProjectImage[];
  };
}

const ProjectForm: React.FC<IProps> = ({ initialData }) => {
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData?.title || "",
      link: initialData?.link || "",
      client: initialData?.client || "",
      description: initialData?.description || "",
      year: initialData?.year || currentYear,
      images: initialData?.images || [],
    },
  });

  const onSubmit = async (values: FormSchema) => {
    setLoading(true);
    try {
      if (initialData) {
        const res = await axios.patch(
          `api/profile/${session?.user.username}/project/${initialData.id}`,
          values
        );
        toast({
          title: `Project "${res.data.title}" updated.`,
        });
      } else {
        const res = await axios.post(
          `api/profile/${session?.user.username}/project`,
          values
        );
        toast({
          title: `Project "${res.data.title}" added.`,
        });
      }
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
          <FormField
            name="images"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="border p-2 rounded-md">
                    <div className="flex flex-wrap gap-2">
                      {field.value.map((image) => (
                        <div
                          key={image.url}
                          className="relative w-[100px] h-[100px]"
                        >
                          <div className="absolute top-1 right-1 z-10"></div>
                          <Image
                            src={image.url}
                            alt="Image"
                            fill
                            className="object-cover rounded-md"
                          />
                        </div>
                      ))}
                    </div>
                    <div className="">
                      <UploadButton
                        endpoint="imageUploader"
                        onClientUploadComplete={(res) => {
                          if (res) {
                            const newFiles = res.map((file) => ({
                              url: file.url,
                            }));
                            field.onChange([...field.value, ...newFiles]);
                          }
                        }}
                        onUploadError={(error: Error) => {
                          // Do something with the error.
                          toast({
                            variant: "destructive",
                            title: "Upload error",
                            description: `ERROR! ${error.message}`,
                          });
                        }}
                      />
                    </div>
                  </div>
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

export default ProjectForm;
