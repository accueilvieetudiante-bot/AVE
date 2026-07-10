import Link from "next/link";
import { Card } from "@/components/ui/card";
import { assistanceIconMap, defaultAssistanceIcon } from "@/components/assistance/icon-map";
import { cn } from "@/lib/utils";
import type { AssistanceCategory } from "@/types/database";

const colorClasses: Record<string, string> = {
  blue: "bg-blue-500/15 text-blue-500",
  green: "bg-emerald-500/15 text-emerald-500",
  pink: "bg-pink-500/15 text-pink-500",
  orange: "bg-orange-500/15 text-orange-500",
  red: "bg-destructive/15 text-destructive",
  indigo: "bg-indigo-500/15 text-indigo-500",
  slate: "bg-slate-500/15 text-slate-500",
  cyan: "bg-cyan-500/15 text-cyan-500",
  violet: "bg-violet-500/15 text-violet-500",
  teal: "bg-teal-500/15 text-teal-500",
};

export function AssistanceCategoryCard({
  category,
}: {
  category: AssistanceCategory;
}) {
  const Icon = (category.icon && assistanceIconMap[category.icon]) || defaultAssistanceIcon;
  const isEmergency = category.slug === "urgences";

  return (
    <Link href={`/assistance/${category.slug}`}>
      <Card
        className={cn(
          "h-32 justify-between gap-2 p-4",
          isEmergency && "ring-1 ring-destructive/40",
        )}
      >
        <span
          className={cn(
            "flex size-9 items-center justify-center rounded-xl",
            colorClasses[category.color ?? "slate"],
          )}
        >
          <Icon className="size-4.5" />
        </span>
        <p className="text-sm font-medium leading-tight">{category.label}</p>
      </Card>
    </Link>
  );
}
