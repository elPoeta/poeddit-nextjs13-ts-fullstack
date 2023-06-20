import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const classTwMerge = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};
