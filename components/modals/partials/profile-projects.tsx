"use client";

import { Project, ProjectImage } from "@prisma/client";
import SectionHeader from "../components/section-header";
import NoData from "../components/no-data";
import { Suspense, useState } from "react";
import ProjectForm from "../components/project-form";
import ProjectCard from "@/components/project-card";

interface IProps {
  initialData: (Project & {
    images: ProjectImage[];
  })[];
}

const Projects: React.FC<IProps> = ({ initialData }) => {
  const [openForm, setOpenForm] = useState(false);
  const [form, setForm] = useState(<ProjectForm />);
  return (
    <div className="h-full">
      <SectionHeader title="Projects" onClick={() => setOpenForm(true)}>
        {openForm ? (
          <>{form}</>
        ) : (
          <Suspense fallback={"loading piece of shit..."}>
            {!initialData.length ? (
              <NoData type="PROJECT" />
            ) : (
              <div className="space-y-5 pb-10">
                {initialData.map((item) => (
                  <ProjectCard
                    key={item.id}
                    allowEdit
                    project={item}
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

export default Projects;
