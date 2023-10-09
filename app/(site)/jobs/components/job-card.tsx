import { Job } from "@prisma/client";
import { MoveUpRightIcon } from "lucide-react";
import Link from "next/link";
import ExpandedDescription from "./expanded-description";
import { Badge } from "@/components/ui/badge";

interface JobParams {
  data: Job;
}

const JobCard: React.FC<JobParams> = ({ data }) => {
  const keywordsList = data.keywords ? data.keywords.split(",") : [];
  return (
    <div className="text-sm grid grid-cols-12 sm:gap-x-5 md:gap-x-10 border-b pb-2">
      <div className="col-span-12 sm:col-span-2 text-muted-foreground">
        {data.createdAt.toDateString()}
      </div>
      <div className="col-span-12 sm:col-span-7">
        <div className="flex items-center justify-between gap-x-2">
          <Link
            href={data.link}
            target="_blank"
            className="flex items-center hover:underline"
          >
            Allpy for {'"' + data.jobTitle + '"'}
            <MoveUpRightIcon className="h-3 w-3" />
          </Link>
        </div>

        <ExpandedDescription description={data.description as string} />
      </div>
      <div className="col-span-12 sm:col-span-3 mt-5 sm:mt-0 space-y-2 flex flex-col">
        {data.type && (
          <div className="leading-none">
            <span className="text-muted-foreground text-xs">Type</span>
            <p className="capitalize">{data.type}</p>
          </div>
        )}
        {data.location && (
          <div className="leading-none">
            <span className="text-muted-foreground text-xs">Location</span>
            <p className="capitalize">{data.location}</p>
          </div>
        )}
        {keywordsList?.length > 0 && (
          <div className="flex-1 flex items-end">
            <div className="flex gap-2 mt-auto">
              {keywordsList.map((key) => (
                <Badge key={key} variant="outline">
                  {key}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobCard;
