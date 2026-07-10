import { ExternalLink, Download } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { AssistanceItem } from "@/types/database";

export function AppListItem({ item }: { item: AssistanceItem }) {
  return (
    <Card className="gap-3 p-4">
      <div className="flex items-start gap-3">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl gradient-brand text-sm font-semibold text-primary-foreground">
          {item.title.slice(0, 1)}
        </span>
        <div className="min-w-0">
          <p className="font-medium">{item.title}</p>
          {item.subtitle && (
            <p className="text-xs text-muted-foreground">{item.subtitle}</p>
          )}
        </div>
      </div>
      {item.description && (
        <p className="text-sm text-muted-foreground">{item.description}</p>
      )}
      <div className="flex flex-wrap gap-2">
        {(item.download_ios_url || item.download_android_url) && (
          <Button size="sm" variant="secondary" asChild>
            <a
              href={item.download_ios_url ?? item.download_android_url ?? "#"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Download className="size-3.5" />
              Télécharger
            </a>
          </Button>
        )}
        {item.official_url && (
          <Button size="sm" variant="ghost" asChild>
            <a href={item.official_url} target="_blank" rel="noopener noreferrer">
              Site officiel
              <ExternalLink className="size-3.5" />
            </a>
          </Button>
        )}
      </div>
    </Card>
  );
}
