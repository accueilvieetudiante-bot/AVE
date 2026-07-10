"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { getCurrentUser } from "@/lib/queries/profile";
import { profileSchema } from "@/lib/validations/profile";

type ActionState = { error: string | null };

async function saveProfile(formData: FormData): Promise<ActionState> {
  if (!isSupabaseConfigured) {
    return { error: "Supabase n'est pas configuré sur cet environnement." };
  }

  const user = await getCurrentUser();
  if (!user) return { error: "Vous devez être connecté(e)." };

  const parsed = profileSchema.safeParse({
    full_name: formData.get("full_name"),
    university: formData.get("university"),
    field_of_study: formData.get("field_of_study"),
    campus: formData.get("campus"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Formulaire invalide." };
  }

  const supabase = await createClient();
  const { error } = await supabase!
    .from("user_profile")
    .update({
      full_name: parsed.data.full_name,
      university: parsed.data.university || null,
      field_of_study: parsed.data.field_of_study || null,
      campus: parsed.data.campus || null,
    })
    .eq("id", user.id);

  if (error) return { error: "Impossible d'enregistrer le profil." };

  revalidatePath("/profil");
  return { error: null };
}

export async function updateProfile(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  return saveProfile(formData);
}

export async function completeOnboarding(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const result = await saveProfile(formData);
  if (result.error) return result;
  redirect("/");
}
