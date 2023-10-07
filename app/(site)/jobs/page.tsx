import prismadb from "@/lib/prismadb";
import Navbar from "./components/navbar";
import JobCard from "./components/job-card";

export const revalidate = 3600;

const WorkPage = async () => {
  // gonna fetch data directly here
  const data = await prismadb.job.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main>
      <Navbar />
      <div className="p-5">
        <div className="grid gap-y-5">
          {data.map((item) => (
            <JobCard data={item} key={item.id} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default WorkPage;
