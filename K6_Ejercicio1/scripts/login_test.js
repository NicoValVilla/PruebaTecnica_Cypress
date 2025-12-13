import http from "k6/http";
import { check, sleep } from "k6";
import { SharedArray } from "k6/data";
import { Rate } from "k6/metrics";
import papaparse from "https://jslib.k6.io/papaparse/5.1.1/index.js";

const users = new SharedArray("users data", function () {
  return papaparse.parse(open("./data/users.csv"), { header: true }).data;
});

const functionalErrors = new Rate("functional_errors");

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
    http_req_duration: ["p(95)<1500"],
    functional_errors: ["rate<0.03"],
  },
};

export default function () {
  const user = users[Math.floor(Math.random() * users.length)];

  const payload = JSON.stringify({
    username: user.user,
    password: user.passwd,
  });

  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const res = http.post("https://fakestoreapi.com/auth/login", payload, params);

  check(res, {
    "status is 200 or 401": (r) => r.status === 200 || r.status === 401,
    "response time < 1.5s": (r) => r.timings.duration < 1500,
  });

  functionalErrors.add(res.status !== 200);

  sleep(1);
}
