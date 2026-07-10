-- Données de démonstration. Les numéros d'urgence sont les vrais numéros
-- nationaux français ; tout le reste (partenaires, montants d'aides,
-- adresses) est illustratif et doit être vérifié/remplacé avant mise en
-- production par l'équipe éditoriale AVE.

insert into event_categories (slug, label, icon) values
  ('soiree', 'Soirées', 'PartyPopper'),
  ('culture', 'Culture', 'Palette'),
  ('sport', 'Sport', 'Trophy'),
  ('association', 'Associations', 'Users'),
  ('conference', 'Conférences', 'Presentation');

insert into events (title, description, category_id, cover_url, starts_at, address, is_free, price_cents, capacity, seats_taken, organizer_name)
values
  ('Soirée d''intégration BDE', 'La soirée de rentrée qui rassemble tous les campus d''Aix.', 1, null, now() + interval '2 days', 'Le Central, Aix-en-Provence', true, 0, 400, 128, 'BDE Aix'),
  ('Conférence IA & Emploi', 'Rencontre avec des professionnels de l''IA pour préparer votre insertion pro.', 5, null, now() + interval '5 days', 'Amphi A, Campus Schuman', true, 0, 200, 64, 'Junior Entreprise IAE'),
  ('Tournoi de foot inter-campus', 'Tournoi amical entre toutes les facs d''Aix-Marseille.', 3, null, now() + interval '7 days', 'Stade universitaire, Aix-en-Provence', false, 500, 150, 96, 'SUAPS Aix-Marseille');

insert into news (title, body, source) values
  ('Rentrée 2026 : les nouveautés du campus', 'Nouveaux horaires de bibliothèque, travaux terminés au CROUS...', 'university'),
  ('Le BDE lance sa nouvelle carte de réductions', 'Plus de 40 partenaires en centre-ville d''Aix.', 'bde'),
  ('Aix-en-Provence renforce les navettes de nuit', 'La ville étend le réseau Aix en Bus le week-end.', 'city');

insert into partners (name, category, description, discount_label, address) values
  ('Pizzeria Bella Vita', 'restaurant', 'Pizzas au feu de bois en centre-ville.', '-15% sur présentation de la carte étudiante', 'Cours Mirabeau, Aix-en-Provence'),
  ('Librairie Campus', 'commerce', 'Livres universitaires neufs et d''occasion.', '-10% sur les manuels', 'Rue Espariat, Aix-en-Provence');

insert into assistance_categories (slug, label, icon, color, sort_order) values
  ('applications-utiles', 'Applications utiles', 'Smartphone', 'blue', 1),
  ('aides-financieres', 'Aides financières', 'Wallet', 'green', 2),
  ('sante-bien-etre', 'Santé & Bien-être', 'HeartPulse', 'pink', 3),
  ('aide-alimentaire', 'Aide alimentaire', 'UtensilsCrossed', 'orange', 4),
  ('urgences', 'Numéros d''urgence', 'Siren', 'red', 5),
  ('logement', 'Logement étudiant', 'Home', 'indigo', 6),
  ('administratif', 'Assistance administrative', 'Scale', 'slate', 7),
  ('transport', 'Transport', 'Bus', 'cyan', 8),
  ('universites', 'Universités', 'GraduationCap', 'violet', 9),
  ('plans-campus', 'Plans du campus', 'MapPinned', 'teal', 10);

-- Applications utiles
insert into assistance_items (category_id, type, title, subtitle, description, official_url, download_ios_url, download_android_url, sort_order)
select id, 'app', v.title, v.subtitle, v.description, v.official_url, v.ios, v.android, v.sort_order
from assistance_categories, (values
  ('Izly', 'Paiement CROUS', 'Payez vos repas au RU et rechargez votre compte étudiant.', 'https://izly.izly.fr', 'https://apps.apple.com/app/izly', 'https://play.google.com/store/apps/details?id=fr.izly', 1),
  ('CAF', 'Aides au logement', 'Simulez et suivez vos APL directement depuis l''app.', 'https://www.caf.fr', 'https://apps.apple.com/app/caf-mon-compte', 'https://play.google.com/store/apps/details?id=fr.caf.mobile', 2),
  ('Doctolib', 'Rendez-vous médicaux', 'Prenez rendez-vous chez un médecin, dentiste ou psychologue.', 'https://www.doctolib.fr', 'https://apps.apple.com/app/doctolib', 'https://play.google.com/store/apps/details?id=com.doctolib.patient', 3),
  ('SNCF Connect', 'Billets de train', 'Achetez vos billets et profitez de la carte Avantage Jeune.', 'https://www.sncf-connect.com', 'https://apps.apple.com/app/sncf-connect', 'https://play.google.com/store/apps/details?id=com.vsct.vsc.mobile.izicore', 4),
  ('France Identité', 'Papiers d''identité', 'Votre identité numérique officielle et sécurisée.', 'https://france-identite.gouv.fr', 'https://apps.apple.com/app/france-identite', 'https://play.google.com/store/apps/details?id=fr.gouv.franceidentite', 5)
) as v(title, subtitle, description, official_url, ios, android, sort_order)
where assistance_categories.slug = 'applications-utiles';

-- Numéros d'urgence (numéros nationaux officiels)
insert into assistance_items (category_id, type, title, subtitle, phone, sort_order)
select id, 'contact', v.title, v.subtitle, v.phone, v.sort_order
from assistance_categories, (values
  ('SAMU', 'Urgence médicale', '15', 1),
  ('Police / Gendarmerie', 'Urgence sécurité', '17', 2),
  ('Pompiers', 'Urgence incendie/secours', '18', 3),
  ('Numéro d''urgence européen', 'Toutes urgences (mobile, UE)', '112', 4),
  ('Violences Femmes Info', 'Violences conjugales, sexistes', '3919', 5),
  ('3114 — Prévention suicide', 'Écoute et prévention du suicide, 24h/24', '3114', 6),
  ('Enfance en danger', 'Signalement, écoute mineurs', '119', 7)
) as v(title, subtitle, phone, sort_order)
where assistance_categories.slug = 'urgences';

-- Aides financières (montants illustratifs — à vérifier chaque année)
insert into assistance_items (category_id, type, title, subtitle, amount_label, conditions, official_url, sort_order)
select id, 'aide', v.title, v.subtitle, v.amount, v.conditions, v.url, v.sort_order
from assistance_categories, (values
  ('Bourse CROUS', 'Sur critères sociaux', 'Jusqu''à ~600€/mois selon échelon', 'Selon revenus du foyer, calculée via le Dossier Social Étudiant (DSE)', 'https://www.crous-aix-marseille.fr', 1),
  ('APL — Aide au logement', 'Versée par la CAF', 'Variable selon loyer et ville', 'Simulation obligatoire, dossier CAF en ligne', 'https://www.caf.fr', 2),
  ('Fonds d''urgence CROUS', 'Aide ponctuelle', 'Montant évalué au cas par cas', 'Difficulté financière soudaine et imprévue', 'https://www.crous-aix-marseille.fr', 3),
  ('Aides Région Sud', 'Mobilité, formation', 'Variable selon dispositif', 'Étudiants inscrits en région Sud', 'https://www.maregionsud.fr', 4)
) as v(title, subtitle, amount, conditions, url, sort_order)
where assistance_categories.slug = 'aides-financieres';
