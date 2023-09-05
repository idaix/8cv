import Navbar from "@/components/navbar";
import { getFeed } from "@/lib/get-feed";
import { Project } from "@prisma/client";
const Feed = async () => {
  const feed: Project[] = await getFeed();
  return (
    <main className="h-screen flex flex-col">
      <Navbar />

      <div className="py-5">
        {feed.map((item) => (
          <div key={item.id}>{item.title}</div>
        ))}
      </div>
    </main>
  );
};

export default Feed;
