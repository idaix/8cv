import { Badge } from "@/components/ui/badge";
import { Profile } from "@prisma/client";
import { MoreHorizontal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Section from "./section";

interface ProfileGeneralProps {
  profile: Profile | null;
}

const ProfileGeneral: React.FC<ProfileGeneralProps> = ({ profile }) => {
  if (!profile) return;
  return (
    <div className="grid gap-y-9">
      <div className="flex items-center">
        <div className="flex-1 flex items-center gap-x-4">
          <div className="relative w-24 h-24 bg-muted rounded-full overflow-hidden">
            <Image src={profile.image as string} alt={profile.name} fill />
          </div>
          <div className="">
            <h5 className="">{profile.name}</h5>
            <p className="text-muted-foreground text-xs">
              {profile.headline && profile.headline + " in"} {profile.location}
            </p>
            {profile.website && (
              <Link
                href={profile.website as string}
                target="_blank"
                className="text-xs"
              >
                <Badge variant="secondary">{profile.website}</Badge>
              </Link>
            )}
          </div>
        </div>
        <MoreHorizontal className="text-muted-foreground w-4 h-4" />
      </div>
      {profile.about && (
        <Section title="About">
          <p className="text-muted-foreground">{profile.about}</p>
        </Section>
      )}
    </div>
  );
};

export default ProfileGeneral;
