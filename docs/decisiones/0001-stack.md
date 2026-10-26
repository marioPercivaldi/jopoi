# 0001. Stack: Next.js + Supabase

- Fecha: 2026-10-26
- Estado: Aceptada

## Contexto

La fundación hoy gestiona las donaciones por WhatsApp y planillas. Necesita una herramienta fácil para donantes, que use desde el celular con conectividad variable, y un panel para organizar la logística. El presupuesto es bajo, y se busca un MVP que sirva para conseguir sponsors. Mercado Pago tiene que estar integrado desde el MVP. Los usuarios no quieren instalar más apps.

## Decisión

- Web responsive en **Next.js con TypeScript** (opcionalmente instalable como PWA). Un solo proyecto para la vista del donante y el panel de la fundación.
- **Supabase** como backend de datos: Postgres + PostGIS, Auth, Storage y Realtime. Permisos con Row Level Security.
- **Mercado Pago Checkout Pro**, con webhooks idempotentes.
- **Leaflet + OpenStreetMap** para mapas y **API Georef** para normalizar direcciones argentinas.
- Desarrollo **local** (Next.js + Supabase en Docker). Al tener el MVP, se publica en **Vercel + Supabase Cloud**.

## Consecuencias

- Costo inicial US$0. En producción, aproximadamente US$25 a 45 por mes.
- Supabase es Postgres estándar y open source, así que se puede migrar a otro proveedor (por ejemplo AWS) sin reescribir.
- La lógica de negocio va en una capa propia, separada de Next.js y de Supabase, para poder cambiar de proveedor.
- Alternativas descartadas: Next.js + Postgres en AWS Lightsail (más trabajo de operación) y app nativa con Expo (se evalúa en una fase 2).
