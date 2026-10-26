# 0004. Código en inglés, interfaz en español

- Fecha: 2026-10-26
- Estado: Aceptada

## Decisión

- Todo el sistema se programa en inglés: identificadores, esquema de base, migraciones, nombres de ramas y mensajes de commit.
- La interfaz está en español. Los textos viven en `src/i18n/es.json` y nunca se escriben directo en los componentes, así se pueden sumar idiomas después.
- El glosario de nombres (por ejemplo, bulto → `packages`, Punto Amigo → `centers` con `kind = drop_off_point`) está en el documento del modelo de datos.
