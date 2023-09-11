"use client";
import SidebarNav from "@/components/sidebar-nav";

const Sidebar = () => {
  return (
    <aside
      className="
        left-0
        fixed
        bottom-0
        w-full
        h-14
        border-t
        bg-background

        sm:flex-col
        sm:w-16
        sm:top-0
        sm:border-r
        sm:h-screen
        z-30
      "
    >
      <SidebarNav />
    </aside>
  );
};

export default Sidebar;
