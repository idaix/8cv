"use client";

import { Project } from "@prisma/client";
import ProjectCard from "./project-card";

interface IProps {
  projects: Project[];
}
const Projects: React.FC<IProps> = ({ projects }) => {
  return (
    <div className="space-y-5">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
};

export default Projects;
