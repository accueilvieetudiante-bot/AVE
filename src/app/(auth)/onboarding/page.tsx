import { redirect } from "next/navigation";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { OnboardingForm } from "@/components/auth/onboarding-form";
import { getCurrentUser, getCurrentProfile } from "@/lib/queries/profile";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export default async function OnboardingPage() {
  if (isSupabaseConfigured) {
    const user = await getCurrentUser();
    if (!user) redirect("/login");
  }

  const profile = await getCurrentProfile();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bienvenue sur AVE 👋</CardTitle>
        <CardDescription>
          Quelques infos pour personnaliser votre expérience.
        </CardDescription>
      </CardHeader>
      <OnboardingForm profile={profile} />
    </Card>
  );
}
