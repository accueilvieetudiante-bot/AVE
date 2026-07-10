import Link from "next/link";
import { Home, HeartPulse, Scale } from "lucide-react";
import { Card } from "@/components/ui/card";

const tiles = [
  {
    href: "/assistance/logement",
    icon: Home,
    title: "Trouver un logement",
    description: "Studios, colocations et conseils pour s'installer à Aix.",
  },
  {
    href: "/assistance/sante-bien-etre",
    icon: HeartPulse,
    title: "Prendre soin de vous",
    description: "Médecins, psychologues et écoute étudiante.",
  },
  {
    href: "/assistance/administratif",
    icon: Scale,
    title: "Démarches administratives",
    description: "CVEC, titre de séjour, bourses : on vous guide.",
  },
];

export function StudentLifeSection() {
  return (
    <section className="mb-6">
      <h2 className="mb-3 text-sm font-semibold text-muted-foreground">
        ❤️ Vie étudiante
      </h2>
      <div className="space-y-2">
        {tiles.map((tile) => (
          <Link key={tile.href} href={tile.href}>
            <Card className="flex-row items-center gap-3 p-4">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-secondary/70">
                <tile.icon className="size-4.5 text-primary" />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-medium">{tile.title}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {tile.description}
                </p>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
