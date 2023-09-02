"use client";

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
  data?: Profile;
}

const General: React.FC<IProps> = ({ data }) => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      headline: "",
      about: "",
      location: "",
      website: "",
      displayName: "",
      imageURL: "",
    },
  });
  return (
    <section className="bg-green-400/10 h-full">hello {data?.name}</section>
  );
};

export default General;
