"use client";

import { Contact as ContactType } from "@prisma/client";
import SectionHeader from "../components/section-header";
import { Suspense, useState } from "react";
import NoData from "../components/no-data";
import ContactForm from "../components/contact-form";
import ContactCard from "@/components/contact-card";

interface IProps {
  initialData: ContactType[];
}
const Contact: React.FC<IProps> = ({ initialData }) => {
  const [openForm, setOpenForm] = useState(false);
  const [form, setForm] = useState(<ContactForm />);

  return (
    <div className="h-full">
      <SectionHeader title="Contact" onClick={() => setOpenForm(true)}>
        {openForm ? (
          <>{form}</>
        ) : (
          <Suspense fallback={"loading piece of shit..."}>
            {!initialData.length ? (
              <NoData type="CONTACT" />
            ) : (
              <div className="space-y-5">
                {initialData.map((item) => (
                  <ContactCard
                    key={item.id}
                    link={item}
                    allowEdit
                    setForm={setForm}
                    setOpenForm={setOpenForm}
                  />
                ))}
              </div>
            )}
          </Suspense>
        )}
      </SectionHeader>
    </div>
  );
};

export default Contact;
