import prismadb from "@/lib/prismadb";
import Navbar from "./components/navbar";
import JobCard from "./components/job-card";

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
        {data.map((item) => (
          <JobCard data={item} key={item.id} />
        ))}
      </div>
    </main>
  );
};

export default WorkPage;
