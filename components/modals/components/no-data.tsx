"use client";

import {
  GraduationCapIcon,
  MessagesSquareIcon,
  RocketIcon,
} from "lucide-react";

type PossibleData = "PROJECT" | "CONTACT" | "EDUCATION";

const NoData = ({ type }: { type: PossibleData }) => {
  const typeToImageMap: Record<PossibleData, React.ReactNode> = {
    PROJECT: <RocketIcon className="h-32 w-32" strokeWidth={0.5} />,
    CONTACT: <MessagesSquareIcon className="h-32 w-32" strokeWidth={0.5} />,
    EDUCATION: <GraduationCapIcon className="h-32 w-32" strokeWidth={0.5} />,
  };
  return (
    <div className="h-full grid place-content-center">
      {typeToImageMap[type]}
    </div>
  );
};

export default NoData;
