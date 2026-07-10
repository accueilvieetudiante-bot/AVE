import { Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { PartnerRow } from "@/types/database";

export function GoodDealsSection({ partners }: { partners: PartnerRow[] }) {
  return (
    <section className="mb-6">
      <h2 className="mb-3 text-sm font-semibold text-muted-foreground">
        💡 Bon plan étudiant
      </h2>
      <div className="-mx-4 flex snap-x gap-3 overflow-x-auto px-4 pb-1">
        {partners.map((partner) => (
          <Card key={partner.id} className="w-52 shrink-0 snap-start gap-2 p-4">
            <span className="flex size-9 items-center justify-center rounded-xl gradient-brand text-primary-foreground">
              <Sparkles className="size-4" />
            </span>
            <p className="text-sm font-medium leading-snug">{partner.name}</p>
            {partner.discount_label && (
              <Badge className="w-fit">{partner.discount_label}</Badge>
            )}
          </Card>
        ))}
      </div>
    </section>
  );
}
