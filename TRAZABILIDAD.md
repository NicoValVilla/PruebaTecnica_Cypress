# Trazabilidad de pruebas — versión 2

Relaciona cada prueba automatizada con el nivel y el tipo de prueba, la técnica de diseño que la sustenta y el apartado del syllabus ISTQB CTFL v4.0.1. Las referencias a hallazgos remiten a la tabla «Cambios de la versión 2».

## Ejercicio 1 — Prueba de sistema, extremo a extremo (Cypress)

| ID | Prueba | Archivo | Nivel / tipo | Técnica | Syllabus |
|---|---|---|---|---|---|
| E2E-01 | Compra exitosa de dos productos | `cypress/e2e/compra.cy.js` | Sistema / funcional | Camino principal del flujo; se conserva como prueba de humo (las técnicas formales están en TD-R1 a TD-R4) | §2.2.1, §2.2.2 |
| TD-R1 | Nombre y tarjeta diligenciados → compra | `cypress/e2e/formulario_compra.cy.js` | Sistema / funcional | Tabla de decisión, regla 1 (partición válida en ambos campos) | §4.2.3, §4.2.1 |
| TD-R2 | Sin tarjeta → rechazo | `cypress/e2e/formulario_compra.cy.js` | Sistema / funcional | Tabla de decisión, regla 2 (partición inválida: tarjeta vacía) | §4.2.3, §4.2.1 |
| TD-R3 | Sin nombre → rechazo | `cypress/e2e/formulario_compra.cy.js` | Sistema / funcional | Tabla de decisión, regla 3 (partición inválida: nombre vacío) | §4.2.3, §4.2.1 |
| TD-R4 | Sin nombre ni tarjeta → rechazo | `cypress/e2e/formulario_compra.cy.js` | Sistema / funcional | Tabla de decisión, regla 4 | §4.2.3, §4.2.1 |

Tabla de decisión aplicada (cobertura completa, 2² = 4 reglas; condición fija: carrito con un producto):

| Condición / acción | R1 | R2 | R3 | R4 |
|---|---|---|---|---|
| C1 Nombre diligenciado | V | V | F | F |
| C2 Tarjeta diligenciada | V | F | V | F |
| Se registra la compra | X | | | |
| Se muestra la alerta de validación | | X | X | X |

## Ejercicio 2 — Prueba de integración de servicios (Cypress, API)

| ID | Prueba | Archivo | Nivel / tipo | Técnica | Syllabus |
|---|---|---|---|---|---|
| API-01 | Registro de usuario nuevo | `cypress/e2e/api/signup.api.cy.js` | Integración de componentes / funcional | Partición de equivalencia: usuario no existente (válida) | §2.2.1, §4.2.1 |
| API-02 | Registro de usuario existente → error | `cypress/e2e/api/signup.api.cy.js` | Integración de componentes / funcional | Partición de equivalencia: usuario existente (inválida) | §2.2.1, §4.2.1 |
| API-03 | Inicio de sesión con credenciales correctas | `cypress/e2e/api/login.api.cy.js` | Integración de componentes / funcional | Partición de equivalencia: credenciales válidas | §2.2.1, §4.2.1 |
| API-04 | Inicio de sesión con contraseña incorrecta → error | `cypress/e2e/api/login.api.cy.js` | Integración de componentes / funcional | Partición de equivalencia: credenciales inválidas | §2.2.1, §4.2.1 |

## Ejercicio 3 — Prueba de carga (k6)

| ID | Prueba | Archivo | Nivel / tipo | Criterio de aceptación | Syllabus |
|---|---|---|---|---|---|
| PERF-01 | Carga constante de 20 TPS durante 30 s sobre el servicio de autenticación | `K6_Ejercicio1/scripts/login_test.js` | Sistema / no funcional (rendimiento) | p95 < 1,5 s · errores técnicos < 3 % | §2.2.2, §5.1.3 |

## Cambios de la versión 2

| N.º | Hallazgo de la revisión (capítulo 14 del trabajo de grado) | Corrección | Archivos |
|---|---|---|---|
| 1 | La validación de la alerta registraba el listener después del clic y no fallaba si la alerta no aparecía | El listener se registra antes del clic y se verifica con un stub que falla si la alerta no se dispara | `pages/home.page.js`, `pages/purchase.modal.page.js` |
| 2 | El flujo E2E solo recorría el camino feliz, sin técnica formal de diseño | Cuatro pruebas nuevas derivadas de una tabla de decisión sobre los campos obligatorios del formulario | `e2e/formulario_compra.cy.js`, `fixtures/formularioCompra.json` |
| 3 | URL de la aplicación escrita dentro del objeto de página y de las pruebas | URL en la configuración (`baseUrl` y `env.apiUrl`), reemplazable por línea de comandos | `cypress.config.js` (ej. 1 y 2), `support/commands.js`, `signup.api.cy.js` |
| 4 | El umbral de errores funcionales fallaba siempre (100 %) y no servía como criterio de aceptación | El 401 se declara como respuesta esperada; el umbral pasa a medir solo errores técnicos; la tasa de credenciales rechazadas queda como métrica informativa | `K6_Ejercicio1/scripts/login_test.js` |
| 5 | `sleep(1)` dentro de un escenario de tasa constante causaba iteraciones descartadas | Se eliminó la pausa | `K6_Ejercicio1/scripts/login_test.js` |
| 6 | `node_modules` versionado (13 116 archivos) y dependencias transitivas declaradas como directas | `.gitignore` en la raíz; `package.json` solo con Cypress como dependencia de desarrollo | `.gitignore`, `package.json` (ej. 1 y 2) |
