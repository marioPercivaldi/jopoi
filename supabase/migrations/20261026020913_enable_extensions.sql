-- Custom migration: extensions Drizzle does not manage.
-- PostGIS stores pickup addresses and drop-off points as geographic points.
create extension if not exists postgis with schema extensions;
