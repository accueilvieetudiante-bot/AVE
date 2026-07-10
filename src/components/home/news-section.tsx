import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { NewsRow } from "@/types/database";

const sourceLabels: Record<NewsRow["source"], string> = {
  university: "Université",
  association: "Association",
  bde: "BDE",
  city: "Ville",
};

export function NewsSection({ news }: { news: NewsRow[] }) {
  return (
    <section className="mb-6">
      <h2 className="mb-3 text-sm font-semibold text-muted-foreground">
        📰 Actualités
      </h2>
      <div className="space-y-2">
        {news.map((item) => (
          <Card key={item.id} className="gap-2 p-4">
            <Badge variant="outline" className="w-fit">
              {sourceLabels[item.source]}
            </Badge>
            <p className="text-sm font-medium leading-snug">{item.title}</p>
            {item.body && (
              <p className="line-clamp-2 text-xs text-muted-foreground">
                {item.body}
              </p>
            )}
          </Card>
        ))}
      </div>
    </section>
  );
}
