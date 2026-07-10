# AVE — Application de Vie Étudiante (Aix-en-Provence)

Plateforme mobile-first qui centralise événements étudiants, aides, santé,
logement, urgences et bons plans pour les étudiants d'Aix-en-Provence.

Voir [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md) pour le cadrage complet
(analyse, architecture, arborescence, wireframes, design system, schéma
Supabase, API).

## Démarrer en local

```bash
cp .env.example .env.local   # renseigner vos clés Supabase / Stripe
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000). Sans variables
Supabase configurées, l'app tourne avec des données de démonstration
(voir `src/lib/demo-data.ts`).

## Base de données Supabase

Le schéma SQL est dans `supabase/migrations/0001_init.sql`, les données de
démo dans `supabase/seed.sql`. À appliquer via le CLI Supabase ou le SQL
Editor du dashboard de votre projet.

## App native (Capacitor)

Le wrapper natif encapsule l'app déployée (voir `capacitor.config.ts` pour
le détail et les prérequis Xcode/Android Studio, non disponibles dans un
environnement Linux).

## Scripts

- `npm run dev` — serveur de développement
- `npm run build` — build de production
- `npm run lint` — ESLint
- `npm run cap:sync` — synchronise le wrapper Capacitor après un build
