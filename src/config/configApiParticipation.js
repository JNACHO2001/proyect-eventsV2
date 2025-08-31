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

export async function getUserParticipation(userId) {
  try {
    const resp = await fetch(`${API_URL}/${userId}`);
    if (!resp.ok) {
      throw new Error("Error al buscar paricipaciones ");
    }

    const data = await resp.json();
    return data;
  } catch (error) {
    console.error("Error en getUserParticipations:", error);
    throw error;
  }
}

export async function deleteParticipations(idparticipation) {
  try {
    const resp = await fetch(`${API_URL}/${idparticipation}`, {
      method: "DELETE",
    });

    if (!resp.ok) {
      throw new Error("No se pudo eliminar");
    }

    const data = await resp.json();
    return data;
  } catch (error) {
    console.log("se presento un problema", error);
  }
}
