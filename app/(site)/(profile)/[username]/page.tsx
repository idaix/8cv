import axios from "axios";
import ProfileGeneral from "./components/profile-general";
import prismadb from "@/lib/prismadb";

const MyProfile = async ({ params }: { params: { username: string } }) => {
  // const response = await axios.get(`api/profile/${params.username}`);
  // console.log(response);
  const profile = await prismadb.profile.findUnique({
    where: {
      username: params.username,
    },
  });
  console.log(profile);

  return (
    <main className="h-full">
      <div className="px-3 py-3 sm:py-28 sm:p-0 sm:w-[555px] mx-auto h-full">
        <ProfileGeneral profile={profile} />
      </div>
    </main>
  );
};

export default MyProfile;
