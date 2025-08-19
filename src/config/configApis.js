const API_URL = "http://localhost:3000/api/users";

export async function registerUser(newUser) {
  const resp = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newUser),
  });

  const data = await resp.json();

  if (!resp.ok) {
    throw new Error(data.message);
  }

  return data;
}
