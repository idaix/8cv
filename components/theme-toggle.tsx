"use client";

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon } from "lucide-react";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const text = theme == "dark" ? "Switch to light" : "Swith to dark";
  const icon =
    theme == "dark" ? (
      <SunIcon className="h-4 w-4 mr-2" />
    ) : (
      <MoonIcon className="h-4 w-4 mr-2" />
    );
  const handleClick = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };
  return (
    <Button onClick={handleClick} className="w-full" variant="ghost" size="sm">
      {icon}
      {text}
    </Button>
  );
};

export default ThemeToggle;
