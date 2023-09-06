"use client";

import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useAuthModal } from "@/hooks/use-auth-modal";

const Navbar = () => {
  const { data: session, status } = useSession();
  const authModal = useAuthModal();
  if (status === "authenticated") return null;
  return (
    <>
      <nav className="flex items-center justify-center pt-3 gap-x-8">
        {status === "unauthenticated" && (
          <>
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
          </>
        )}
      </nav>
    </>
  );
};

export default Navbar;
