"use client";

import ContactCard from "@/components/contact-card";
import { Contact as ContactType } from "@prisma/client";

interface IProps {
  links: ContactType[];
}

const Contact: React.FC<IProps> = ({ links }) => {
  return (
    <div className="">
      <ul className="space-y-3">
        {links.map((link) => (
          <ContactCard key={link.id} link={link} />
        ))}
      </ul>
    </div>
  );
};

export default Contact;
