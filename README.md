# Jopoi

Plataforma web para gestionar las donaciones de una fundación humanitaria en Argentina. Se usa desde el navegador en celular, tablet o computadora, sin instalar nada.

## Stack

- **Next.js + TypeScript**: frontend (pantallas en React) y backend (rutas y acciones de servidor) en un solo proyecto.
- **Supabase**: Postgres con PostGIS, autenticación, almacenamiento de fotos y tiempo real.
- **Mercado Pago Checkout Pro**: donaciones de dinero.
- **Leaflet + OpenStreetMap** y la API Georef para mapas y direcciones.
- **Vercel**: hosting cuando el MVP esté listo. Mientras tanto, todo corre local.

El porqué de cada decisión está en [`docs/decisiones`](docs/decisiones).

## Flujo de ramas

| Rama | Sale de | Entra a | Tipo de merge |
| --- | --- | --- | --- |
| `feature/<nombre>` | `develop` | `develop` | Squash |
| `release/<x.y.z>` | `develop` | `main` | Merge commit |
| `hotfix/<x.y.z>` | `main` | `main` | Merge commit |

- `main` es producción y `develop` es integración. Las dos están protegidas: todo entra por PR.
- Al mergear a `main`, una Action abre sola la PR `main → develop`. Esa PR se mergea con **merge commit**, nunca squash, para que las ramas queden sincronizadas.
- Al mergear una `release/x.y.z` o `hotfix/x.y.z` a `main`, se crea el tag `vx.y.z`.

Detalle en [`docs/decisiones/0002-flujo-de-ramas.md`](docs/decisiones/0002-flujo-de-ramas.md).
