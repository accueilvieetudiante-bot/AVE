"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateProfile } from "@/lib/actions/profile";
import type { UserProfile } from "@/types/database";

const initialState = { error: null as string | null };

export function ProfileForm({ profile }: { profile: UserProfile }) {
  const [state, action, pending] = useActionState(updateProfile, initialState);

  return (
    <form action={action} className="flex flex-col gap-3">
      <label className="flex flex-col gap-1 text-sm">
        Nom complet
        <Input name="full_name" defaultValue={profile.full_name ?? ""} required />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Université / école
        <Input name="university" defaultValue={profile.university ?? ""} />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Filière
        <Input name="field_of_study" defaultValue={profile.field_of_study ?? ""} />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Campus
        <Input name="campus" defaultValue={profile.campus ?? ""} />
      </label>
      {state.error && <p className="text-sm text-destructive">{state.error}</p>}
      <Button type="submit" disabled={pending}>
        Enregistrer
      </Button>
    </form>
  );
}
