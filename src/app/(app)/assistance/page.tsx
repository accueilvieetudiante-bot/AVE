import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { AssistanceCategoryCard } from "@/components/assistance/category-card";
import { getAssistanceCategories } from "@/lib/queries/assistance";

export default async function AssistancePage() {
  const categories = await getAssistanceCategories();

  return (
    <div>
      <h1 className="mb-4 text-xl font-semibold">Assistance</h1>
      <div className="relative mb-5">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Chercher une aide, un numéro…" className="pl-10" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        {categories.map((category) => (
          <AssistanceCategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
}
