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
import { Profile } from "@prisma/client";
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
  return (
    <section className=" h-full">
      <Form {...form}>
        <form className="grid gap-y-3">
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
                  <Input placeholder="Name" {...field} />
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
                  <Input placeholder="Designer, Developer, etc" {...field} />
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
                  <Input placeholder="Where you're based" {...field} />
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
                  <Input placeholder="https://example.com" {...field} />
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
                  {/* <Input placeholder="Tell us about yourself" {...field} /> */}
                  <Textarea
                    placeholder="Tell us about yourself"
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

export default General;
