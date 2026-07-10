import { notFound } from "next/navigation";
import { Calendar, MapPin, Users, ExternalLink } from "lucide-react";
import { HeaderBar } from "@/components/shared/header-bar";
import { FavoriteButton } from "@/components/shared/favorite-button";
import { ShareButton } from "@/components/shared/share-button";
import { EventDetailActions } from "@/components/events/event-detail-actions";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getEventById } from "@/lib/queries/events";
import { formatEventDate, formatEventTime, formatPrice } from "@/lib/utils";

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = await params;
  const event = await getEventById(eventId);
  if (!event) notFound();

  const seatsLeft = event.capacity
    ? Math.max(event.capacity - event.seats_taken, 0)
    : null;

  const mapsUrl = event.address
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.address)}`
    : null;

  return (
    <div className="pb-24">
      <HeaderBar
        title="Détail de l'événement"
        actions={
          <div className="flex items-center gap-2">
            <ShareButton title={event.title} />
            <FavoriteButton label={event.title} />
          </div>
        }
      />

      <div className="mb-4 flex h-44 items-end rounded-2xl gradient-brand p-5">
        <p className="text-xl font-semibold text-primary-foreground drop-shadow-sm">
          {event.title}
        </p>
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-2">
        <Badge>{event.is_free ? "Gratuit" : formatPrice(event.price_cents)}</Badge>
        {seatsLeft !== null && (
          <Badge variant="outline">
            <Users className="size-3.5" />
            {seatsLeft} places restantes
          </Badge>
        )}
      </div>

      <Card className="mb-4 gap-3 p-4">
        <div className="flex items-center gap-2 text-sm">
          <Calendar className="size-4 text-primary" />
          {formatEventDate(event.starts_at)} · {formatEventTime(event.starts_at)}
        </div>
        {event.address && (
          <div className="flex items-center justify-between gap-2 text-sm">
            <span className="flex min-w-0 items-center gap-2">
              <MapPin className="size-4 shrink-0 text-primary" />
              <span className="truncate">{event.address}</span>
            </span>
            {mapsUrl && (
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex shrink-0 items-center gap-1 text-xs font-medium text-primary"
              >
                Carte
                <ExternalLink className="size-3.5" />
              </a>
            )}
          </div>
        )}
        {event.organizer_name && (
          <p className="text-sm text-muted-foreground">
            Organisé par <span className="text-foreground">{event.organizer_name}</span>
          </p>
        )}
      </Card>

      {event.description && (
        <Card className="mb-4 p-4">
          <p className="text-sm leading-relaxed text-muted-foreground">
            {event.description}
          </p>
        </Card>
      )}

      <EventDetailActions event={event} />
    </div>
  );
}
