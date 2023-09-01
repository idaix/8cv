import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="h-screen flex flex-col">
      <Navbar />
      <div className="h-full grid place-content-center">
        <h1 className="text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-tr from-violet-800 to-muted">
          TALENTS
        </h1>
        <Link href="/x">
          <Button variant="ghost" size="sm">
            <ChevronRight className="w-4 h-4 mr-2" />
            Dai Chekkal profile
          </Button>
        </Link>
        <Link href="/xxx">
          <Button variant="ghost" size="sm">
            <ChevronRight className="w-4 h-4 mr-2" />
            Invalid profile
          </Button>
        </Link>
      </div>
    </main>
  );
}
