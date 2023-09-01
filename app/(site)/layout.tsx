import ProfileModal from "@/components/modals/edit-profile-modal";
import Sidebar from "@/components/sidebar";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Sidebar />
      <ProfileModal />
      <div
        className="
          sm:ml-16
          min-h-screen
        "
      >
        {children}
      </div>
    </>
  );
}
