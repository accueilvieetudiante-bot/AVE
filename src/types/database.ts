/**
 * Types de tables Supabase, écrits à la main pour correspondre à
 * supabase/migrations/0001_init.sql. À remplacer par `supabase gen types
 * typescript` une fois le projet Supabase réel connecté.
 */

export type EventCategory = {
  id: number;
  slug: string;
  label: string;
  icon: string | null;
};

export type EventRow = {
  id: string;
  title: string;
  description: string | null;
  category_id: number | null;
  cover_url: string | null;
  gallery: string[];
  starts_at: string;
  ends_at: string | null;
  address: string | null;
  lat: number | null;
  lng: number | null;
  is_free: boolean;
  price_cents: number;
  capacity: number | null;
  seats_taken: number;
  organizer_name: string | null;
  status: "draft" | "published" | "cancelled";
  created_at: string;
};

export type NewsRow = {
  id: string;
  title: string;
  body: string | null;
  source: "university" | "association" | "bde" | "city";
  cover_url: string | null;
  published_at: string;
};

export type PartnerRow = {
  id: string;
  name: string;
  category: string | null;
  description: string | null;
  discount_label: string | null;
  logo_url: string | null;
  address: string | null;
};

export type AssistanceCategory = {
  id: number;
  slug: string;
  label: string;
  icon: string | null;
  color: string | null;
  sort_order: number;
};

export type AssistanceItem = {
  id: string;
  category_id: number;
  type: "app" | "aide" | "contact" | "lieu" | "info";
  title: string;
  subtitle: string | null;
  description: string | null;
  logo_url: string | null;
  phone: string | null;
  amount_label: string | null;
  conditions: string | null;
  documents: string[];
  faq: { question: string; answer: string }[];
  official_url: string | null;
  download_ios_url: string | null;
  download_android_url: string | null;
  address: string | null;
  opening_hours: string | null;
  sort_order: number;
};

export type Database = {
  public: {
    Tables: {
      event_categories: { Row: EventCategory };
      events: { Row: EventRow };
      news: { Row: NewsRow };
      partners: { Row: PartnerRow };
      assistance_categories: { Row: AssistanceCategory };
      assistance_items: { Row: AssistanceItem };
    };
  };
};
