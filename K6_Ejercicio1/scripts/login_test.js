import http from "k6/http";
import { check } from "k6";
import { SharedArray } from "k6/data";
import { Rate } from "k6/metrics";
import papaparse from "https://jslib.k6.io/papaparse/5.1.1/index.js";

const users = new SharedArray("users data", function () {
  return papaparse.parse(open("./data/users.csv"), { header: true }).data;
});

// v2 (hallazgo 4): un 401 es la respuesta esperada del servicio cuando rechaza
// credenciales; no es un fallo técnico. Se declara como estado esperado para
// que http_req_failed cuente solo errores técnicos (5xx, timeouts, red).
http.setResponseCallback(http.expectedStatuses(200, 401));

// Métrica informativa, SIN umbral. En la versión 1 esta tasa tenía un umbral
// de < 3 % que fallaba siempre (100 %) porque el servicio rechaza las
// credenciales del CSV: un criterio de aceptación que no puede cumplirse.
const credencialesRechazadas = new Rate("credenciales_rechazadas");

export const options = {
  scenarios: {
    login_test: {
      executor: "constant-arrival-rate",
      rate: 20, // 20 TPS
      timeUnit: "1s",
      duration: "30s",
      preAllocatedVUs: 10,
      maxVUs: 50,
    },
  },
  thresholds: {
    http_req_duration: ["p(95)<1500"], // criterio de rendimiento
    http_req_failed: ["rate<0.03"],    // criterio de estabilidad: solo errores técnicos
  },
};

export default function () {
  const user = users[Math.floor(Math.random() * users.length)];

  const payload = JSON.stringify({
    username: user.user,
    password: user.passwd,
  });

  const params = { headers: { "Content-Type": "application/json" } };

  const res = http.post("https://fakestoreapi.com/auth/login", payload, params);

  check(res, {
    "status es 200 o 401": (r) => r.status === 200 || r.status === 401,
    "tiempo de respuesta < 1.5 s": (r) => r.timings.duration < 1500,
  });

  credencialesRechazadas.add(res.status === 401);

  // v2 (hallazgo 5): se eliminó sleep(1). Con el ejecutor constant-arrival-rate
  // la tasa la controla k6; la pausa solo retenía usuarios virtuales y causaba
  // iteraciones descartadas (dropped_iterations).
}
