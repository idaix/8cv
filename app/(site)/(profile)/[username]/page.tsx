// import axios from "axios";
import ProfileGeneral from "./components/profile-general";
import prismadb from "@/lib/prismadb";
import Section from "./components/section";
import Projects from "./components/projects";
import Contact from "./components/contact";
import { links, projects } from "@/localdata";

const MyProfile = async ({ params }: { params: { username: string } }) => {
  // const response = await axios.get(`api/profile/${params.username}`);
  // console.log(response);
  const profile = await prismadb.profile.findUnique({
    where: {
      username: params.username,
    },
    include: {
      user: true,
      projects: true,
      links: true,
    },
  });
  console.log(profile);

  return (
    <main className="h-full">
      <div
        className="
          px-4 py-5
          sm:py-20
          sm:p-0
          sm:w-[555px]
          mx-auto
          h-full
        "
      >
        <div className="grid gap-y-16">
          <ProfileGeneral profile={profile} />
          <Section title="Projects">
            <Projects projects={projects} />
          </Section>
          <Section title="Contact">
            <Contact links={links} />
          </Section>
        </div>
      </div>
    </main>
  );
};

export default MyProfile;