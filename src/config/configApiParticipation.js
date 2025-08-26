const API_URL = "http://localhost:3000/api/participaciones";
  export async function getParcipations() {
  const resp = await fetch(API_URL);
  return resp.json();
}
