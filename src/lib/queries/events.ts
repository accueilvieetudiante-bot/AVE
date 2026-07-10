import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { demoEvents, eventCategories } from "@/lib/demo-data";
import type { EventRow } from "@/types/database";

export async function getUpcomingEvents(): Promise<EventRow[]> {
  if (!isSupabaseConfigured) return demoEvents;

  const supabase = await createClient();
  const { data, error } = await supabase!
    .from("events")
    .select("*")
    .eq("status", "published")
    .gte("starts_at", new Date().toISOString())
    .order("starts_at", { ascending: true });

  if (error || !data) return demoEvents;
  return data;
}

export async function getFeaturedEvent(): Promise<EventRow | null> {
  const events = await getUpcomingEvents();
  return events[0] ?? null;
}

export async function getEventById(id: string): Promise<EventRow | null> {
  if (!isSupabaseConfigured) {
    return demoEvents.find((e) => e.id === id) ?? null;
  }

  const supabase = await createClient();
  const { data, error } = await supabase!
    .from("events")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) return demoEvents.find((e) => e.id === id) ?? null;
  return data;
}

export function getEventCategories() {
  return eventCategories;
}
