"use client";

import { Experience as ExperienceType } from "@prisma/client";
import SectionHeader from "../components/section-header";
import NoData from "../components/no-data";
import { Suspense, useState } from "react";
import ExperienceForm from "../components/experience-form";
import ExperienceCard from "@/components/experience-card";

interface IProps {
  initialData: ExperienceType[];
}

const Experience: React.FC<IProps> = ({ initialData }) => {
  const [openForm, setOpenForm] = useState(false);
  const [form, setForm] = useState(<ExperienceForm />);
  return (
    <div className="h-full">
      <SectionHeader title="Education" onClick={() => setOpenForm(true)}>
        {openForm ? (
          <>{form}</>
        ) : (
          <Suspense fallback={"...loading..."}>
            {!initialData.length ? (
              <NoData type="EXPERIENCE" />
            ) : (
              <div className="space-y-5 pb-10">
                {initialData.map((item) => (
                  <ExperienceCard
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

export default Experience;
