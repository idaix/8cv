"use client";

import { Education as EducationType } from "@prisma/client";
import SectionHeader from "../components/section-header";
import NoData from "../components/no-data";
import { Suspense, useState } from "react";
import EducationForm from "../components/education-form";
import EducationCard from "@/components/education-card";

interface IProps {
  initialData: EducationType[];
}

const Education: React.FC<IProps> = ({ initialData }) => {
  const [openForm, setOpenForm] = useState(false);
  const [form, setForm] = useState(<EducationForm />);
  return (
    <div className="h-full">
      <SectionHeader title="Education" onClick={() => setOpenForm(true)}>
        {openForm ? (
          <>{form}</>
        ) : (
          <Suspense fallback={"...loading..."}>
            {!initialData.length ? (
              <NoData type="EDUCATION" />
            ) : (
              <div className="space-y-5 pb-10">
                {initialData.map((item) => (
                  <EducationCard
                    key={item.id}
                    data={item}
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

export default Education;
