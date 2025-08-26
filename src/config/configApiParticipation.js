const API_URL = "http://localhost:3000/api/participaciones";
export async function getParcipations() {
  const resp = await fetch(API_URL);
  return resp.json();
}

export async function postParticipations(id_user, id_event) {
  try {
    const resp = await fetch(`${API_URL}`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ id_user, id_event }),
    });

    if (!resp.ok) {
      throw new Error("errar a gregar participacion", Error);
    }
    const data = resp.json();
    return data;
  } catch (error) {
    console.error("Error al crear participacion:", error);
    throw error;
  }
}
