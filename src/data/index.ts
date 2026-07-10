import type { CityContent } from '@/data/types';
import { aixEnProvence } from '@/data/cities/aix-en-provence';

/**
 * Registre des villes disponibles. Pour ajouter Marseille, Lyon, Toulouse,
 * Bordeaux… il suffit de créer `data/cities/<slug>/` (même forme que
 * aix-en-provence) et de l'enregistrer ici — aucun composant à modifier.
 */
const cities: Record<string, CityContent> = {
  'aix-en-provence': aixEnProvence,
};

const DEFAULT_CITY = 'aix-en-provence';

export function getCityContent(cityId: string = DEFAULT_CITY): CityContent {
  return cities[cityId] ?? cities[DEFAULT_CITY];
}

export * from '@/data/types';
