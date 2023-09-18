"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useSearchModal } from "@/hooks/use-search-modal";
import { formatedName } from "@/lib/utils";
import { Profile } from "@prisma/client";

interface IProps {
  label: string;
  data: any[];
}

const SearchField: React.FC<IProps> = ({ label, data }) => {
  const searchModal = useSearchModal();
  return (
    <div className="">
      {/* --- label --- */}
      <span className="pl-4 text-xs text-muted-foreground font-semibold">
        {label}
      </span>
      {/* --- data --- */}
      <div className="space-y-1">
        <Button
          onClick={() => {
            searchModal.onClose();
          }}
          variant="ghost"
          className="w-full justify-start gap-x-3"
        >
          <Avatar>
            <AvatarImage src={""} alt={"Profile image"} />
            <AvatarFallback>{formatedName("Slimane Sed")}</AvatarFallback>
          </Avatar>
          Slimane Sedrati
        </Button>
        <Button
          onClick={() => {
            searchModal.onClose();
          }}
          variant="ghost"
          className="w-full justify-start gap-x-3"
        >
          <Avatar className="">
            <AvatarImage src={""} alt={"Profile image"} />
            <AvatarFallback>{formatedName("Yacine D")}</AvatarFallback>
          </Avatar>
          Yacine Doued
        </Button>
      </div>
    </div>
  );
};

export default SearchField;
