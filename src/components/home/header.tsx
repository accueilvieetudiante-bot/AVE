import Link from "next/link";
import { Bell } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export function HomeHeader({
  name = "Étudiant·e",
  city = "Aix-en-Provence",
  avatarUrl,
}: {
  name?: string;
  city?: string;
  avatarUrl?: string | null;
}) {
  return (
    <header className="mb-6 flex items-center justify-between gap-3">
      <Link href="/profil" className="flex items-center gap-3">
        <Avatar className="size-11">
          {avatarUrl && <AvatarImage src={avatarUrl} />}
          <AvatarFallback>{name.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm text-muted-foreground">
            Salut {name} 👋 · {city}
          </p>
          <p className="text-lg font-semibold gradient-text">AVE</p>
        </div>
      </Link>
      <Button variant="glass" size="icon" aria-label="Notifications">
        <Bell className="size-4.5" />
      </Button>
    </header>
  );
}
