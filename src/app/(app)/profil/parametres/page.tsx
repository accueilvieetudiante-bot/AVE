import { redirect } from "next/navigation";
import { LogOut } from "lucide-react";
import { HeaderBar } from "@/components/shared/header-bar";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { ProfileForm } from "@/components/auth/profile-form";
import { getCurrentProfile } from "@/lib/queries/profile";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { signOut } from "@/lib/actions/auth";

export default async function ParametresPage() {
  const profile = await getCurrentProfile();

  if (!profile) redirect("/login");

  return (
    <div className="flex flex-col gap-4">
      <HeaderBar title="Paramètres" />

      <Card className="flex-row items-center justify-between">
        <div>
          <p className="font-medium">Apparence</p>
          <p className="text-sm text-muted-foreground">Thème clair ou sombre</p>
        </div>
        <ThemeToggle />
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Mon profil</CardTitle>
        </CardHeader>
        <ProfileForm profile={profile} />
      </Card>

      {isSupabaseConfigured && (
        <form action={signOut}>
          <Button type="submit" variant="outline" className="w-full gap-2">
            <LogOut className="size-4" /> Se déconnecter
          </Button>
        </form>
      )}
    </div>
  );
}
