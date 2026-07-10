"use client";

import { CalendarPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { EventRow } from "@/types/database";

function toIcsDate(iso: string) {
  return new Date(iso).toISOString().replace(/[-:]|\.\d{3}/g, "");
}

export function AddToCalendarButton({ event }: { event: EventRow }) {
  function handleClick() {
    const start = toIcsDate(event.starts_at);
    const end = toIcsDate(event.ends_at ?? event.starts_at);

    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//AVE//FR",
      "BEGIN:VEVENT",
      `UID:${event.id}@ave-app`,
      `DTSTART:${start}`,
      `DTEND:${end}`,
      `SUMMARY:${event.title}`,
      `LOCATION:${event.address ?? ""}`,
      `DESCRIPTION:${(event.description ?? "").replace(/\n/g, "\\n")}`,
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${event.title}.ics`;
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <Button variant="glass" size="sm" onClick={handleClick}>
      <CalendarPlus className="size-4" />
      Ajouter au calendrier
    </Button>
  );
}
