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
import getCurrentUser from "@/app/api/actions/getCurrentUser";
import { toast } from "@/components/ui/use-toast";
import Education from "./components/education";
import Experience from "./components/experience";

// --- dynamic metadata ---
// --- Profile exist => show name ---
// --- Profile !exist => show not found message ---
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
  // how it works?
  // first, we fetch the profiles [get the visited Profile & the visitor Profile]
  // then, we'll create a relation between the visitor and the owner of this profile

  const profile = await prismadb.profile.findUnique({
    where: {
      username: params.username,
    },
    include: {
      user: true,
      projects: {
        include: {
          images: true,
        },
      },
      links: true,
      education: true,
      experience: true,
    },
  });

  if (!profile) {
    notFound();
  }

  const currentUser = await getCurrentUser();
  if (currentUser?.id) {
    const currentProfile = await prismadb.profile.findUnique({
      where: {
        userId: currentUser.id,
      },
    });
    if (
      currentProfile?.username &&
      currentProfile?.username !== profile.username
    ) {
      try {
        const pv = await prismadb.profileViwes.create({
          data: {
            visitor: currentProfile.username,
            owner: profile.username,
          },
        });

        if (pv.id) {
          toast({
            title: "PV created <3",
          });
        }
      } catch (error) {
        console.log("error whene creating pv", error);
      }
    }
  }

  let hasContent: boolean = false;
  if (
    profile.about ||
    profile.links.length > 0 ||
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
        education={profile.education}
        experience={profile.experience}
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
              {profile.education.length > 0 && (
                <Section title="Education">
                  <Education data={profile.education} />
                </Section>
              )}
              {profile.experience.length > 0 && (
                <Section title="Experience">
                  <Experience data={profile.experience} />
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
