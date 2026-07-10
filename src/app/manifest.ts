import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AVE — Vie étudiante à Aix-en-Provence",
    short_name: "AVE",
    description:
      "Événements, aides, santé, logement, urgences : toute la vie étudiante d'Aix-en-Provence.",
    start_url: "/",
    display: "standalone",
    background_color: "#f7f8fb",
    theme_color: "#5b6bf0",
    icons: [
      { src: "/icon", sizes: "64x64", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
