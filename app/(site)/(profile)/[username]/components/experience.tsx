"use client";

import ExperienceCard from "@/components/experience-card";
import { Experience as ExperienceType } from "@prisma/client";
interface IProps {
  data: ExperienceType[];
}
const Experience: React.FC<IProps> = ({ data }) => {
  return (
    <div className="space-y-5">
      {data.map((experience) => (
        <ExperienceCard key={experience.id} data={experience} />
      ))}
    </div>
  );
};

export default Experience;
