// import axios from "axios";
import ProfileGeneral from "./components/profile-general";
import prismadb from "@/lib/prismadb";
import Section from "./components/section";
import Projects from "./components/projects";
import Contact from "./components/contact";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import ProfileModal from "@/components/modals/edit-profile-modal";
import { CircleOffIcon } from "lucide-react";

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
      projects: {
        orderBy: {
          year: "desc",
        },
      },
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

  let hasContent: boolean = false;
  if (
    profile.about &&
    profile.links.length > 0 &&
    profile.projects.length > 0
  ) {
    hasContent = true;
  }

  return (
    <main className="h-full">
      <ProfileModal
        general={profile}
        projects={profile.projects}
        links={profile.links}
      />
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

          {hasContent ? (
            <>
              {profile.projects.length > 0 && (
                <Section title="Projects">
                  <Projects projects={profile.projects} />
                </Section>
              )}
              {profile.links.length > 0 && (
                <Section title="Contact">
                  <Contact links={profile.links} />
                </Section>
              )}
            </>
          ) : (
            <div>
              <p className="flex items-center gap-x-2">
                <CircleOffIcon className="h-5 w-5" />
                Nothing here yet!
              </p>
              <p className="text-sm">
                It looks like {profile.name} is still working on it.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default MyProfile;
