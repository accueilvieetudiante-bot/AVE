"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatEventDate, formatEventTime, formatPrice } from "@/lib/utils";
import type { EventRow } from "@/types/database";

export function FeaturedEvent({ event }: { event: EventRow }) {
  return (
    <section className="mb-6">
      <h2 className="mb-3 text-sm font-semibold text-muted-foreground">
        🔥 Événement à la une
      </h2>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Link
          href={`/evenements/${event.id}`}
          className="block overflow-hidden rounded-2xl glass"
        >
          <div className="relative flex h-40 items-end gradient-brand p-4">
            <Badge
              variant="glass"
              className="absolute right-4 top-4 text-foreground"
            >
              {event.is_free ? "Gratuit" : formatPrice(event.price_cents)}
            </Badge>
            <p className="text-lg font-semibold text-primary-foreground drop-shadow-sm">
              {event.title}
            </p>
          </div>
          <div className="flex items-center justify-between gap-3 p-4">
            <div className="min-w-0 space-y-1 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Calendar className="size-3.5 shrink-0" />
                {formatEventDate(event.starts_at)} · {formatEventTime(event.starts_at)}
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="size-3.5 shrink-0" />
                <span className="truncate">{event.address}</span>
              </div>
            </div>
            <Button size="sm" className="shrink-0" asChild>
              <span>Participer</span>
            </Button>
          </div>
        </Link>
      </motion.div>
    </section>
  );
}
