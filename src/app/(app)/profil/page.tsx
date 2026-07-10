import Link from "next/link";
import { Settings, LogOut } from "lucide-react";
import { HeaderBar } from "@/components/shared/header-bar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getCurrentProfile } from "@/lib/queries/profile";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { signOut } from "@/lib/actions/auth";

export default async function ProfilPage() {
  const profile = await getCurrentProfile();

  if (!profile) {
    return (
      <div>
        <HeaderBar title="Profil" />
        <Card>
          <p className="text-sm text-muted-foreground">
            Connectez-vous pour accéder à votre profil étudiant.
          </p>
          <Button asChild className="mt-4">
            <Link href="/login">Se connecter</Link>
          </Button>
        </Card>
      </div>
    );
  }

  const initials = (profile.full_name ?? "AV").slice(0, 2).toUpperCase();

  return (
    <div className="flex flex-col gap-4">
      <HeaderBar
        title="Profil"
        actions={
          <Button asChild variant="glass" size="icon" aria-label="Paramètres">
            <Link href="/profil/parametres">
              <Settings className="size-4.5" />
            </Link>
          </Button>
        }
      />

      <Card className="items-center text-center">
        <Avatar className="size-20">
          {profile.avatar_url && <AvatarImage src={profile.avatar_url} />}
          <AvatarFallback className="text-xl">{initials}</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-lg font-semibold">{profile.full_name ?? "Étudiant·e AVE"}</p>
          <p className="text-sm text-muted-foreground">
            {profile.field_of_study ?? "Filière non renseignée"}
          </p>
        </div>
      </Card>

      <Card className="gap-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Université</span>
          <span className="font-medium">{profile.university ?? "—"}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Campus</span>
          <span className="font-medium">{profile.campus ?? "—"}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Ville</span>
          <span className="font-medium">{profile.city}</span>
        </div>
      </Card>

      {isSupabaseConfigured ? (
        <form action={signOut}>
          <Button type="submit" variant="outline" className="w-full gap-2">
            <LogOut className="size-4" /> Se déconnecter
          </Button>
        </form>
      ) : (
        <p className="text-center text-xs text-muted-foreground">
          Mode démo — connectez Supabase pour activer l&apos;authentification.
        </p>
      )}
    </div>
  );
}
