// import axios from "axios";
import ProfileGeneral from "./components/profile-general";
import prismadb from "@/lib/prismadb";
import Section from "./components/section";
import Projects from "./components/projects";
import Contact from "./components/contact";
import { links, projects } from "@/localdata";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: { username: string };
}): Promise<Metadata> {
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
  if (!profile) {
    return {
      title: "404 | No profile asociated with that username!",
      description:
        "404 error, Page not found! No profile asociated with that username!",
    };
  }
  return {
    title: `${profile?.name} ${profile?.headline && "| " + profile?.headline}`,
    description: profile?.about,
  };
}

const MyProfile = async ({ params }: { params: { username: string } }) => {
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

  if (!profile) {
    notFound();
  }

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
