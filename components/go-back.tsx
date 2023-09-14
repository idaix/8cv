"use client";
import { ChevronLeft } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
const GoBack = () => {
  const pathname = usePathname();
  const router = useRouter();
  if (pathname === "/feed") return null;
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => router.back()}
      className="text-muted-foreground text-sm"
    >
      <ChevronLeft />
    </Button>
  );
};
export default GoBack;
