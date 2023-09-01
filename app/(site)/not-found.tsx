"use client";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import { useRouter } from "next/navigation";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "404 | Page not found!",
    description: "404 error, Page not found!",
  };
}

export default function NotFound() {
  const router = useRouter();
  return (
    <div className="container flex items-center min-h-screen px-6 py-12 mx-auto">
      <div className="flex flex-col items-center max-w-sm mx-auto text-center">
        <p className="p-3 text-sm font-medium text-blue-500 rounded-full bg-blue-50 dark:bg-gray-800">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
            />
          </svg>
        </p>
        <h1 className="mt-3 text-2xl font-semibold">Page not found</h1>
        <p className="mt-4 text-muted-foreground">
          The page you are looking for doesn²t exist. Here are some helpful
          links:
        </p>

        <div className="flex items-center w-full mt-6 gap-x-3 shrink-0 sm:w-auto">
          <Button onClick={() => router.push("/")}>Take me home</Button>
        </div>
      </div>
    </div>
  );
}
