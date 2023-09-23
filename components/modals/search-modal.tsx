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
import { Suspense, useEffect, useState } from "react";
import {
  getProfilesSearch,
  getRecentlyViewed,
} from "@/lib/get-profiles-search";
import { Profile } from "@prisma/client";
import LoadingSpinner from "../ui/loading-spiner";

const SearchModal = () => {
  const searchModal = useSearchModal();
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // manage and store suggestions data and searched data
  // suggestions data are Profile[]
  // search data are Profile[] <for now but in the future, gonna be genral search (profile, projects).>
  const [searchQuery, setSearchQuery] = useState("");
  const [searchData, setSearchData] = useState<Profile[]>([]);
  const [viewedProfiles, setViewedProfiles] = useState<Profile[]>([]);
  const [newProfiles, setnewProfiles] = useState<Profile[]>([]);

  // this useEffect for managing suggestions data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const username = session?.user.username;

      const viewedProfilesFetcher: Promise<Profile[]> = getRecentlyViewed(
        username as string
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
  }, [session]);
  // this part for managing search <evry time search query changes>
  useEffect(() => {
    if (!searchQuery) return;
    setLoading(true);
    const fetchSearchData = async () => {
      const fetcher: Promise<Profile[]> = getProfilesSearch(searchQuery);
      const data = await fetcher;
      setSearchData(data);
      setLoading(false);
    };
    fetchSearchData();
  }, [searchQuery]);
  return (
    <Modal isOpen={searchModal.isOpen} onClose={searchModal.onClose}>
      <div className="h-[50vh] flex flex-col gap-y-5">
        <div className="flex items-center">
          <SearchIcon className="h-4 w-4" />

          <Input
            placeholder="search people..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border-none bg outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>
        <div className="flex-1 space-y-5 overflow-y-auto no-scrollbar">
          {/* --- search result --- */}
          {/* --- suggestions [whene search is ON -> hide suggestions] --- */}
          {searchQuery.length > 0 ? (
            <>
              {loading ? (
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <LoadingSpinner />
                </div>
              ) : !searchData.length ? (
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <span>No profile to display!</span>
                </div>
              ) : (
                <SearchField data={searchData} />
              )}
            </>
          ) : (
            <>
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
              <SearchField label="Recently viewed" data={viewedProfiles} />
              {/* suggestions - recently joind */}
              <SearchField label="Recently joind" data={newProfiles} />
            </>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default SearchModal;
