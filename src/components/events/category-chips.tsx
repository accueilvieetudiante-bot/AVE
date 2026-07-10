"use client";

import { cn } from "@/lib/utils";

export type ChipFilter = { slug: string; label: string };

export function CategoryChips({
  categories,
  active,
  onChange,
}: {
  categories: ChipFilter[];
  active: string;
  onChange: (slug: string) => void;
}) {
  return (
    <div className="-mx-4 mb-4 flex gap-2 overflow-x-auto px-4 pb-1">
      {categories.map((cat) => {
        const isActive = active === cat.slug;
        return (
          <button
            key={cat.slug}
            type="button"
            onClick={() => onChange(cat.slug)}
            className={cn(
              "shrink-0 whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
              isActive
                ? "gradient-brand text-primary-foreground shadow-soft"
                : "glass text-muted-foreground",
            )}
          >
            {cat.label}
          </button>
        );
      })}
    </div>
  );
}
