"use client";

import { Project } from "@prisma/client";
import SectionHeader from "../components/section-header";
import NoData from "../components/no-data";
import { Suspense, useState } from "react";
import ProjectForm from "../components/project-form";

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
              <>
                {initialData.map((item) => (
                  <div key={item.id}>{item.title}</div>
                ))}
              </>
            )}
          </Suspense>
        )}
      </SectionHeader>
    </div>
  );
};

export default Projects;
