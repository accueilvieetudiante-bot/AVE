"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function EventSearch({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="relative mb-3">
      <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Rechercher un événement…"
        className="pl-10"
      />
    </div>
  );
}
