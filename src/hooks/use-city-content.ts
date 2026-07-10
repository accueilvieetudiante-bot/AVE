import { getCityContent } from '@/data';

/**
 * Point d'entrée unique pour lire le contenu de la ville active. Aujourd'hui
 * la ville est fixe (Aix-en-Provence) ; quand le profil étudiant existera
 * (auth Supabase), cette fonction lira `profile.city` au lieu de la
 * constante par défaut — aucun écran n'aura à changer.
 */
export function useCityContent() {
  return getCityContent();
}
