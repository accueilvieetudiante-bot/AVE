# AVE — Application de Vie Étudiante (Aix-en-Provence)

Document de cadrage produit + technique, avant développement écran par écran.

> **Mise à jour stack (pivot Expo / React Native).** Ce document a été rédigé
> pour une PWA Next.js. Le projet a depuis migré vers **React Native + Expo
> Router** (voir demande "Hub Étudiant Intelligent") pour publier une vraie
> app native App Store/Play Store. Les sections `1` (analyse produit), `7`
> (schéma Supabase) et `8` (API/Server Actions → à traduire en appels client
> Supabase directs ou en Edge Functions) restent valables telles quelles.
> Les sections `2`, `3`, `5`, `6` (architecture Next.js, arborescence,
> composants shadcn/ui, tokens Tailwind CSS) sont **obsolètes** : le code
> actuel vit dans `src/app` (Expo Router), `src/components`, `src/data`
> (contenu data-driven par ville) — voir le code pour l'arborescence à jour.

---

## 1. Analyse du projet

**Positionnement.** AVE n'est pas une "app d'événements de plus" : c'est le point d'entrée unique
de la vie étudiante à Aix-en-Provence — événements, argent, santé, logement, urgence,
administratif, transport. L'app gagne si l'étudiant n'a plus besoin d'ouvrir autre chose.

**Utilisateur cible.** Étudiant(e) à Aix-en-Provence (licence/master, IUT, écoles), usage
quotidien depuis le mobile, sessions courtes (30s–2min), forte tolérance zéro à la friction.

**Contrainte produit clé : "3 clics max".** Ça détermine directement l'architecture de
navigation : 3 onglets seulement, et l'onglet Assistance fonctionne comme un *hub de hubs*
(grandes cartes → sous-page dédiée par thème), jamais un menu profond à tiroirs multiples.

**Décision de plateforme (à valider avec vous — cf. questions en fin de document) :**
techniquement le brief demande "App Store" + Next.js/React/Supabase. Ce sont deux mondes
différents :
- Next.js seul → **PWA mobile-first** (installable, offline partiel, push via Web Push),
  déployable en web, pas de vraie fiche App Store.
- Pour une vraie app native App Store/Play Store en gardant React/TS/Supabase → il faut
  **Capacitor** (ou React Native) au-dessus du même code Next.js/React.

Je pars du principe **PWA mobile-first avec Next.js**, mais avec une architecture qui ne
bloque pas un wrap Capacitor plus tard (pas de dépendance à des API Node côté client, tout
le rendu critique en Client Components mobiles). À confirmer.

**Réutilisation de l'existant.** Le scaffold "Campus Connect" déjà présent sur cette branche
(Tailwind v4 + design tokens OKLCH + glassmorphism + composants shadcn maison + Framer Motion
+ next-themes) est repris tel quel comme fondation visuelle : palette, glass, radius, ombres,
Button/Card/Badge/Avatar/Tabs/DropdownMenu/Tooltip/Separator. Ce qui change : la navigation
(sidebar desktop → **bottom nav 3 onglets mobile-first**) et tout le contenu applicatif
(remplace la landing marketing + dashboard générique).

---

## 2. Architecture complète

```
┌─────────────────────────────────────────────────────────────────┐
│                         Client (PWA)                            │
│  Next.js App Router · React 19 · TypeScript · Tailwind v4       │
│  shadcn/ui (Radix) · Framer Motion · next-themes                │
│                                                                   │
│  ┌───────────────┐ ┌───────────────┐ ┌─────────────────────┐    │
│  │   Accueil     │ │  Événements   │ │     Assistance       │    │
│  │  (Server +    │ │ (Server list  │ │  (10 hubs → sous-    │    │
│  │  Client isl.) │ │ + Client      │ │  pages statiques/    │    │
│  │               │ │ filtres)      │ │  data-driven)        │    │
│  └───────────────┘ └───────────────┘ └─────────────────────┘    │
│         Bottom Navigation (persistante, animée)                  │
└───────────────────────────┬───────────────────────────────────────┘
                            │ Server Actions / Route Handlers
┌───────────────────────────▼───────────────────────────────────────┐
│                       Supabase (BaaS)                             │
│  Auth (email + magic link + OAuth université si dispo)            │
│  Postgres (RLS activé partout) · Storage (images events/partners) │
│  Edge Functions (webhooks Stripe, envoi notifications push)       │
│  Realtime (option : places restantes en direct sur un événement)  │
└───────────────────────────┬───────────────────────────────────────┘
                            │
┌───────────────────────────▼───────────────────────────────────────┐
│  Services tiers : Stripe (CB + Apple Pay + Google Pay via Payment │
│  Request API) · Web Push (VAPID) · Mapbox/Google Maps (cartes)    │
└─────────────────────────────────────────────────────────────────┘
```

**Principes d'architecture applicative**

- **Server Components par défaut**, `"use client"` seulement pour l'interactif (filtres,
  animations, formulaires, favoris optimistes).
- **Server Actions** pour toutes les mutations (participer à un événement, ajouter un favori,
  soumettre une demande d'aide) — pas de couche API REST maison sauf pour les webhooks
  (Stripe) et les endpoints appelés par des systèmes externes.
- **Feature-based**, pas de découpage par type de fichier : chaque domaine (`events`,
  `assistance`, `home`) possède ses composants, hooks, requêtes et types au même endroit.
  `components/ui/*` reste le seul dossier transverse (design system pur, zéro logique
  métier).
- **Data access layer unique** (`lib/supabase/queries/*`) : aucune page n'appelle
  `supabase.from(...)` directement, tout passe par des fonctions typées réutilisables et
  testables.
- **RLS Postgres = seule ligne de défense côté données.** Le client (mobile) n'est jamais
  fiable : toute règle d'accès (favoris privés, historique perso, paiement) est écrite en
  policy SQL, pas seulement en logique front.

---

## 3. Arborescence complète

```
AVE/
├─ docs/
│  └─ ARCHITECTURE.md
├─ public/
│  ├─ icons/                      # icônes PWA (192, 512, maskable)
│  └─ manifest.webmanifest
├─ supabase/
│  ├─ migrations/                 # SQL versionné (schéma §7)
│  ├─ seed.sql                    # données de démo (events, partners…)
│  └─ functions/
│     ├─ stripe-webhook/
│     └─ send-push/
├─ src/
│  ├─ app/
│  │  ├─ layout.tsx                        # <ThemeProvider>, fonts, viewport PWA
│  │  ├─ globals.css                       # tokens Tailwind v4 (existant, repris)
│  │  ├─ manifest.ts                       # next PWA manifest
│  │  ├─ (auth)/
│  │  │  ├─ login/page.tsx
│  │  │  └─ onboarding/page.tsx            # profil étudiant (filière, campus…)
│  │  ├─ (app)/                            # zone connectée avec bottom nav
│  │  │  ├─ layout.tsx                     # <BottomNav/> + <PageTransition/>
│  │  │  ├─ page.tsx                       # 🏠 Accueil
│  │  │  ├─ evenements/
│  │  │  │  ├─ page.tsx                    # liste + recherche + filtres
│  │  │  │  └─ [eventId]/
│  │  │  │     ├─ page.tsx                 # détail événement
│  │  │  │     └─ billet/page.tsx          # billet numérique + QR
│  │  │  └─ assistance/
│  │  │     ├─ page.tsx                    # hub : 10 grandes cartes
│  │  │     ├─ applications-utiles/page.tsx
│  │  │     ├─ aides-financieres/
│  │  │     │  ├─ page.tsx
│  │  │     │  └─ [aideId]/page.tsx
│  │  │     ├─ sante-bien-etre/page.tsx
│  │  │     ├─ aide-alimentaire/page.tsx
│  │  │     ├─ urgences/page.tsx           # tuiles "appel direct" (tel:)
│  │  │     ├─ logement/page.tsx
│  │  │     ├─ administratif/page.tsx
│  │  │     ├─ transport/page.tsx
│  │  │     ├─ universites/page.tsx
│  │  │     └─ plans-campus/page.tsx
│  │  ├─ profil/
│  │  │  ├─ page.tsx
│  │  │  ├─ favoris/page.tsx
│  │  │  ├─ historique/page.tsx
│  │  │  └─ parametres/page.tsx
│  │  ├─ recherche/page.tsx                # recherche globale (⌘K mobile = bouton dédié)
│  │  └─ api/
│  │     └─ webhooks/stripe/route.ts       # relai vers edge function si besoin
│  │
│  ├─ components/
│  │  ├─ ui/                        # design system pur (déjà scaffoldé)
│  │  │  ├─ button.tsx card.tsx badge.tsx avatar.tsx tabs.tsx
│  │  │  ├─ dropdown-menu.tsx tooltip.tsx separator.tsx
│  │  │  ├─ dialog.tsx sheet.tsx skeleton.tsx toast.tsx (sonner) input.tsx
│  │  ├─ navigation/
│  │  │  ├─ bottom-nav.tsx
│  │  │  └─ page-transition.tsx
│  │  ├─ home/
│  │  │  ├─ header.tsx  featured-event.tsx  upcoming-events-rail.tsx
│  │  │  ├─ news-section.tsx  good-deals-section.tsx  student-life-section.tsx
│  │  ├─ events/
│  │  │  ├─ event-card.tsx  event-filters.tsx  event-search.tsx
│  │  │  ├─ event-detail.tsx  ticket-qr.tsx  checkout-sheet.tsx
│  │  ├─ assistance/
│  │  │  ├─ assistance-grid.tsx  category-card.tsx
│  │  │  ├─ aid-card.tsx  emergency-tile.tsx  app-list-item.tsx
│  │  └─ shared/
│  │     ├─ favorite-button.tsx  share-button.tsx  map-embed.tsx  empty-state.tsx
│  │
│  ├─ lib/
│  │  ├─ supabase/
│  │  │  ├─ client.ts (browser) · server.ts (RSC/Server Actions) · middleware.ts
│  │  │  └─ queries/
│  │  │     ├─ events.ts  assistance.ts  news.ts  favorites.ts  notifications.ts  profile.ts
│  │  ├─ actions/                    # Server Actions ("use server")
│  │  │  ├─ events.ts (join/annuler)  favorites.ts  checkout.ts  push.ts
│  │  ├─ stripe/ client.ts  payment-intent.ts
│  │  ├─ validations/ (zod schemas par domaine)
│  │  └─ utils.ts (cn, date fr, distance…)
│  │
│  ├─ hooks/
│  │  ├─ use-favorites.ts  use-geolocation.ts  use-push-subscription.ts
│  │
│  └─ types/
│     └─ database.ts             # types générés (supabase gen types typescript)
├─ .env.example
├─ tailwind.config / postcss.config.mjs
└─ package.json
```

---

## 4. Wireframes (basse fidélité)

### 4.1 Accueil

```
┌───────────────────────────────┐
│ [AVE]        Aix-en-Provence  │  ← logo + ville
│ [avatar]  Salut Camille 👋 [🔔]│  ← photo, message bienvenue, notifs
├───────────────────────────────┤
│ 🔥 À LA UNE                    │
│ ┌───────────────────────────┐ │
│ │   grand visuel événement   │ │
│ │   [Gratuit]                │ │
│ │   Titre · date             │ │
│ │            [Participer →]  │ │
│ └───────────────────────────┘ │
├───────────────────────────────┤
│ 📅 Cette semaine     Tout voir│
│ [card][card][card] → scroll-x │
├───────────────────────────────┤
│ 📰 Actualités         Tout voir│
│ [Université] [BDE] [Ville]    │
├───────────────────────────────┤
│ 💡 Bons plans          Tout voir│
│ [Resto -20%][Partenaire]      │
├───────────────────────────────┤
│ ❤️ Vie étudiante                │
│ [Conseil logement][Santé]     │
└───────────────────────────────┘
│ 🏠 Accueil  📅 Événements  🆘 Assistance │  ← bottom nav fixe
```

### 4.2 Événements (liste)

```
┌───────────────────────────────┐
│ ← Événements                  │
│ [🔍 Rechercher un événement]  │
│ [Tous][Gratuit][Payant][Sport]│  ← chips filtres scroll-x
│ [Culture][Soirées][Assos][Conf]│
├───────────────────────────────┤
│ ┌─────┐ Titre événement       │
│ │ img │ Ven 12 juil · 20h00   │
│ └─────┘ Le Central · 128 insc.│
│ [Gratuit]              [♡]    │
├───────────────────────────────┤
│  … (liste, infinite scroll)   │
└───────────────────────────────┘
```

### 4.3 Détail événement

```
┌───────────────────────────────┐
│ [image plein cadre]      [←][⇧]│
│                            [♡]│
├───────────────────────────────┤
│ Titre événement                │
│ [Soirée] · Gratuit · 128 insc. │
│ 📅 Ven 12 juil · 20h00          │
│ 📍 Le Central, Aix   [Carte →] │
│ Organisé par : BDE Info        │
│ Description…                   │
│ [Galerie photos →]             │
├───────────────────────────────┤
│         [ Participer ]         │  ← sticky bottom CTA
│  [Ajouter au calendrier] [⇧]   │
└───────────────────────────────┘
```

### 4.4 Assistance (hub)

```
┌───────────────────────────────┐
│ Assistance                    │
│ [🔍 Chercher une aide, un num…]│
├───────────────────────────────┤
│ ┌───────────┐ ┌───────────┐   │
│ │📱 Apps     │ │💰 Aides   │   │
│ │  utiles    │ │ financières│  │
│ └───────────┘ └───────────┘   │
│ ┌───────────┐ ┌───────────┐   │
│ │❤️ Santé    │ │🍽 Aide    │   │
│ └───────────┘ │  aliment. │   │
│ ┌───────────┐ └───────────┘   │
│ │☎ Urgences  │ ┌───────────┐  │
│ │  (rouge)   │ │🏠 Logement│  │
│ └───────────┘ └───────────┘   │
│  … (10 cartes, grille 2 col)  │
└───────────────────────────────┘
```

### 4.5 Urgences (sous-page type "tuiles d'appel")

```
┌───────────────────────────────┐
│ ← Numéros d'urgence           │
│ ┌───────────────────────────┐ │
│ │ 🚑 SAMU            15  📞 │ │  ← tap = tel:15 direct
│ ├───────────────────────────┤ │
│ │ 👮 Police          17  📞 │ │
│ ├───────────────────────────┤ │
│ │ 🔥 Pompiers         18  📞 │ │
│ ├───────────────────────────┤ │
│ │ 🆘 Violences  3919  📞    │ │
│ ├───────────────────────────┤ │
│ │ 💬 Suicide Écoute   📞    │ │
│ └───────────────────────────┘ │
└───────────────────────────────┘
```

---

## 5. Inventaire des composants

**Design system (`components/ui`, existant + à ajouter)**
Button, Card, Badge, Avatar, Tabs, DropdownMenu, Tooltip, Separator *(faits)* +
**Input, Textarea, Dialog, Sheet (drawer mobile), Skeleton, Toast (sonner), Switch,
Chip/ToggleGroup (filtres), Progress, EmptyState.**

**Navigation**
`BottomNav` (3 items, indicateur animé `layoutId`, safe-area iOS), `PageTransition`
(Framer Motion `AnimatePresence` sur changement de route), `HeaderBar` (retour + titre +
actions contextuelles par page).

**Accueil**
`WelcomeHeader`, `FeaturedEventCard` (grand format), `EventRail` (scroll horizontal +
snap), `NewsCard`, `GoodDealCard`, `StudentLifeTile`.

**Événements**
`EventSearchBar`, `CategoryChips`, `EventCard` (liste), `EventGallery`, `MapEmbed`,
`OrganizerBadge`, `CheckoutSheet` (Stripe/Apple Pay/Google Pay), `TicketQr`,
`AddToCalendarButton`, `ShareButton`, `FavoriteButton`.

**Assistance**
`AssistanceCategoryCard` (grande carte hub), `AppListItem` (logo + description +
"pourquoi l'utiliser" + CTA télécharger/lien), `AidCard` (montant/conditions/FAQ),
`EmergencyTile` (appel direct, `tel:`, style urgence rouge), `PlaceListItem`
(horaires + carte + itinéraire — réutilisé pour aide alimentaire, santé, logement).

**Transverses**
`FavoriteButton`, `ShareButton` (Web Share API + fallback copier lien),
`SkeletonList`/`SkeletonCard` (états de chargement), `Toast` (confirmations),
`EmptyState` (recherche sans résultat, aucun favori…), `SearchGlobal` (overlay plein
écran, résultats groupés Événements/Assistance/Actus).

---

## 6. Design System

Repris et étendu depuis le scaffold existant (`globals.css`) :

- **Couleurs** : tokens OKLCH sémantiques (`background`, `card`, `primary`, `muted`,
  `destructive`…) + variante `.dark` complète. `--destructive` réservé aux tuiles Urgence.
- **Dégradé de marque** : `--gradient-brand` (violet → bleu) pour CTA, badges actifs,
  indicateur de nav actif.
- **Glassmorphism** : `.glass` (blur 20px + saturate 180%, bordure translucide, ombre
  douce) pour cards, bottom nav, modals — utilisé avec parcimonie (pas sur tout, sinon
  perd son effet "premium").
- **Rayons** : `--radius` 1rem de base, échelle sm→2xl déjà définie.
- **Ombres** : `.shadow-soft` (double ombre, light/dark distincts).
- **Typo** : pile système `-apple-system` (rendu natif iOS/Android, zéro dépendance
  réseau — décision déjà prise pour fiabilité offline/PWA).
- **Motion (Framer Motion)** : durées 200–400ms, easing `easeOut` / spring léger
  (`bounce: 0.2`) pour les indicateurs actifs, `whileInView` pour les sections Accueil,
  `AnimatePresence` pour les transitions de page et les sheets/modals.
- **Iconographie** : Lucide exclusivement, taille 18–20px en usage courant.
- **Accessibilité** : contrastes AA sur les deux thèmes, `aria-label` sur tous les
  boutons icône-seul, cibles tactiles ≥ 44px (zone d'appui bottom nav, tuiles urgence).

---

## 7. Base de données (Supabase / Postgres)

Schéma normalisé, RLS activé sur toutes les tables contenant des données utilisateur.

```sql
-- Profils (1:1 avec auth.users)
create table user_profile (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  avatar_url text,
  university text,
  field_of_study text,
  campus text,
  city text default 'Aix-en-Provence',
  push_subscription jsonb,          -- Web Push subscription
  created_at timestamptz default now()
);

-- Catégories d'événements (Sport, Culture, Soirées, Associations, Conférences…)
create table event_categories (
  id serial primary key,
  slug text unique not null,
  label text not null,
  icon text
);

create table events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  category_id int references event_categories(id),
  cover_url text,
  gallery jsonb default '[]',
  starts_at timestamptz not null,
  ends_at timestamptz,
  address text,
  lat double precision,
  lng double precision,
  is_free boolean default true,
  price_cents int default 0,
  capacity int,
  seats_taken int default 0,
  organizer_name text,
  organizer_id uuid references user_profile(id),
  status text default 'published', -- draft | published | cancelled
  created_at timestamptz default now()
);

create table event_tickets (
  id uuid primary key default gen_random_uuid(),
  event_id uuid references events(id) on delete cascade,
  user_id uuid references user_profile(id) on delete cascade,
  qr_code text unique not null,
  status text default 'confirmed', -- confirmed | cancelled | used
  purchased_at timestamptz default now(),
  unique (event_id, user_id)
);

create table payments (
  id uuid primary key default gen_random_uuid(),
  ticket_id uuid references event_tickets(id) on delete cascade,
  stripe_payment_intent_id text unique,
  amount_cents int not null,
  currency text default 'eur',
  method text,                     -- card | apple_pay | google_pay
  status text default 'pending',   -- pending | succeeded | failed | refunded
  created_at timestamptz default now()
);

-- Actualités (université / associations / BDE / ville)
create table news (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text,
  source text,                     -- university | association | bde | city
  cover_url text,
  published_at timestamptz default now()
);

-- Partenaires / bons plans
create table partners (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text,                   -- restaurant | commerce | service
  description text,
  discount_label text,             -- ex "-20% sur présentation carte étudiante"
  logo_url text,
  address text,
  lat double precision,
  lng double precision
);

-- Hub Assistance : catégories fixes (10) + items par catégorie
create table assistance_categories (
  id serial primary key,
  slug text unique not null,       -- applications-utiles, aides-financieres, …
  label text not null,
  icon text,
  color text,
  sort_order int default 0
);

create table assistance_items (
  id uuid primary key default gen_random_uuid(),
  category_id int references assistance_categories(id) on delete cascade,
  type text not null,               -- app | aide | contact | lieu | info
  title text not null,
  subtitle text,
  description text,
  logo_url text,
  phone text,                       -- pour type=contact (tel: direct)
  amount_label text,                -- pour type=aide ("jusqu'à 150€/mois")
  conditions text,
  documents jsonb default '[]',
  faq jsonb default '[]',
  official_url text,
  download_ios_url text,
  download_android_url text,
  address text,
  lat double precision,
  lng double precision,
  opening_hours jsonb,
  sort_order int default 0
);

create table favorites (
  user_id uuid references user_profile(id) on delete cascade,
  target_type text not null,        -- event | assistance_item | partner
  target_id uuid not null,
  created_at timestamptz default now(),
  primary key (user_id, target_type, target_id)
);

create table notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references user_profile(id) on delete cascade,
  title text not null,
  body text,
  deep_link text,                   -- ex /evenements/{id}
  read_at timestamptz,
  created_at timestamptz default now()
);
```

**RLS — principes appliqués à chaque table utilisateur**
- `user_profile`, `favorites`, `notifications`, `event_tickets`, `payments` :
  `select/insert/update` limités à `auth.uid() = user_id` (ou `id` pour profile).
- `events`, `news`, `partners`, `assistance_categories`, `assistance_items`,
  `event_categories` : lecture publique (`select` pour `anon`/`authenticated`),
  écriture réservée à un rôle `admin` (via claim JWT ou table `admin_users`).
- `payments` : aucune écriture cliente directe — uniquement via l'edge function
  `stripe-webhook` avec la service role key.

---

## 8. API / Server Actions

Pas de couche REST maison sauf webhooks. Tout le reste = **Server Actions** typées,
co-localisées dans `lib/actions/*`.

| Domaine | Action | Description |
|---|---|---|
| Événements | `joinEvent(eventId)` | Crée un `event_tickets`, décrémente les places, gère le cas gratuit vs payant (redirige vers checkout si payant) |
| Événements | `cancelParticipation(ticketId)` | Annule un billet, libère la place |
| Paiement | `createCheckoutSession(eventId)` | Crée un Stripe PaymentIntent (+ Payment Request pour Apple/Google Pay), retourne `client_secret` |
| Paiement | `POST /api/webhooks/stripe` | Route Handler — vérifie la signature Stripe, confirme le paiement, génère le QR du billet |
| Favoris | `toggleFavorite(targetType, targetId)` | Ajoute/retire un favori (optimiste côté client) |
| Notifications | `subscribeToPush(subscription)` | Enregistre la subscription Web Push sur `user_profile` |
| Notifications | `markNotificationRead(id)` | Marque une notification lue |
| Assistance | `getAssistanceItems(categorySlug)` | Lecture publique, cache Next.js (`revalidate`) |
| Recherche | `globalSearch(query)` | Recherche fédérée events + assistance_items + news (Postgres full-text `tsvector`) |
| Profil | `updateProfile(data)` | Mise à jour `user_profile` (validation zod) |
| Calendrier | `getIcsForEvent(eventId)` | Génère un fichier `.ics` téléchargeable (ajout calendrier natif) |

---

## 9. Prochaine étape

Une fois ce cadrage validé, le développement se fera **écran par écran** dans cet ordre :
1. Fondations (layout `(app)`, BottomNav, PageTransition, thème)
2. Accueil
3. Événements (liste → détail → checkout → billet)
4. Assistance (hub → 10 sous-pages)
5. Profil / Favoris / Historique / Paramètres
6. Recherche globale + notifications push

Je ne pars pas encore sur ces écrans — voir les questions ci-dessous.
