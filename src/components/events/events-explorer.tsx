"use client";

import * as React from "react";
import { CalendarX } from "lucide-react";
import { EventSearch } from "@/components/events/event-search";
import { CategoryChips } from "@/components/events/category-chips";
import { EventCard } from "@/components/events/event-card";
import { EmptyState } from "@/components/shared/empty-state";
import type { EventRow } from "@/types/database";

type Category = { id: number; slug: string; label: string };

export function EventsExplorer({
  events,
  categories,
}: {
  events: EventRow[];
  categories: Category[];
}) {
  const [query, setQuery] = React.useState("");
  const [activeFilter, setActiveFilter] = React.useState("tous");

  const chips = [
    { slug: "tous", label: "Tous" },
    { slug: "gratuit", label: "Gratuit" },
    { slug: "payant", label: "Payant" },
    ...categories.map((c) => ({ slug: c.slug, label: c.label })),
  ];

  const categoryBySlug = React.useMemo(
    () => new Map(categories.map((c) => [c.slug, c.id])),
    [categories],
  );

  const filtered = events.filter((event) => {
    const matchesQuery = event.title
      .toLowerCase()
      .includes(query.trim().toLowerCase());

    if (!matchesQuery) return false;
    if (activeFilter === "tous") return true;
    if (activeFilter === "gratuit") return event.is_free;
    if (activeFilter === "payant") return !event.is_free;
    return event.category_id === categoryBySlug.get(activeFilter);
  });

  return (
    <div>
      <EventSearch value={query} onChange={setQuery} />
      <CategoryChips
        categories={chips}
        active={activeFilter}
        onChange={setActiveFilter}
      />
      {filtered.length === 0 ? (
        <EmptyState
          icon={CalendarX}
          title="Aucun événement trouvé"
          description="Essayez une autre recherche ou un autre filtre."
        />
      ) : (
        <div className="space-y-3">
          {filtered.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}
