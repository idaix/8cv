"use client";
import { useSession, signOut } from "next-auth/react";
import { LogOutIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatedName } from "@/lib/utils";
import Link from "next/link";
import ThemeToggle from "./theme-toggle";

const UserDropdown = () => {
  const { data: session, status } = useSession();
  console.log("STATUS:", status);
  console.log("SESSION:", session);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="!outline-none">
        <Avatar>
          <AvatarImage src={session?.user?.image as string} />
          <AvatarFallback>
            {formatedName(session?.user?.name as string)}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Link href={"/profile"}>{session?.user?.name}</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <ThemeToggle />
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => signOut()}>
          <LogOutIcon className="h-4 w-4 mr-2" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
