"use client";

import { Project } from "@prisma/client";
import { MoveUpRightIcon } from "lucide-react";
import Link from "next/link";

interface IProps {
  project: Project;
}
const ProjectCard: React.FC<IProps> = ({ project }) => {
  return (
    <div className="text-sm grid grid-cols-4">
      <div className="col-span-4 sm:col-span-1 text-muted-foreground">
        {project.year}
      </div>
      <div className="col-span-4 sm:col-span-3">
        {/* title */}
        {project.link ? (
          <Link
            href={project.link}
            target="_blank"
            className="flex items-center hover:underline"
          >
            {project.title}
            <MoveUpRightIcon className="h-3 w-3" />
          </Link>
        ) : (
          <p>{project.title}</p>
        )}
        {/* description */}
        <p className="text-muted-foreground mt-1">{project.description}</p>
      </div>
    </div>
  );
};

export default ProjectCard;
