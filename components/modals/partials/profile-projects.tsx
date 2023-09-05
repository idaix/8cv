"use client";

import { Project } from "@prisma/client";
import SectionHeader from "../components/section-header";
import NoData from "../components/no-data";
import { Suspense, useState } from "react";
import ProjectForm from "../components/project-form";
import ProjectCard from "@/components/project-card";

interface IProps {
  initialData: Project[];
}

const Projects: React.FC<IProps> = ({ initialData }) => {
  const [openForm, setOpenForm] = useState(false);
  return (
    <div className="h-full">
      <SectionHeader title="Projects" onClick={() => setOpenForm(true)}>
        {openForm ? (
          <ProjectForm />
        ) : (
          <Suspense fallback={"loading piece of shit..."}>
            {!initialData.length ? (
              <NoData type="PROJECT" />
            ) : (
              <div className="space-y-5">
                {initialData.map((item) => (
                  <ProjectCard key={item.id} project={item} />
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
