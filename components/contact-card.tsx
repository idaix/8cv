"use client";

import { Contact } from "@prisma/client";
import { MoveUpRightIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

interface IProps {
  link: Contact;
}

const ContactCard: React.FC<IProps> = ({ link }) => {
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
    </li>
  );
};

export default ContactCard;
