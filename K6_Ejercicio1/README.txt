PRUEBA TÉCNICA – SCRIPT PRUEBA DE CARGA

El objetivo principal es evaluar el comportamiento del endpoint de login bajo
carga constante, validando métricas de rendimiento, estabilidad y cumplimiento
de criterios de aceptación definidos en el enunciado de la prueba.

Servicio bajo prueba:
https://fakestoreapi.com/auth/login

---------------
OBJETIVO DE LA PRUEBA
---------------
- Validar que el servicio de login soporte al menos 20 transacciones por segundo (TPS)
- Verificar que los tiempos de respuesta se mantengan por debajo de 1.5 segundos
- Medir la tasa de error técnico durante la ejecución de la prueba
- Identificar posibles riesgos de rendimiento o estabilidad del servicio

---------------
ALCANCE
---------------
Incluye:
- Prueba de carga con tasa constante (constant-arrival-rate)
- Parametrización de credenciales desde archivo CSV
- Validaciones funcionales básicas (códigos HTTP esperados)
- Definición de thresholds de rendimiento

---------------
REQUISITOS
---------------
- K6 v0.48.0 o superior
- Acceso a internet
- Git (opcional, para clonar el repositorio)

------------
INSTALACIÓN
------------
1. Clonar o descomprimir el repositorio del proyecto
2. Abrir una terminal en la raíz del proyecto
3. Verificar la instalación de K6:
   
   k6 version

--------------------
EJECUCION DE PRUEBAS
--------------------
Ejecutar la prueba de carga principal desde la raíz del proyecto:

k6 run scripts/login_test.js

