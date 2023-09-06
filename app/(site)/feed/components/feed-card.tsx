import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { formatedName } from "@/lib/utils";
import { Feed } from "@/types";
import { MoveUpRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface FeedCardProps {
  data: Feed;
}

const FeedCard: React.FC<FeedCardProps> = ({ data }) => {
  return (
    <Card className="overflow-hidden mb-4">
      <CardHeader className="relative p-0">
        <Image
          src={`https://source.unsplash.com/random/?monochromatic&${data.id}`}
          alt="Random image"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
        />

        <Link href={`/${data.profileId}`} className="absolute top-3 left-6">
          <Avatar>
            <AvatarImage src={data.profile.image as string} />
            <AvatarFallback className="bg-black/30 backdrop-blur">
              {formatedName(data.profile.name || "X")}
            </AvatarFallback>
          </Avatar>
        </Link>
      </CardHeader>
      <CardContent className="pt-3">
        <p className="text-xs text-muted-foreground">{data.profile.name}</p>
        {data.link ? (
          <Link
            href={data.link}
            target="_blank"
            className="flex items-center hover:underline"
          >
            {data.title}
            <MoveUpRightIcon className="h-3 w-3" />
          </Link>
        ) : (
          <h3>{data.title}</h3>
        )}
        <p className="text-muted-foreground text-sm">{data.description}</p>
      </CardContent>
    </Card>
  );
};

export default FeedCard;
