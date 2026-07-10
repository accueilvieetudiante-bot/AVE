import Link from "next/link";
import { Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatEventDate, formatEventTime, formatPrice } from "@/lib/utils";
import type { EventRow } from "@/types/database";

export function EventRail({ events }: { events: EventRow[] }) {
  return (
    <section className="mb-6">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-muted-foreground">
          📅 Cette semaine
        </h2>
        <Link href="/evenements" className="text-xs font-medium text-primary">
          Tout voir
        </Link>
      </div>
      <div className="-mx-4 flex snap-x gap-3 overflow-x-auto px-4 pb-1">
        {events.map((event) => (
          <Link
            key={event.id}
            href={`/evenements/${event.id}`}
            className="w-56 shrink-0 snap-start rounded-2xl glass p-4"
          >
            <Badge variant="outline" className="mb-3">
              {event.is_free ? "Gratuit" : formatPrice(event.price_cents)}
            </Badge>
            <p className="mb-2 line-clamp-2 text-sm font-medium leading-snug">
              {event.title}
            </p>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Calendar className="size-3.5" />
              {formatEventDate(event.starts_at)} · {formatEventTime(event.starts_at)}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
