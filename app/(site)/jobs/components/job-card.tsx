import { Job } from "@prisma/client";
import { MoveUpRightIcon } from "lucide-react";
import Link from "next/link";

interface JobParams {
  data: Job;
}

const JobCard: React.FC<JobParams> = ({ data }) => {
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
        <p className="whitespace-pre-line text-muted-foreground mt-1 text-sm text-justify">
          {data.description}
        </p>
      </div>
      <div className="col-span-12 sm:col-span-3 mt-5 sm:mt-0 space-y-2">
        {data.type && (
          <div className="leading-none">
            <span className="text-muted-foreground text-xs">Type</span>
            <p>{data.type}</p>
          </div>
        )}
        {data.location && (
          <div className="leading-none">
            <span className="text-muted-foreground text-xs">Location</span>
            <p>{data.location}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobCard;
