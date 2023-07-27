"use client";
import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
const X = () => {
  const { data: session } = useSession();

  if (session) {
    return redirect("/");
  }
  return (
    <>
      <Button onClick={() => signIn("github")}>Login with github</Button>
      <Button onClick={() => signIn("google")}>Login with google</Button>
    </>
  );
};

export default X;
