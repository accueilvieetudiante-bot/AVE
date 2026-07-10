import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { demoProfile } from "@/lib/demo-data";
import type { UserProfile } from "@/types/database";

export async function getCurrentUser() {
  if (!isSupabaseConfigured) return null;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase!.auth.getUser();

  return user;
}

export async function getCurrentProfile(): Promise<UserProfile | null> {
  if (!isSupabaseConfigured) return demoProfile;

  const user = await getCurrentUser();
  if (!user) return null;

  const supabase = await createClient();
  const { data, error } = await supabase!
    .from("user_profile")
    .select("*")
    .eq("id", user.id)
    .single();

  if (error || !data) return null;
  return data;
}
