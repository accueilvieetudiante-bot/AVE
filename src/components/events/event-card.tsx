import Link from "next/link";
import { Calendar, MapPin, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatEventDate, formatEventTime, formatPrice } from "@/lib/utils";
import type { EventRow } from "@/types/database";

export function EventCard({ event }: { event: EventRow }) {
  const seatsLeft = event.capacity
    ? Math.max(event.capacity - event.seats_taken, 0)
    : null;

  return (
    <Link href={`/evenements/${event.id}`}>
      <Card className="flex-row gap-4 p-4">
        <div className="flex size-16 shrink-0 items-center justify-center rounded-xl gradient-brand text-primary-foreground">
          <Calendar className="size-6" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium">{event.title}</p>
          <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
            <Calendar className="size-3.5 shrink-0" />
            {formatEventDate(event.starts_at)} · {formatEventTime(event.starts_at)}
          </div>
          <div className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
            <MapPin className="size-3.5 shrink-0" />
            <span className="truncate">{event.address}</span>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <Badge variant={event.is_free ? "default" : "outline"}>
              {event.is_free ? "Gratuit" : formatPrice(event.price_cents)}
            </Badge>
            {seatsLeft !== null && (
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Users className="size-3.5" />
                {seatsLeft} places restantes
              </span>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
}
