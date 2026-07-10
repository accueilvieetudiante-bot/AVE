"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { completeOnboarding } from "@/lib/actions/profile";
import type { UserProfile } from "@/types/database";

const initialState = { error: null as string | null };

export function OnboardingForm({ profile }: { profile: UserProfile | null }) {
  const [state, action, pending] = useActionState(completeOnboarding, initialState);

  return (
    <form action={action} className="flex flex-col gap-3">
      <Input
        name="full_name"
        placeholder="Nom complet"
        defaultValue={profile?.full_name ?? ""}
        required
      />
      <Input
        name="university"
        placeholder="Université / école"
        defaultValue={profile?.university ?? ""}
      />
      <Input
        name="field_of_study"
        placeholder="Filière (ex : Licence Informatique)"
        defaultValue={profile?.field_of_study ?? ""}
      />
      <Input
        name="campus"
        placeholder="Campus"
        defaultValue={profile?.campus ?? ""}
      />
      {state.error && <p className="text-sm text-destructive">{state.error}</p>}
      <Button type="submit" disabled={pending}>
        Terminer mon profil
      </Button>
    </form>
  );
}
