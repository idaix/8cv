"use client";
import { signOut } from "next-auth/react";
import { User } from "next-auth";
import { LogOutIcon, UserIcon } from "lucide-react";
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

interface IProps {
  user: User;
}

const UserDropdown: React.FC<IProps> = ({ user }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="!outline-none">
        <Avatar>
          <AvatarImage src={user?.image as string} />
          <AvatarFallback>{formatedName(user?.name as string)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <div className="p-2">
          <div className="flex flex-col gap-y-1 leading-none">
            <p className="font-medium">{user.name || "Anonymous"}</p>
            {user.email && (
              <p className="truncate text-sm text-muted-foreground">
                {user.email}
              </p>
            )}
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link className="flex items-center" href={`/${user.username}`}>
            <UserIcon className="h-4 w-4 mr-2" />
            Your Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
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
