import { notFound } from "next/navigation";
import { Inbox } from "lucide-react";
import { HeaderBar } from "@/components/shared/header-bar";
import { EmptyState } from "@/components/shared/empty-state";
import { AppListItem } from "@/components/assistance/app-list-item";
import { EmergencyTile } from "@/components/assistance/emergency-tile";
import { AidCard } from "@/components/assistance/aid-card";
import {
  getAssistanceCategoryBySlug,
  getAssistanceItemsByCategorySlug,
} from "@/lib/queries/assistance";

export default async function AssistanceCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = await getAssistanceCategoryBySlug(slug);
  if (!category) notFound();

  const items = await getAssistanceItemsByCategorySlug(slug);

  return (
    <div>
      <HeaderBar title={category.label} />

      {items.length === 0 ? (
        <EmptyState
          icon={Inbox}
          title="Contenu à venir"
          description="Cette catégorie sera complétée prochainement."
        />
      ) : (
        <div className="space-y-3">
          {items.map((item) => {
            if (item.type === "contact") {
              return <EmergencyTile key={item.id} item={item} />;
            }
            if (item.type === "aide") {
              return <AidCard key={item.id} item={item} />;
            }
            return <AppListItem key={item.id} item={item} />;
          })}
        </div>
      )}
    </div>
  );
}
