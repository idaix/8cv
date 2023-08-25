import axios from "axios";
import ProfileGeneral from "./components/profile-general";
import prismadb from "@/lib/prismadb";
import Section from "./components/section";

const MyProfile = async ({ params }: { params: { username: string } }) => {
  // const response = await axios.get(`api/profile/${params.username}`);
  // console.log(response);
  const profile = await prismadb.profile.findUnique({
    where: {
      username: params.username,
    },
    include: {
      user: true,
    },
  });
  console.log(profile);

  return (
    <main className="h-full">
      <div
        className="
          px-3 py-3
          sm:py-20
          sm:p-0
          sm:w-[555px]
          mx-auto
          h-full

          
        "
      >
        <div className="grid gap-y-16">
          <ProfileGeneral profile={profile} />
          <Section title="Projects">/Projects SECTION HERE/</Section>
          <Section title="Contact">/Contact SECTION HERE/</Section>
        </div>
      </div>
    </main>
  );
};

export default MyProfile;
