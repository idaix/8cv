import Sidebar from "@/components/sidebar";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Sidebar />
      <div className="mb-50 sm:mb-0 sm:ml-16 h-full">{children}</div>
    </>
  );
}
