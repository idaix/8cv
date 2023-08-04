"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useAuthModal } from "@/hooks/use-auth-modal";

const Navbar = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const authModal = useAuthModal();
  if (session) {
    return;
  }
  return (
    <>
      <nav className="flex items-center justify-center  py-3 gap-x-8">
        <Button
          onClick={() => authModal.onOpen("LOGIN")}
          size="sm"
          variant="ghost"
        >
          Log in
        </Button>
        <Button onClick={() => authModal.onOpen("REGISTER")} size="sm">
          Sign up
        </Button>
      </nav>
    </>
  );
};

export default Navbar;
