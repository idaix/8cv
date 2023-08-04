"use client";
import AuthModal from "@/components/modals/auth-modal";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "./providers/theme-provider";
const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <AuthModal />
        {children}
      </ThemeProvider>
    </SessionProvider>
  );
};

export default Providers;
