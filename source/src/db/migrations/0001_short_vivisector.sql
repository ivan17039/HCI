-- Dodavanje novih stupaca s dopuštenim NULL vrijednostima
ALTER TABLE "reservations" ADD COLUMN "guests" integer;
ALTER TABLE "reservations" ADD COLUMN "contact_name" varchar(100);
ALTER TABLE "reservations" ADD COLUMN "contact_email" varchar(100);
ALTER TABLE "reservations" ADD COLUMN "contact_phone" varchar(20);

-- Ažuriranje postojećih redova s zadanim vrijednostima
UPDATE "reservations"
SET "guests" = 1, "contact_name" = 'Unknown', "contact_email" = 'unknown@example.com', "contact_phone" = '0000000000'
WHERE "guests" IS NULL OR "contact_name" IS NULL OR "contact_email" IS NULL OR "contact_phone" IS NULL;

-- Postavljanje stupaca da ne dopuštaju NULL vrijednosti
ALTER TABLE "reservations"
ALTER COLUMN "guests" SET NOT NULL,
ALTER COLUMN "contact_name" SET NOT NULL,
ALTER COLUMN "contact_email" SET NOT NULL,
ALTER COLUMN "contact_phone" SET NOT NULL;