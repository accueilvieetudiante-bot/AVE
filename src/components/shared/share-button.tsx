"use client";

import { Share2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export function ShareButton({
  title,
  text,
  className,
}: {
  title: string;
  text?: string;
  className?: string;
}) {
  async function handleShare() {
    const url = typeof window !== "undefined" ? window.location.href : "";

    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
      } catch {
        // partage annulé par l'utilisateur — rien à faire
      }
      return;
    }

    await navigator.clipboard.writeText(url);
    toast.success("Lien copié dans le presse-papiers");
  }

  return (
    <button
      type="button"
      aria-label="Partager"
      onClick={handleShare}
      className={cn(
        "flex size-10 items-center justify-center rounded-full glass transition-transform active:scale-90",
        className,
      )}
    >
      <Share2 className="size-4.5" />
    </button>
  );
}
