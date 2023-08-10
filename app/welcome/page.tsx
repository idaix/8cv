"use client";

import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const WelcomePage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  return (
    <main className="h-full grid place-content-center container mx-auto">
      <h1 className="text-4xl font-bold">
        Welcome{" "}
        <span className="bg-clip-text bg-gradient-to-tr from-green-400 to-violet-600 text-transparent">
          Talentest
        </span>
      </h1>
      <h1 className="text-4xl font-bold">
        Are you ready to make{" "}
        <span className="bg-clip-text bg-gradient-to-tr from-green-400 to-violet-600 text-transparent">
          THE BOOM
        </span>
      </h1>
      <h1 className="text-4xl font-bold">
        You are in the right{" "}
        <span className="bg-clip-text bg-gradient-to-tr from-green-400 to-violet-600 text-transparent">
          Place
        </span>
      </h1>
      <h1 className="text-4xl font-bold">
        Next step complete your{" "}
        <span className="bg-clip-text bg-gradient-to-tr from-green-400 to-violet-600 text-transparent">
          Profile
        </span>
      </h1>
      <div className="mt-2 text-end">
        <Button
          onClick={() => router.push(`/${session?.user.id}`)}
          variant={"outline"}
        >
          Continue
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </main>
  );
};

export default WelcomePage;
