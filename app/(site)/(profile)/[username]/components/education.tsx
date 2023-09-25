"use client";

import EducationCard from "@/components/education-card";
import { Education as EducationType } from "@prisma/client";
interface IProps {
  data: EducationType[];
}
const Education: React.FC<IProps> = ({ data }) => {
  return (
    <div className="space-y-5">
      {data.map((education) => (
        <EducationCard key={education.id} data={education} />
      ))}
    </div>
  );
};

export default Education;
