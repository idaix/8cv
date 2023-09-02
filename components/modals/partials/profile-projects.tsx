"use client";

import { Project } from "@prisma/client";

interface IProps {
  initialData?: Project[];
}

const Projects: React.FC<IProps> = ({ initialData }) => {
  return <div>Projects here {initialData?.map((item) => "hello")}</div>;
};

export default Projects;
