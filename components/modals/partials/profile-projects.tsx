"use client";

import { Project } from "@prisma/client";

interface IProps {
  data?: Project[];
}

const Projects: React.FC<IProps> = ({ data }) => {
  return <div>Projects here {data?.map((item) => "hello")}</div>;
};

export default Projects;
