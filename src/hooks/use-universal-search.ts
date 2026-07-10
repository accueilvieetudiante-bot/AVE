import { useMemo } from 'react';

import type { CityContent, HubCategorySlug } from '@/data/types';

export type SearchResult = {
  id: string;
  title: string;
  subtitle: string;
  category: HubCategorySlug;
  categoryLabel: string;
  href: string;
};

function matches(query: string, ...fields: (string | undefined)[]) {
  const q = query.trim().toLowerCase();
  if (!q) return false;
  return fields.some((field) => field?.toLowerCase().includes(q));
}

export function useUniversalSearch(query: string, content: CityContent): SearchResult[] {
  return useMemo(() => {
    if (!query.trim()) return [];

    const results: SearchResult[] = [];

    for (const app of content.apps) {
      if (matches(query, app.name, app.description, app.question)) {
        results.push({
          id: app.id,
          title: app.name,
          subtitle: app.description,
          category: 'apps',
          categoryLabel: 'Application',
          href: '/hub/apps',
        });
      }
    }

    for (const org of content.health) {
      if (matches(query, org.name, org.description)) {
        results.push({
          id: org.id,
          title: org.name,
          subtitle: org.description,
          category: 'sante',
          categoryLabel: 'Santé',
          href: '/hub/sante',
        });
      }
    }

    for (const aid of content.financialAid) {
      if (matches(query, aid.name, aid.whatIsIt)) {
        results.push({
          id: aid.id,
          title: aid.name,
          subtitle: aid.whatIsIt,
          category: 'aides-financieres',
          categoryLabel: 'Aide financière',
          href: '/hub/aides-financieres',
        });
      }
    }

    for (const org of content.foodAid) {
      if (matches(query, org.name, org.description)) {
        results.push({
          id: org.id,
          title: org.name,
          subtitle: org.description,
          category: 'aides-alimentaires',
          categoryLabel: 'Aide alimentaire',
          href: '/hub/aides-alimentaires',
        });
      }
    }

    for (const contact of content.emergency) {
      if (matches(query, contact.name, contact.description)) {
        results.push({
          id: contact.id,
          title: contact.name,
          subtitle: `Appeler le ${contact.phone}`,
          category: 'urgences',
          categoryLabel: 'Urgence',
          href: '/hub/urgences',
        });
      }
    }

    return results.slice(0, 12);
  }, [query, content]);
}
