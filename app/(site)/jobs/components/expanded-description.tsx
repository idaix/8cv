"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

const ExpandedDescription = ({ description }: { description: string }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!description) return null;

  const handleClick = () => {
    setIsExpanded((prev) => !prev);
  };
  return (
    <p
      onClick={handleClick}
      className={cn(
        "whitespace-pre-line text-muted-foreground mt-1 text-sm text-justify",
        !isExpanded && "line-clamp-3"
      )}
    >
      {description}
    </p>
  );
};

export default ExpandedDescription;
