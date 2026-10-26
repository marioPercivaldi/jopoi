# Jopoi

Plataforma web para gestionar las donaciones de una fundación humanitaria en Argentina. Se usa desde el navegador en celular, tablet o computadora, sin instalar nada.

## Stack

- **Next.js 16 + TypeScript**: frontend (pantallas en React) y backend (acciones de servidor y rutas) en un solo proyecto.
- **Drizzle ORM**: todo el acceso a datos. El esquema en TypeScript es la fuente de verdad y genera las migraciones.
- **Supabase**: Postgres con PostGIS, autenticación y almacenamiento de fotos.
- **Mercado Pago Checkout Pro**: donaciones de dinero.
- **Leaflet + OpenStreetMap** y la API Georef para mapas y direcciones.
- **Vercel**: hosting cuando el MVP esté listo. Mientras tanto, todo corre local.

El código, la base y el esquema están en inglés; la interfaz, en español. El porqué de cada decisión está en [`docs/decisiones`](docs/decisiones).

## Arrancar en local

Requisitos: Node.js 22, pnpm 10 y Docker Desktop.

```bash
pnpm install
cp .env.example .env.local
pnpm db:start      # Postgres + PostGIS de Supabase en Docker; aplica las migraciones
pnpm dev           # http://localhost:3010
```

Jopoi usa puertos propios para no chocar con otras apps locales: web en 3010, tests e2e en 3110 y Supabase en 544xx (la base en 54422).

## Comandos

| Comando                                   | Qué hace                                                         |
| ----------------------------------------- | ---------------------------------------------------------------- |
| `pnpm dev`                                | Levanta la app en modo desarrollo                                |
| `pnpm check`                              | Lint, tipos, formato y tests unitarios                           |
| `pnpm test:e2e`                           | Tests de punta a punta en celular y escritorio (Playwright)      |
| `pnpm db:start` / `pnpm db:stop`          | Prende y apaga la base local                                     |
| `pnpm db:generate`                        | Genera la migración a partir de cambios en el esquema de Drizzle |
| `pnpm db:generate:custom --name=<nombre>` | Crea una migración SQL vacía (solo para triggers y extensiones)  |
| `pnpm db:reset`                           | Recrea la base local y vuelve a aplicar todas las migraciones    |

## Estructura

```
src/
  app/              rutas y pantallas de Next.js
  domain/           reglas de negocio puras (sin Next, sin base de datos)
  application/      casos de uso, que hablan con interfaces (puertos)
  infrastructure/   adaptadores: Drizzle, Mercado Pago, Georef
  ui/               componentes visuales reutilizables
  config/           variables de entorno validadas con Zod
  i18n/             textos de la interfaz (español)
supabase/
  migrations/       migraciones generadas por Drizzle (y las SQL personalizadas)
e2e/                tests de Playwright
```

ESLint impide que `domain` importe frameworks o capas externas, y que cualquier código fuera de `infrastructure` acceda a la base.

## Flujo de ramas

| Rama               | Sale de   | Entra a   | Tipo de merge |
| ------------------ | --------- | --------- | ------------- |
| `feature/<nombre>` | `develop` | `develop` | Squash        |
| `release/<x.y.z>`  | `develop` | `main`    | Merge commit  |
| `hotfix/<x.y.z>`   | `main`    | `main`    | Merge commit  |

- `main` es producción y `develop` es integración. Las dos están protegidas: todo entra por PR.
- Al mergear a `main`, una Action abre sola la PR `main → develop`. Esa PR se mergea con **merge commit**, nunca squash, para que las ramas queden sincronizadas.
- Al mergear una `release/x.y.z` o `hotfix/x.y.z` a `main`, se crea el tag `vx.y.z`.

Detalle en [`docs/decisiones/0002-flujo-de-ramas.md`](docs/decisiones/0002-flujo-de-ramas.md).
