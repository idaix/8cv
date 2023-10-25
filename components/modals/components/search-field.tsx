"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useSearchModal } from "@/hooks/use-search-modal";
import { formatedName } from "@/lib/utils";
import { Profile } from "@prisma/client";
import { useRouter } from "next/navigation";
import SearchUserCard from "./search-user-card";

interface IProps {
  label?: string;
  data: Profile[];
}

const SearchField: React.FC<IProps> = ({ label, data }) => {
  const router = useRouter();
  const searchModal = useSearchModal();
  if (!data?.length) return null;
  return (
    <div className="">
      {/* --- label --- */}
      {label && (
        <span className="pl-4 text-xs text-muted-foreground font-semibold">
          {label}
        </span>
      )}
      {/* --- data --- */}
      <div className="space-y-1">
        {data.map((item) => (
          // <div className="bg-red-100">hello siiir</div>
          <SearchUserCard key={item.id} user={item} />
        ))}
      </div>
    </div>
  );
};

export default SearchField;
