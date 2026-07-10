import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatEventDate(iso: string) {
  return format(new Date(iso), "EEE d MMM", { locale: fr });
}

export function formatEventTime(iso: string) {
  return format(new Date(iso), "HH'h'mm", { locale: fr });
}

export function formatPrice(cents: number) {
  if (cents === 0) return "Gratuit";
  return (cents / 100).toLocaleString("fr-FR", {
    style: "currency",
    currency: "EUR",
  });
}
