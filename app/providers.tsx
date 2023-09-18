"use client";
import AuthModal from "@/components/modals/auth-modal";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "./providers/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useAuthModal } from "@/hooks/use-auth-modal";
import { toast } from "@/components/ui/use-toast";
import SearchModal from "@/components/modals/search-modal";
const Providers = ({ children }: { children: React.ReactNode }) => {
  const searchParams = useSearchParams();
  const event = searchParams.get("event");
  const error = searchParams.get("error");
  const authModal = useAuthModal();
  useEffect(() => {
    if (event == "openModal") {
      authModal.onOpen("LOGIN");
    }
    if (error) {
      toast({
        variant: "destructive",
        title: "Error! Something went wrong",
        description: "try again!",
      });
    }
  }, [event, error, authModal]);
  return (
    <SessionProvider>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <Toaster />
        <AuthModal />
        <SearchModal />
        {children}
      </ThemeProvider>
    </SessionProvider>
  );
};

export default Providers;
