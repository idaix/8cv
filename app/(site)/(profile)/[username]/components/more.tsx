"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useProfileModal } from "@/hooks/use-profile-modal";
import { DownloadIcon, MoreHorizontal, PencilIcon } from "lucide-react";
import { useSession } from "next-auth/react";

const More = ({ username }: { username: string }) => {
  const { data: session, status } = useSession();
  const profileModal = useProfileModal();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="p-1">
        <MoreHorizontal className="text-muted-foreground w-4 h-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {status === "authenticated" && session.user.username === username && (
          <>
            <DropdownMenuItem onClick={profileModal.onOpen}>
              <PencilIcon className="h-4 w-4 mr-2" />
              Edit profile
            </DropdownMenuItem>
          </>
        )}
        <DropdownMenuItem disabled>
          <DownloadIcon className="h-4 w-4 mr-2" />
          Print profile
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default More;
