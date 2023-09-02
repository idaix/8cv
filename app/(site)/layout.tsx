import Sidebar from "@/components/sidebar";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Sidebar />
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
