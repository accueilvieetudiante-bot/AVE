import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@/types/database";
import { supabaseUrl, supabaseAnonKey, isSupabaseConfigured } from "./env";

export function createClient() {
  if (!isSupabaseConfigured) return null;
  return createBrowserClient<Database>(supabaseUrl!, supabaseAnonKey!);
}
