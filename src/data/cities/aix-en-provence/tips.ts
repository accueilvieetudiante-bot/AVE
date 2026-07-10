import type { Tip, UpcomingTask } from '@/data/types';

export const tips: Tip[] = [
  {
    id: 'tip-dse',
    title: 'La date limite du DSE approche',
    body: 'Le Dossier Social Étudiant pour la bourse CROUS doit être déposé avant fin mai. Ne le laissez pas traîner.',
    priority: 'urgent',
    publishedAt: '2026-07-08',
  },
  {
    id: 'tip-cvec',
    title: 'CVEC obligatoire avant inscription',
    body: 'La Contribution Vie Étudiante et de Campus (CVEC) doit être acquittée avant toute inscription administrative.',
    priority: 'important',
    publishedAt: '2026-07-05',
  },
  {
    id: 'tip-izly',
    title: 'Rechargez votre compte Izly avant la rentrée',
    body: 'Évitez la file d\'attente au RU en rechargeant votre compte Izly en ligne dès maintenant.',
    priority: 'a-savoir',
    publishedAt: '2026-07-01',
  },
  {
    id: 'tip-tgtg',
    title: 'Paniers à -70% près du campus',
    body: 'Plusieurs commerces du centre-ville proposent des paniers anti-gaspi via Too Good To Go en fin de journée.',
    priority: 'bon-plan',
    publishedAt: '2026-06-28',
  },
  {
    id: 'tip-apl',
    title: 'Simulez votre APL avant de signer un bail',
    body: 'Faire la simulation avant la signature évite les mauvaises surprises sur votre budget logement.',
    priority: 'important',
    publishedAt: '2026-06-20',
  },
];

export const upcomingTasks: UpcomingTask[] = [
  { id: 'task-dse', title: 'Déposer son DSE', windowLabel: 'Avant le 31 mai', href: '/hub/aides-financieres' },
  { id: 'task-apl', title: 'Faire sa demande d\'APL', windowLabel: 'Dès la signature du bail', href: '/hub/aides-financieres' },
  { id: 'task-izly', title: 'Renouveler Izly', windowLabel: 'Avant la rentrée', href: '/hub/apps' },
  { id: 'task-bus', title: 'Acheter son abonnement bus', windowLabel: 'Avant le 15 septembre', href: '/hub/apps' },
  { id: 'task-inscription', title: 'Inscription universitaire', windowLabel: 'Jusqu\'au 20 septembre', href: '/hub/apps' },
  { id: 'task-bourse', title: 'Suivre sa Bourse CROUS', windowLabel: 'Toute l\'année', href: '/hub/aides-financieres' },
];
