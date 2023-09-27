"use client";

import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import WelcomeForm from "./components/form";
import axios from "axios";

enum STEPS {
  WELCOME = 0,
  FORM = 1,
}

const WelcomePage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [steps, setSteps] = useState(STEPS.WELCOME);
  // the process of cheking if profile exist or not take some time
  // soo we create a state for managing content
  // based on this state (boolean) if false => wont show the content, true => show the content
  const [showContent, setShowContent] = useState(false);
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/?event=openModal");
    } else if (status === "authenticated") {
      // check if profile already created with authenticated user by his id
      const checkProfile = async () => {
        const res = await axios.get("api/profile/check-profile-with-userid");
        if (res.data.username) {
          router.push(`/${res.data.username}`);
        } else {
          setShowContent(true);
        }
      };

      checkProfile();
    }
  }, [status, router]);

  if (!showContent) return <div></div>;

  // --- content ---
  const nextStep = () => {
    setSteps((value) => value + 1);
  };

  let bodyContent = (
    <>
      <h1 className="text-4xl font-bold">
        Welcome,{" "}
        <span className="bg-clip-text bg-gradient-to-tr from-green-400 to-violet-600 text-transparent">
          Brilliant
        </span>
      </h1>

      <h1 className="text-4xl font-bold">
        Lets create your{" "}
        <span className="bg-clip-text bg-gradient-to-tr from-green-400 to-violet-600 text-transparent">
          Profile
        </span>
      </h1>
      <div className="mt-5 text-end">
        <Button onClick={nextStep} variant={"outline"}>
          Continue
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </>
  );

  if (steps == STEPS.FORM) {
    bodyContent = <WelcomeForm />;
  }
  return (
    <main className="h-full grid place-items-center container mx-auto">
      <div className="sm:min-w-[300px]">{bodyContent}</div>
    </main>
  );
};

export default WelcomePage;
