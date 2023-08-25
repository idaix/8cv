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
          pb-20
          sm:pb-0
          sm:ml-16
          min-h-full
        "
      >
        {children}
      </div>
    </>
  );
}
