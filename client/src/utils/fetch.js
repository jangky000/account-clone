// export const fetch_get = async (url) => {
//   const response = await fetch(url);
//   const json = await response.json();
//   return json;
// };

// export const fetch_post = async (url, data) => {
//   const response = await fetch(url, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   });
//   const json = await response.json();
//   return json;
// };

// export const fetch_delete = async (url, data) => {
//   const response = await fetch(url, {
//     method: "DELETE",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   });
//   const json = await response.json();
//   return json;
// };

// export const fetch_put = async function (url, data) {
//   const response = await fetch(url, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   });
//   const json = await response.json();
//   return json;
// };

// 배포 시 warn: proxy가 아니면 자동으로 url 주소를 매핑해주지 않을 수 있다.
export const fetchAPI = async (method, url, body) => {
  const options = { mode: "cors", credentials: "include" };
  if (body) {
    options.headers = { "Content-Type": "application/json" };
    options.body = JSON.stringify(body);
  }
  const response = await fetch(url, {
    method: method,
    ...options,
  });
  const json = await response.json();
  return json;
};
