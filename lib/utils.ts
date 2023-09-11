import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatedName(name: string) {
  if (!name) return "";
  let nameToArray = name.split(" ");
  if (nameToArray.length > 1) {
    return nameToArray[0].slice(0, 1) + nameToArray[1].slice(0, 1);
  } else {
    return name.slice(0, 1);
  }
}

export const API_URL = process.env.API_URL || "";
