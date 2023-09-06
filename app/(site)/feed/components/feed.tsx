import { Project } from "@prisma/client";
import { Suspense } from "react";
import FeedSkeleton from "./feed-skeleton";
import Link from "next/link";

interface FeedProps {
  data: Project[];
}

const Feed: React.FC<FeedProps> = ({ data }) => {
  return (
    <section className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 px-5">
      <Suspense fallback={<FeedSkeleton />}>
        {data.map((item) => (
          <div className="bg-muted p-10 w-full" key={item.id}>
            {item.title} by{" "}
            <Link href={`/${item.profileId}`}>{item.profileId}</Link>
          </div>
        ))}
      </Suspense>
    </section>
  );
};

export default Feed;
