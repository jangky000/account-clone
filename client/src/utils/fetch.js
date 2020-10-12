import { getToken } from "@utils/token.js";

// 배포 시 warn: proxy가 아니면 자동으로 url 주소를 매핑해주지 않을 수 있다.
export const fetchAPI = async (method, url, body) => {
  const options = { mode: "cors", credentials: "include" };
  if (body) {
    options.headers = { "Content-Type": "application/json" };
    options.body = JSON.stringify(body);
    options.authorization = getToken("jwt");
  }
  const response = await fetch(url, {
    method: method,
    ...options,
  });
  const json = await response.json();
  return json;
};
