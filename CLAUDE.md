# Jopoi: rules for contributors and agents

See also `AGENTS.md` (Next.js version notes, maintained by Next.js).

- **Everything in English**: code, identifiers, database schema, migrations, branch names, commit messages. Only user-facing text is in Spanish, and it lives in `src/i18n/*.json`, never hard-coded.
- **All data access through the Drizzle ORM**, inside `src/infrastructure`. No hand-written SQL in application code and no data queries with the Supabase client. The only SQL allowed is in custom migrations for what Drizzle cannot model (triggers, extensions). ESLint enforces the import boundaries.
- **Layers**: `src/domain` (pure rules, no framework imports) ← `src/application` (use cases, ports) ← `src/infrastructure` (Drizzle, Mercado Pago, Georef adapters) and `src/app` (Next.js routes). Dependencies point inward only.
- **Expected failures are values** (`Result` in `src/domain/shared/result.ts`); exceptions are for the unexpected.
- **Money is append-only**: no UPDATE or DELETE on money tables; corrections are reversing journal entries. Amounts are integer cents.
- **Branches**: `feature/*` from `develop` → PR to `develop` (squash). `release/x.y.z` from `develop` → PR to `main` (merge commit). `hotfix/x.y.z` from `main`. Never push to `main` or `develop` directly. Details in `docs/decisiones/0002-flujo-de-ramas.md`.
- **Before a PR**: `pnpm check` and `pnpm test:e2e` pass; schema changes ship with `pnpm db:generate` output.
- **Local ports** (to avoid clashing with other local apps): web 3010, e2e 3110, Supabase 544xx (database on 54422).
