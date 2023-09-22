"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useSearchModal } from "@/hooks/use-search-modal";
import { formatedName } from "@/lib/utils";
import { Profile } from "@prisma/client";
import { useRouter } from "next/navigation";

interface IProps {
  label: string;
  data: Profile[];
}

const SearchField: React.FC<IProps> = ({ label, data }) => {
  const router = useRouter();
  const searchModal = useSearchModal();
  if (!data.length) return null;
  return (
    <div className="">
      {/* --- label --- */}
      <span className="pl-4 text-xs text-muted-foreground font-semibold">
        {label}
      </span>
      {/* --- data --- */}
      <div className="space-y-1">
        {data.map((item) => (
          <Button
            key={item.id}
            onClick={() => {
              searchModal.onClose();
              router.push(`/${item.username}`);
            }}
            variant="ghost"
            className="w-full justify-start gap-x-3"
          >
            <Avatar>
              <AvatarImage
                src={item.image as string}
                alt={item.name + " Profile image"}
              />
              <AvatarFallback>{formatedName("Slimane Sed")}</AvatarFallback>
            </Avatar>
            {item.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SearchField;
