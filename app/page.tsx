"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
export default function Home() {
  const router = useRouter();
  const { data: session } = useSession();
  return (
    <main className="">
      <div className="shadow-xl flex items-center justify-between px-10 py-5">
        {session ? (
          <>
            <p className="">Hello {session.user?.name}</p>
            <Button variant="outline" onClick={() => signOut()}>
              Logout
            </Button>
          </>
        ) : (
          <Button onClick={() => router.push("/login")}>Login</Button>
        )}
      </div>
    </main>
  );
}
