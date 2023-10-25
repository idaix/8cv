import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSearchModal } from "@/hooks/use-search-modal";
import { formatedName } from "@/lib/utils";
import { Profile } from "@prisma/client";
import Link from "next/link";

interface SearchUserCardProps {
  user: Profile;
}

const SearchUserCard: React.FC<SearchUserCardProps> = ({ user }) => {
  const searchModal = useSearchModal();
  return (
    <Link
      href={`/${user.username}`}
      onClick={() => searchModal.onClose()}
      className="
        gap-x-3
        flex
        w-full 
        justify-start 
        items-center
        py-2
        px-5
        rounded-md
        font-semibold

        hover:bg-muted
        transition-colors
    "
    >
      <Avatar>
        <AvatarImage
          src={user.image as string}
          alt={user.name + " Profile image"}
        />
        <AvatarFallback>{formatedName(user.name)}</AvatarFallback>
      </Avatar>
      {user.name}
    </Link>
  );
};

export default SearchUserCard;
