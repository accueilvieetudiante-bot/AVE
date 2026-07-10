"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";

type ActionState = { error: string | null };
type MagicLinkState = { error: string | null; sent: boolean };

export async function signInWithPassword(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  if (!isSupabaseConfigured) {
    return { error: "Supabase n'est pas configuré sur cet environnement." };
  }

  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  const supabase = await createClient();
  const { error } = await supabase!.auth.signInWithPassword({ email, password });

  if (error) return { error: "Email ou mot de passe incorrect." };

  redirect("/");
}

export async function signUpWithPassword(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  if (!isSupabaseConfigured) {
    return { error: "Supabase n'est pas configuré sur cet environnement." };
  }

  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const fullName = String(formData.get("full_name") ?? "");

  if (password.length < 8) {
    return { error: "Le mot de passe doit contenir au moins 8 caractères." };
  }

  const supabase = await createClient();
  const { error } = await supabase!.auth.signUp({
    email,
    password,
    options: { data: { full_name: fullName } },
  });

  if (error) return { error: "Impossible de créer le compte : " + error.message };

  redirect("/onboarding");
}

export async function signInWithMagicLink(
  _prev: MagicLinkState,
  formData: FormData,
): Promise<MagicLinkState> {
  if (!isSupabaseConfigured) {
    return {
      error: "Supabase n'est pas configuré sur cet environnement.",
      sent: false,
    };
  }

  const email = String(formData.get("email") ?? "");
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  const supabase = await createClient();
  const { error } = await supabase!.auth.signInWithOtp({
    email,
    options: { emailRedirectTo: `${appUrl}/auth/callback` },
  });

  if (error) {
    return { error: "Impossible d'envoyer le lien de connexion.", sent: false };
  }

  return { error: null, sent: true };
}

export async function signOut() {
  if (!isSupabaseConfigured) redirect("/");

  const supabase = await createClient();
  await supabase!.auth.signOut();
  redirect("/login");
}
