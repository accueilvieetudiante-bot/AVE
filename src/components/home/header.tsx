import { Bell } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export function HomeHeader({
  name = "Camille",
  city = "Aix-en-Provence",
}: {
  name?: string;
  city?: string;
}) {
  return (
    <header className="mb-6 flex items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <Avatar className="size-11">
          <AvatarFallback>{name.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm text-muted-foreground">
            Salut {name} 👋 · {city}
          </p>
          <p className="text-lg font-semibold gradient-text">AVE</p>
        </div>
      </div>
      <Button variant="glass" size="icon" aria-label="Notifications">
        <Bell className="size-4.5" />
      </Button>
    </header>
  );
}
