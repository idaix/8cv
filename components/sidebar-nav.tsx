import { usePathname } from "next/navigation";
import { SearchIcon, FlameIcon, SendIcon, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import UserDropdown from "./user-dropdown";
import { useSession } from "next-auth/react";
import GoBack from "./go-back";
import { useSearchModal } from "@/hooks/use-search-modal";
const SidebarNav = () => {
  const pathname = usePathname();
  const { data: session } = useSession();

  type NavLinks = {
    label: string;
    active: boolean;
    path: string;
    onClick?: () => void;
    icon: React.ReactNode;
  };

  const searchModal = useSearchModal();
  const navLinks: NavLinks[] = [
    {
      label: "Feed",
      path: "/feed",
      active: pathname === "/feed",
      onClick: () => null,
      icon: <FlameIcon className="h-6 w-6" />,
    },
    {
      label: "Jobs",
      path: "/jobs",
      onClick: () => null,
      active: pathname === "/jobs",
      icon: <Briefcase className="h-6 w-6" />,
    },
    {
      label: "Search",
      path: "#",
      onClick: searchModal.onOpen,
      active: pathname === "#q",
      icon: <SearchIcon className="h-6 w-6" />,
    },
  ];
  return (
    <div
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
      <div className="hidden sm:block absolute top-3">
        <GoBack />
      </div>

      {navLinks.map((link) => (
        <div
          key={link.label}
          className={cn(
            "text-muted-foreground hover:text-primary cursor-pointer sm:w-full flex justify-center transition-all",
            link.active && "text-primary"
          )}
          onClick={link.onClick}
        >
          <Link href={link.path}>
            <span className="sr-only">{link.label}</span>
            {link.icon}
          </Link>
        </div>
      ))}
      {session && (
        <div className="sm:absolute bottom-3">
          <UserDropdown user={session.user} />
        </div>
      )}
    </div>
  );
};

export default SidebarNav;
