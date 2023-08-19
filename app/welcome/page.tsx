"use client";

import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import WelcomeForm from "./components/form";

enum STEPS {
  WELCOME = 0,
  FORM = 1,
}

const WelcomePage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [steps, setSteps] = useState(STEPS.WELCOME);

  const nextStep = () => {
    setSteps((value) => value + 1);
  };
  // const handleClick = () => {
  //   console.log("click");
  //   if (steps == STEPS.FORM) {
  //     router.push(`/${session?.user.id}`);
  //   } else {
  //     nextStep();
  //   }
  // };

  let bodyContent = (
    <>
      <h1 className="text-4xl font-bold">
        Welcome,{" "}
        <span className="bg-clip-text bg-gradient-to-tr from-green-400 to-violet-600 text-transparent">
          Brilliant
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
