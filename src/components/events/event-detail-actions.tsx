"use client";

import * as React from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { AddToCalendarButton } from "@/components/events/add-to-calendar-button";
import { formatPrice } from "@/lib/utils";
import type { EventRow } from "@/types/database";

export function EventDetailActions({ event }: { event: EventRow }) {
  const [joined, setJoined] = React.useState(false);

  function handleParticipate() {
    if (!event.is_free) {
      toast.info("Paiement en ligne bientôt disponible", {
        description:
          "Le paiement par carte, Apple Pay et Google Pay arrive dans une prochaine version.",
      });
      return;
    }

    setJoined(true);
    toast.success("Inscription confirmée 🎉", {
      description: "Retrouvez votre billet dans votre profil.",
    });
  }

  return (
    <div className="fixed inset-x-0 bottom-20 z-40 mx-auto flex w-full max-w-md flex-col gap-2 px-4">
      <div className="flex items-center gap-2 rounded-2xl glass p-2">
        <Button
          className="flex-1"
          size="lg"
          disabled={joined}
          onClick={handleParticipate}
        >
          {joined
            ? "Inscription confirmée ✓"
            : event.is_free
              ? "Participer"
              : `Participer · ${formatPrice(event.price_cents)}`}
        </Button>
        <AddToCalendarButton event={event} />
      </div>
    </div>
  );
}
