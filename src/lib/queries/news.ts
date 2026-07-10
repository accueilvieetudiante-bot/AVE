import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { demoNews, demoPartners } from "@/lib/demo-data";

export async function getLatestNews() {
  if (!isSupabaseConfigured) return demoNews;

  const supabase = await createClient();
  const { data, error } = await supabase!
    .from("news")
    .select("*")
    .order("published_at", { ascending: false })
    .limit(6);

  if (error || !data) return demoNews;
  return data;
}

export async function getPartners() {
  if (!isSupabaseConfigured) return demoPartners;

  const supabase = await createClient();
  const { data, error } = await supabase!.from("partners").select("*").limit(8);

  if (error || !data) return demoPartners;
  return data;
}
