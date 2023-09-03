"use client";

import { Contact as ContactType } from "@prisma/client";
import SectionHeader from "../components/section-header";
import { Suspense, useState } from "react";
import NoData from "../components/no-data";
import ContactForm from "../components/contact-form";

interface IProps {
  initialData: ContactType[];
}
const Contact: React.FC<IProps> = ({ initialData }) => {
  const [openForm, setOpenForm] = useState(false);

  return (
    <div className="h-full">
      <SectionHeader title="Contact" onClick={() => setOpenForm(true)}>
        {openForm ? (
          <ContactForm />
        ) : (
          <Suspense fallback={"loading piece of shit..."}>
            {!initialData.length ? (
              <NoData type="CONTACT" />
            ) : (
              <>
                {initialData.map((item) => (
                  <div key={item.id}>{item.type}</div>
                ))}
              </>
            )}
          </Suspense>
        )}
      </SectionHeader>
    </div>
  );
};

export default Contact;
