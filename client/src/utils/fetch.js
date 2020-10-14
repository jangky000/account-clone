import { getToken } from "@utils/token.js";

// 배포 시 warn: proxy가 아니면 자동으로 url 주소를 매핑해주지 않을 수 있다.
export const fetchAPI = async (method, url, body) => {
  const options = { mode: "cors", credentials: "include" };
  options.headers = {
    "Content-Type": "application/json",
    authorization: `Bearer ${getToken("jwt")}`,
  };
  if (body) {
    options.body = JSON.stringify(body);
  }
  try {
    const response = await fetch(url, {
      method: method,
      ...options,
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.log("fetch 실패");
    return { success: false, message: "fetch 실패" };
  }
};
