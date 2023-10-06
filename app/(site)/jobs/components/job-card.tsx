import { Button } from "@/components/ui/button";
import { Job } from "@prisma/client";
import { MoveUpRightIcon } from "lucide-react";
import Link from "next/link";

interface JobParams {
  data: Job;
}

const JobCard: React.FC<JobParams> = ({ data }) => {
  return (
    <div className="text-sm grid grid-cols-12 sm:gap-x-5 md:gap-x-10">
      <div className="col-span-12 sm:col-span-2 text-muted-foreground">
        {data.createdAt.toDateString()}
      </div>
      <div className="col-span-12 sm:col-span-7">
        <div className="flex items-center justify-between gap-x-2">
          {/* title */}
          {data.link ? (
            <Link
              href={data.link}
              target="_blank"
              className="flex items-center hover:underline"
            >
              {data.jobTitle}
              <MoveUpRightIcon className="h-3 w-3" />
            </Link>
          ) : (
            <p>{data.jobTitle}</p>
          )}
          {/* action button */}
          <Link href={data.link} target="_blank">
            Apply
          </Link>
        </div>
        <p className="whitespace-pre-line text-muted-foreground mt-1 text-sm text-justify">
          {data.description}
        </p>
      </div>
      <div className="col-span-12 sm:col-span-3 mt-5 sm:mt-0">
        <div className=" mb-2">
          <span className="text-muted-foreground">Type</span>
          <p>Intership</p>
        </div>
        <div className=" mb-2">
          <span className="text-muted-foreground">Location</span>
          <p>Remote</p>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
