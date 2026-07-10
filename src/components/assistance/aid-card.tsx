import { ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { AssistanceItem } from "@/types/database";

export function AidCard({ item }: { item: AssistanceItem }) {
  return (
    <Card className="gap-2 p-4">
      <p className="font-medium">{item.title}</p>
      {item.subtitle && (
        <p className="text-xs text-muted-foreground">{item.subtitle}</p>
      )}
      {item.amount_label && (
        <Badge variant="outline" className="w-fit">
          {item.amount_label}
        </Badge>
      )}
      {item.conditions && (
        <p className="text-sm text-muted-foreground">{item.conditions}</p>
      )}
      {item.official_url && (
        <Button size="sm" variant="secondary" className="mt-1 w-fit" asChild>
          <a href={item.official_url} target="_blank" rel="noopener noreferrer">
            Faire une demande
            <ExternalLink className="size-3.5" />
          </a>
        </Button>
      )}
    </Card>
  );
}
