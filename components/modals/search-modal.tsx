"use client";

import { useSearchModal } from "@/hooks/use-search-modal";
import { Input } from "../ui/input";
import Modal from "../ui/modal";
import { SearchIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import SearchField from "./components/search-field";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { formatedName } from "@/lib/utils";
import { useEffect, useState } from "react";
import { getProfilesSearch } from "@/lib/get-profiles-search";
import { Profile } from "@prisma/client";

const SearchModal = () => {
  const searchModal = useSearchModal();
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [ViewedProfiles, setViewedProfiles] = useState<Profile[]>([]);
  const [newProfiles, setnewProfiles] = useState<Profile[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const viewedProfilesFetcher: Promise<Profile[]> = getProfilesSearch(
        "",
        "desc",
        "6"
      );
      const newProfilesFetcher: Promise<Profile[]> = getProfilesSearch(
        "",
        "desc",
        "6"
      );
      const [viewedProfilesData, newProfilesData] = await Promise.all([
        viewedProfilesFetcher,
        newProfilesFetcher,
      ]).finally(() => setLoading(false));
      setnewProfiles(newProfilesData);
      setViewedProfiles(viewedProfilesData);
    };

    fetchData();
  }, []);
  return (
    <Modal isOpen={searchModal.isOpen} onClose={searchModal.onClose}>
      <div className="h-[50vh] flex flex-col gap-y-5">
        <div className="flex items-center">
          <SearchIcon className="h-4 w-4" />

          <Input
            placeholder="search people..."
            className="border-none bg outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>
        <div className="flex-1 space-y-5 overflow-y-auto no-scrollbar">
          {/* --- search result --- */}
          {/* --- suggestions [whene search is on -> hide suggestions] --- */}
          {/* suggestions - user prfile */}
          {status === "authenticated" && (
            <Button
              onClick={() => {
                searchModal.onClose();
                router.push(`/${session.user.username}`);
              }}
              variant="ghost"
              className="w-full justify-start gap-x-3"
            >
              <Avatar>
                <AvatarImage
                  src={session.user?.image as string}
                  alt={(session.user.name as string) || "Profile image"}
                />
                <AvatarFallback>
                  {formatedName(session.user?.name as string)}
                </AvatarFallback>
              </Avatar>
              View profile
            </Button>
          )}
          {/* suggestions - recently viewed */}
          <SearchField label="Recently viewed" data={ViewedProfiles} />
          {/* suggestions - recently joind */}
          <SearchField label="Recently joind" data={newProfiles} />
        </div>
      </div>
    </Modal>
  );
};

export default SearchModal;
