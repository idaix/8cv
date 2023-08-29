import { usePathname, useRouter } from "next/navigation";
import { SearchIcon, FlameIcon, SendIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import UserDropdown from "./user-dropdown";
import { useSession } from "next-auth/react";
const SidebarNav = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();

  type NavLinks = {
    label: string;
    active: boolean;
    path: string;
    onClick?: () => void;
    icon: React.ReactNode;
  };

  const navLinks: NavLinks[] = [
    {
      label: "Explore",
      path: "/",
      active: pathname === "/",
      icon: <FlameIcon className="h-6 w-6" />,
    },
    {
      label: "Search",
      path: "#search",
      onClick: () => router.push("#search"),
      active: pathname === "/#search",
      icon: <SearchIcon className="h-6 w-6" />,
    },
    {
      label: "Replies",
      path: "/replies",
      active: pathname === "/replies",
      icon: <SendIcon className="h-6 w-6" />,
    },
  ];
  return (
    <ul
      className="
          relative
          flex
          w-full
          h-full 
          items-center
          gap-x-3 
          gap-y-6 
          px-4
          bg-red
          justify-around
          sm:py-5
          sm:justify-center 
          sm:flex-col

      "
    >
      {navLinks.map((link) => (
        <li
          key={link.label}
          className={cn(
            "text-muted-foreground hover:text-primary cursor-pointer sm:w-full flex justify-center transition-all",
            link.active && "text-primary"
          )}
        >
          <Link href={link.path}>{link.icon}</Link>
        </li>
      ))}
      {session && (
        <div className="sm:absolute bottom-3">
          <UserDropdown user={session.user} />
        </div>
      )}
    </ul>
  );
};

export default SidebarNav;
