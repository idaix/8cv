"use client";

import { Button } from "@/components/ui/button";
import { useAuthModal } from "@/hooks/use-auth-modal";
import { useJobModal } from "@/hooks/use-job-modal";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session, status } = useSession();
  const openAuthModal = useAuthModal((state) => state.onOpen);
  const openJobModal = useJobModal((state) => state.onOpen);
  const handleClick = () => {
    console.log("click");

    if (status === "unauthenticated") {
      openAuthModal("LOGIN");
    }

    if (status === "authenticated") {
      openJobModal();
    }
  };
  return (
    <nav className="flex items-center justify-between p-5 border-b">
      <h1 className="text-3xl">Jobs</h1>
      <Button onClick={handleClick}>Post a job</Button>
    </nav>
  );
};

export default Navbar;
