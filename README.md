# AVE — Application de Vie Étudiante (Aix-en-Provence)

App mobile Expo / React Native. Voir [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md)
pour le cadrage produit complet (le schéma Supabase notamment reste à jour ;
la partie architecture web y est marquée obsolète depuis le pivot Expo).

## Démarrer en local

```bash
npm install
npx expo start --web   # aperçu rapide dans le navigateur
# ou
npx expo start         # puis scanner le QR code avec Expo Go
```

Le contenu du Hub Étudiant (apps utiles, santé, urgences, aides financières,
aides alimentaires, conseils) est data-driven : voir `src/data/cities/aix-en-provence/`.
Ajouter une nouvelle ville = créer `src/data/cities/<slug>/` sur le même modèle
et l'enregistrer dans `src/data/index.ts`.

## App native (App Store / Play Store)

Ce conteneur ne peut pas compiler d'app native (Xcode nécessite macOS, un
build Android nécessite le SDK Android). Sur une machine équipée :

```bash
npx expo prebuild
npx expo run:ios      # ou npx expo run:android
```

## Structure

- `src/app/` — écrans (Expo Router, file-based)
- `src/components/` — composants UI et composants du Hub
- `src/data/` — contenu par ville (JSON-like TS, remplaçable par une API)
- `src/constants/theme.ts` — design system (couleurs, rayons, ombres, dégradés)
- `supabase/` — schéma SQL et données de démo (backend, indépendant du frontend)

## Scripts

- `npm run web` / `npx expo start --web` — aperçu web (pratique pour itérer vite)
- `npx expo start` — serveur de développement (iOS/Android/web)
- `npm run lint` — ESLint
