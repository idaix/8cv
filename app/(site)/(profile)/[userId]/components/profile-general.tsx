import { MenuIcon, MoreHorizontal } from "lucide-react";
import Link from "next/link";

const ProfileGeneral = () => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-x-4">
        <div className="w-24 h-24 bg-muted rounded-full"></div>
        <div className="">
          <h5 className="">Dai Chekkal</h5>
          <p className="text-muted-foreground text-xs">
            Web developer based in algeria
          </p>
          <Link href="https://dxk.vercel.app/" className="text-xs">
            dxk.vercel.app
          </Link>
        </div>
      </div>
      <MoreHorizontal className="text-muted-foreground w-4 h-4" />
    </div>
  );
};

export default ProfileGeneral;
