"use client";

import { Contact } from "@prisma/client";
import axios from "axios";
import { MoveUpRightIcon } from "lucide-react";
import Link from "next/link";
import React, { ReactElement, useState } from "react";
import { toast } from "./ui/use-toast";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import ContactForm from "./modals/components/contact-form";

interface IProps {
  link: Contact;
  allowEdit?: boolean;
  setOpenForm?: (value: boolean) => void;
  setForm?: (value: ReactElement) => void;
}

const ContactCard: React.FC<IProps> = ({
  link,
  allowEdit,
  setForm,
  setOpenForm,
}) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleDelete = async () => {
    setLoading(true);
    try {
      await axios.delete(`api/profile/${link.profileId}/contact/${link.id}`);
      toast({
        title: "Successfully deleted",
      });
      router.refresh();
    } catch (error) {
      console.error("DELETE_LINK_ERROR", error);
      toast({
        variant: "destructive",
        title: "Something went wrong!",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateClick = () => {
    if (setForm && setOpenForm && allowEdit) {
      setForm(<ContactForm initialData={link} />);
      setOpenForm(true);
    } else {
      return null;
    }
  };
  return (
    <li className="text-sm grid grid-cols-4" key={link.id}>
      <div className="col-span-4 sm:col-span-1 text-muted-foreground">
        {link.type}
      </div>
      <Link
        href={link.link}
        target="_blank"
        className="col-span-4 sm:col-span-3 flex items-center hover:underline"
      >
        {link.link}
        <MoveUpRightIcon className="h-3 w-3" />
      </Link>
      {allowEdit && (
        <div className="mt-1 col-span-4 sm:col-span-3 sm:col-start-2 flex items-center gap-x-4">
          <Button
            onClick={handleUpdateClick}
            disabled={loading}
            variant="link"
            className="text-primary/40 transition hover:text-primary/75 text-xs h-auto p-0 decoration-transparent font-light"
          >
            Edit
          </Button>
          <Button
            onClick={handleDelete}
            disabled={loading}
            variant="link"
            className="text-primary/40 transition hover:text-primary/75 text-xs h-auto p-0 decoration-transparent font-light"
          >
            Delete
          </Button>
        </div>
      )}
    </li>
  );
};

export default ContactCard;
