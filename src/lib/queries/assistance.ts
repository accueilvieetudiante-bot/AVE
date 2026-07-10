import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { assistanceCategories, demoAssistanceItems } from "@/lib/demo-data";

export async function getAssistanceCategories() {
  if (!isSupabaseConfigured) return assistanceCategories;

  const supabase = await createClient();
  const { data, error } = await supabase!
    .from("assistance_categories")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error || !data) return assistanceCategories;
  return data;
}

export async function getAssistanceCategoryBySlug(slug: string) {
  const categories = await getAssistanceCategories();
  return categories.find((c) => c.slug === slug) ?? null;
}

export async function getAssistanceItemsByCategorySlug(slug: string) {
  const categories = await getAssistanceCategories();
  const category = categories.find((c) => c.slug === slug);
  if (!category) return [];

  if (!isSupabaseConfigured) {
    return demoAssistanceItems
      .filter((i) => i.category_id === category.id)
      .sort((a, b) => a.sort_order - b.sort_order);
  }

  const supabase = await createClient();
  const { data, error } = await supabase!
    .from("assistance_items")
    .select("*")
    .eq("category_id", category.id)
    .order("sort_order", { ascending: true });

  if (error || !data) {
    return demoAssistanceItems
      .filter((i) => i.category_id === category.id)
      .sort((a, b) => a.sort_order - b.sort_order);
  }
  return data;
}
