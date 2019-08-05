import http from "k6/http";
import { sleep } from "k6";

export let options = {
  vus: 100,
  duration: '300s'
};

export default function () {
  const random = Math.random();
  if (random > 0.1) {
    const id = Math.floor(random * 500) + 9949500;
    http.get(`http://localhost:3000/${id}/reviews`);
  } else if (random > 0.05) {
    const id = Math.floor(random * 50000) + 9949500;
    http.get(`http://localhost:3000/${id}/reviews`);
  } else {
    const id = Math.floor(random * 9949500);
    http.get(`http://localhost:3000/${id}/reviews`);
  }
  // sleep(0.2);
}
