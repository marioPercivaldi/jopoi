# 0003. Todo el acceso a datos con Drizzle ORM

- Fecha: 2026-10-26
- Estado: Aceptada

## Contexto

Se pidió que toda la aplicación use un ORM: nada de SQL suelto ni consultas de datos con el cliente de Supabase. Hace falta soporte para PostGIS, transacciones y políticas RLS, y migraciones versionadas.

## Decisión

- **Drizzle ORM** con el driver `postgres` (postgres.js). El esquema vive en `src/infrastructure/db/schema` y es la fuente de verdad.
- **drizzle-kit** genera las migraciones en `supabase/migrations`, con el formato de nombres de Supabase. Así hay un solo historial que aplican tanto Drizzle como la CLI de Supabase.
- Tablas, enums, columnas PostGIS y políticas RLS se definen en el esquema de Drizzle. Lo único en SQL son las migraciones personalizadas para lo que Drizzle no modela: triggers y extensiones.
- Para que RLS aplique, las transacciones del ORM correrán con el rol y el usuario de la sesión (`set local role` y los datos del token).
- Supabase se usa solo para autenticación y almacenamiento de archivos.
- ESLint prohíbe importar `drizzle-orm`, `postgres` o `@supabase/supabase-js` fuera de `src/infrastructure`. El CI falla si el esquema cambia sin su migración.

## Consecuencias

- Tipos de TypeScript de punta a punta, desde la tabla hasta la pantalla.
- Prisma quedó descartado: es más pesado y su soporte de PostGIS es limitado.
