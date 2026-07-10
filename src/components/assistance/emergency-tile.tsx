import { Phone } from "lucide-react";
import type { AssistanceItem } from "@/types/database";

export function EmergencyTile({ item }: { item: AssistanceItem }) {
  return (
    <a
      href={`tel:${item.phone}`}
      className="flex items-center justify-between gap-3 rounded-2xl border border-destructive/30 bg-destructive/10 p-4 transition-transform active:scale-[0.98]"
    >
      <div className="min-w-0">
        <p className="font-medium text-destructive">{item.title}</p>
        {item.subtitle && (
          <p className="text-xs text-destructive/80">{item.subtitle}</p>
        )}
      </div>
      <span className="flex shrink-0 items-center gap-2 rounded-full bg-destructive px-4 py-2 text-sm font-semibold text-destructive-foreground">
        <Phone className="size-4" />
        {item.phone}
      </span>
    </a>
  );
}
