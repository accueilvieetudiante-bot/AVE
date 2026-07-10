"use client";

import * as React from "react";
import { Heart } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

/**
 * V1 : état local + confirmation toast. Sera branché sur la Server Action
 * `toggleFavorite` (table `favorites`) une fois l'authentification Supabase
 * en place.
 */
export function FavoriteButton({
  className,
  label = "cet élément",
}: {
  className?: string;
  label?: string;
}) {
  const [active, setActive] = React.useState(false);

  return (
    <button
      type="button"
      aria-label={active ? "Retirer des favoris" : "Ajouter aux favoris"}
      onClick={() => {
        setActive((v) => !v);
        toast(active ? "Retiré des favoris" : "Ajouté aux favoris", {
          description: label,
        });
      }}
      className={cn(
        "flex size-10 items-center justify-center rounded-full glass transition-transform active:scale-90",
        className,
      )}
    >
      <Heart
        className={cn(
          "size-4.5 transition-colors",
          active ? "fill-destructive text-destructive" : "text-foreground",
        )}
      />
    </button>
  );
}
