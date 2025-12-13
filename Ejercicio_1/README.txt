*PRUEBA TÉCNICA – AUTOMATIZACIÓN E2E*

Proyecto de automatización E2E usando Cypress para validar el flujo de compra
en la página https://www.demoblaze.com/

---------------
REQUISITOS
---------------
- Node.js v18 o superior
- npm

------------
INSTALACIÓN
------------
1. Descomprimir el archivo .zip
2. Abrir una terminal en la raíz del proyecto
3. Instalar dependencias del proyecto
Ejecutar:
   npm install

--------------------
EJECUCIÓN DE PRUEBAS
---------------------
Modo interactivo:
1. Ejecutar:
   npx cypress open
2. Seleccionar "E2E Testing"
3. Elegir un navegador
4. Ejecutar el archivo:
   compra.cy.js

-----------------------
ESTRUCTURA DEL PROYECTO
-----------------------
cypress/
- e2e/: Flujo E2E
- pages/: Page Object Model
- fixtures/: JSON con datos de prueba
- support/: Configuración y comandos

--------------------------
DESCRIPCIÓN DE LA PRUEBA
--------------------------
La prueba automatiza el siguiente flujo:
- Agregar dos productos al carrito
- Visualizar el carrito
- Completar formulario de compra
- Finalizar la compra validando mensaje de éxito

--------------
OBSERVACIONES
--------------
- Se utilizó Page Object Model para mejorar mantenibilidad
- Se manejan correctamente alerts y modales
- Los datos de compra están desacoplados mediante fixtures
