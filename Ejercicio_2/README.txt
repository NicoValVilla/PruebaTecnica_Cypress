*PRUEBA TÉCNICA – AUTOMATIZACIÓN API*

Proyecto de automatización de pruebas API usando Cypress para validar los endpoints
de registro (signup) y login de la página https://www.demoblaze.com/

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
   ```bash
   npm install
   ```

--------------------
EJECUCIÓN DE PRUEBAS
--------------------
Modo interactivo:
1. Ejecutar:
   ```bash
   npx cypress open
   ```
2. Seleccionar "E2E Testing"
3. Elegir un navegador
4. Ejecutar los archivos:
   - signup.api.cy.js
   - login.api.cy.js

Modo consola:
```bash
npx cypress run
```

-----------------------
ESTRUCTURA DEL PROYECTO
-----------------------
cypress/
- e2e/api/: Tests de API
- fixtures/: JSON con datos de prueba (users.json)
- support/: Configuración y comandos personalizados (commands.js)
README.md
conclusiones.txt

--------------------------
DESCRIPCIÓN DE LA PRUEBA
--------------------------
La prueba automatiza los siguientes escenarios:

**Signup**
- Crear un usuario nuevo
- Intentar crear un usuario ya existente (error)

**Login**
- Login con usuario y password correctos
- Login con usuario o password incorrectos (error)

--------------
OBSERVACIONES
--------------
- Se utilizan fixtures para desacoplar los datos de prueba
- Se utilizan comandos personalizados para reducir duplicación
- El endpoint de signup retorna HTTP 200 incluso en errores
- El endpoint de login retorna token como string en éxito y objeto JSON en fallo
- Todos los tests manejan estas particularidades, garantizando robustez y mantenibilidad
