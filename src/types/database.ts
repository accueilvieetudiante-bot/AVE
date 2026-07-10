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

export type UserProfile = {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  university: string | null;
  field_of_study: string | null;
  campus: string | null;
  city: string;
  push_subscription: Record<string, unknown> | null;
  created_at: string;
};

export type EventTicket = {
  id: string;
  event_id: string;
  user_id: string;
  qr_code: string;
  status: "confirmed" | "cancelled" | "used";
  purchased_at: string;
};

export type Payment = {
  id: string;
  ticket_id: string;
  stripe_payment_intent_id: string | null;
  amount_cents: number;
  currency: string;
  method: "card" | "apple_pay" | "google_pay" | null;
  status: "pending" | "succeeded" | "failed" | "refunded";
  created_at: string;
};

export type Favorite = {
  user_id: string;
  target_type: "event" | "assistance_item" | "partner";
  target_id: string;
  created_at: string;
};

export type NotificationRow = {
  id: string;
  user_id: string;
  title: string;
  body: string | null;
  deep_link: string | null;
  read_at: string | null;
  created_at: string;
};

type Insertable<Row, OptionalKeys extends keyof Row = never> = Partial<
  Pick<Row, OptionalKeys>
> &
  Omit<Row, OptionalKeys>;

export type Database = {
  public: {
    Tables: {
      event_categories: {
        Row: EventCategory;
        Insert: Insertable<EventCategory, "id" | "icon">;
        Update: Partial<EventCategory>;
        Relationships: [];
      };
      events: {
        Row: EventRow;
        Insert: Insertable<
          EventRow,
          | "id"
          | "cover_url"
          | "gallery"
          | "ends_at"
          | "address"
          | "lat"
          | "lng"
          | "is_free"
          | "price_cents"
          | "capacity"
          | "seats_taken"
          | "organizer_name"
          | "status"
          | "created_at"
        >;
        Update: Partial<EventRow>;
        Relationships: [];
      };
      news: {
        Row: NewsRow;
        Insert: Insertable<NewsRow, "id" | "body" | "cover_url" | "published_at">;
        Update: Partial<NewsRow>;
        Relationships: [];
      };
      partners: {
        Row: PartnerRow;
        Insert: Insertable<
          PartnerRow,
          "id" | "category" | "description" | "discount_label" | "logo_url" | "address"
        >;
        Update: Partial<PartnerRow>;
        Relationships: [];
      };
      assistance_categories: {
        Row: AssistanceCategory;
        Insert: Insertable<AssistanceCategory, "id" | "icon" | "color" | "sort_order">;
        Update: Partial<AssistanceCategory>;
        Relationships: [];
      };
      assistance_items: {
        Row: AssistanceItem;
        Insert: Insertable<
          AssistanceItem,
          | "id"
          | "subtitle"
          | "description"
          | "logo_url"
          | "phone"
          | "amount_label"
          | "conditions"
          | "documents"
          | "faq"
          | "official_url"
          | "download_ios_url"
          | "download_android_url"
          | "address"
          | "opening_hours"
          | "sort_order"
        >;
        Update: Partial<AssistanceItem>;
        Relationships: [];
      };
      user_profile: {
        Row: UserProfile;
        Insert: Insertable<
          UserProfile,
          | "full_name"
          | "avatar_url"
          | "university"
          | "field_of_study"
          | "campus"
          | "city"
          | "push_subscription"
          | "created_at"
        >;
        Update: Partial<Omit<UserProfile, "id">>;
        Relationships: [];
      };
      event_tickets: {
        Row: EventTicket;
        Insert: Insertable<EventTicket, "id" | "status" | "purchased_at">;
        Update: Partial<EventTicket>;
        Relationships: [];
      };
      payments: {
        Row: Payment;
        Insert: Insertable<
          Payment,
          "id" | "stripe_payment_intent_id" | "currency" | "method" | "status" | "created_at"
        >;
        Update: Partial<Payment>;
        Relationships: [];
      };
      favorites: {
        Row: Favorite;
        Insert: Insertable<Favorite, "created_at">;
        Update: Partial<Favorite>;
        Relationships: [];
      };
      notifications: {
        Row: NotificationRow;
        Insert: Insertable<
          NotificationRow,
          "id" | "body" | "deep_link" | "read_at" | "created_at"
        >;
        Update: Partial<NotificationRow>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
  };
};
