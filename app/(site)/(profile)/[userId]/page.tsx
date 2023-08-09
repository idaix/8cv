import ProfileGeneral from "./components/profile-general";

const MyProfile = ({ params }: { params: { userId: string } }) => {
  return (
    <main className="h-full">
      <div className="px-3 py-3 sm:py-28 sm:p-0 sm:w-[555px] mx-auto h-full">
        <ProfileGeneral />
      </div>
    </main>
  );
};

export default MyProfile;
