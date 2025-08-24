const API_URL = "http://localhost:3000/api/events";

export async function createEvent(newEvents) {
  try {
    const resp = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEvents),
    });
    console.log("Respuesta cruda de la API:", resp);

    if (!resp.ok) {
      throw new Error("Error al registrar el evento");
    }

    const data = await resp.json();

    return data;
  } catch (error) {
    console.error("Error al crear evento:", error);
    throw error;
  }
}
export async function getEvents() {
  const resp = await fetch(API_URL);
  return resp.json();
}
export async function getOneEvents(Id) {
  const resp = await fetch(`${API_URL}/${Id}`);
  return resp.json();
}

export async function putEvents(Id, updateEvent) {
  try {
    const resp = await fetch(`${API_URL}/${Id}`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(updateEvent),
    });
    if (!resp.ok) {
      throw new Error("Error al registrar el evento", Error);
    }
    const data = await resp.json();
    return data;
  } catch (error) {
    console.error("Error al crear evento:", error);
    throw error;
  }
}
export async function deleteEvents(Id) {
  try {
    const resp = await fetch(`${API_URL}/${Id}`, {
      method: "DELETE",
    });
    if (!resp.ok) {
      throw new Error("Error al eliminar el evento");
    }

    const data = await resp.json();
    return data;
  } catch (error) {
    console.error("Error al eliminar  evento:", error);
    throw error;
  }
}
