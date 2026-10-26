# 0005. Arquitectura en capas (puertos y adaptadores)

- Fecha: 2026-10-26
- Estado: Aceptada

## Contexto

La plataforma tiene que ser robusta y poder cambiar de proveedor (hosting, base, pagos) sin reescribir la lógica de negocio.

## Decisión

- `src/domain`: reglas puras, como la máquina de estados de la donación. No importa frameworks ni la base.
- `src/application`: casos de uso, que dependen solo del dominio y de interfaces (puertos), por ejemplo un repositorio de donaciones.
- `src/infrastructure`: implementaciones de esos puertos con Drizzle, Mercado Pago y Georef.
- `src/app`: rutas y pantallas de Next.js, que llaman a los casos de uso.
- Los errores esperados (una transición inválida, un pago duplicado) se devuelven como `Result`, no como excepciones.
- Las variables de entorno se validan con Zod: si falta una, la app no arranca.
- ESLint hace cumplir las dependencias entre capas.

## Consecuencias

- El dominio y los casos de uso se testean sin base de datos.
- Agrega algo de código (interfaces y adaptadores) a cambio de poder cambiar de proveedor sin tocar el negocio.
