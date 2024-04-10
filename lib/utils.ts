import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { useRouter } from "next/router";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function addZeroNumber(number: number) {
  if (number < 10) {
    return "0" + number;
  } else {
    return number;
  }
}
