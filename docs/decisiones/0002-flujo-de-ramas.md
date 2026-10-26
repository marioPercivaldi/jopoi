# 0002. Flujo de ramas

- Fecha: 2026-10-26
- Estado: Aceptada

## Contexto

Se quiere un circuito de validación antes de producción y que `main` y `develop` estén siempre sincronizadas.

## Decisión

- `main` es la rama productiva y `develop` es la de integración. Las dos están protegidas: no se pushea directo, todo entra por PR y no se permite force push.
- Funcionalidades: `feature/<nombre>` sale de `develop` y vuelve a `develop` por PR con **squash**.
- Publicación: `release/<x.y.z>` sale de `develop`. Una vez validada, PR a `main` con **merge commit**.
- Urgencias en producción: `hotfix/<x.y.z>` sale de `main` y vuelve a `main` con **merge commit**.
- Al mergear a `main`, la Action `sincronizar-develop` abre automáticamente la PR `main → develop`. Se mergea con **merge commit**.
- Al mergear una `release/*` o `hotfix/*` a `main`, la Action `crear-tag` crea el tag `v<x.y.z>`.

## Consecuencias

- Siempre se sabe qué versión está en producción por su tag.
- La PR de sincronización la crea el bot de GitHub Actions, así que no dispara otros workflows. Cuando haya CI obligatorio, va a hacer falta un token propio o una GitHub App para esa PR.
- Squash en `main → develop` rompería la sincronización: esa PR siempre va con merge commit.
