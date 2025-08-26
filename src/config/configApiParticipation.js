const API_URL = "http://localhost:3000/api/participaciones";
export async function getParcipations() {
  const resp = await fetch(API_URL);
  return resp.json();
}

export async function registrarParticipacion(id_user, id_event) {
  try {
    const resp = await fetch("http://localhost:3000/api/participaciones", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_user, id_event }),
    });

    const data = await resp.json();
    return data;
  } catch (error) {
    console.error("Error en registrar la Participacion:", error);
    return { ok: false, message: "Error de conexión con el servidor" };
  }
}
