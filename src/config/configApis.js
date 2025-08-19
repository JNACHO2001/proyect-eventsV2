const API_URL = "http://localhost:3000/api/users"; // tu endpoint

// Registrar usuario
export async function registerUser(userData) {
  const resp = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  if (!resp.ok) throw new Error("Error al registrar usuario");
  return resp.json();
}
