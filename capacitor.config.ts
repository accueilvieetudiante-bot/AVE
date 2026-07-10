import type { CapacitorConfig } from "@capacitor/cli";

/**
 * AVE utilise des Server Components, Server Actions et un client Supabase
 * côté serveur (cookies) — incompatibles avec un export statique Next.js
 * (`output: "export"`). Capacitor encapsule donc l'app déployée via
 * `server.url` (WebView pointant vers l'instance Next.js hébergée), plutôt
 * que d'embarquer des fichiers statiques.
 *
 * Étapes restant à faire sur une machine avec Xcode / Android Studio
 * (impossibles dans ce conteneur Linux) :
 *   1. Déployer l'app Next.js (Vercel ou autre) et renseigner APP_URL ci-dessous.
 *   2. `npx cap add ios` / `npx cap add android`
 *   3. `npx cap sync`
 *   4. Ouvrir avec Xcode / Android Studio pour build, signature et publication.
 */
const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://ave-app.example.com";

const config: CapacitorConfig = {
  appId: "fr.ave.app",
  appName: "AVE",
  webDir: "public",
  server: {
    url: APP_URL,
    cleartext: false,
  },
};

export default config;
