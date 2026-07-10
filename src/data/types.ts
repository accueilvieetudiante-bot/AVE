/**
 * Modèle de contenu du Hub Étudiant. Tout le contenu vit en dehors des
 * composants (fichiers `data/cities/<ville>/*`) afin de pouvoir être mis à
 * jour — ou remplacé par un appel API — sans toucher au code, et pour que
 * de nouvelles villes puissent être ajoutées en ne créant qu'un nouveau
 * dossier `data/cities/<slug>`.
 */

export type CityStat = {
  icon: string;
  value: number;
  suffix?: string;
  label: string;
};

export type CityMeta = {
  id: string;
  name: string;
  tagline: string;
  stats: CityStat[];
};

export type HubCategorySlug =
  | 'apps'
  | 'sante'
  | 'urgences'
  | 'aides-financieres'
  | 'aides-alimentaires'
  | 'conseils';

export type AppItem = {
  id: string;
  name: string;
  question: string;
  description: string;
  whyUse: string;
  features: string[];
  color: string;
  websiteUrl?: string;
  iosUrl?: string;
  androidUrl?: string;
};

export type HealthSituation = 'fatigue' | 'moral' | 'parler' | 'medecin';

export type HealthOrg = {
  id: string;
  name: string;
  description: string;
  audience: string;
  why: string;
  how: string;
  phone?: string;
  email?: string;
  address?: string;
  website?: string;
  situations: HealthSituation[];
};

export type FoodNeed = 'courses' | 'gratuit' | 'difficulte' | 'distribution';

export type FoodAidOrg = {
  id: string;
  name: string;
  description: string;
  conditions: string;
  how: string;
  address?: string;
  phone?: string;
  email?: string;
  instagram?: string;
  hours?: string;
  needs: FoodNeed[];
};

export type FinancialSituation =
  | 'etudiant'
  | 'alternance'
  | 'logement'
  | 'transport'
  | 'sante'
  | 'urgence';

export type FinancialAid = {
  id: string;
  name: string;
  whatIsIt: string;
  forWho: string;
  howTo: string;
  estimatedTime: string;
  officialUrl?: string;
  documents: string[];
  situations: FinancialSituation[];
};

export type EmergencyNeed = 'medical' | 'danger' | 'detresse' | 'social';

export type EmergencyContact = {
  id: string;
  name: string;
  phone: string;
  smsCapable?: boolean;
  description: string;
  availability: string;
  needs: EmergencyNeed[];
  featured?: boolean;
};

export type TipPriority = 'urgent' | 'important' | 'a-savoir' | 'bon-plan';

export type Tip = {
  id: string;
  title: string;
  body: string;
  priority: TipPriority;
  publishedAt: string;
};

export type UpcomingTask = {
  id: string;
  title: string;
  windowLabel: string;
  href: string;
};

export type CityContent = {
  meta: CityMeta;
  apps: AppItem[];
  health: HealthOrg[];
  emergency: EmergencyContact[];
  financialAid: FinancialAid[];
  foodAid: FoodAidOrg[];
  tips: Tip[];
  upcomingTasks: UpcomingTask[];
};
