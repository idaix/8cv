import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatedName(name: string) {
  let nameToArray = name.split(" ");
  if (nameToArray.length > 1) {
    let first = nameToArray[0].slice(0, 1);
    let last = nameToArray[1].slice(0, 1);
    return first + last;
  } else {
    return name.slice(0, 1);
  }
}
