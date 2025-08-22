import { createEvent } from "../../src/config/configApisEvents";
import Swal from "sweetalert2";
export async function setupForm() {
  Swal.fire({
    title: "Registrar eventos",
    html: `
      <form id="formEvents">
        <input type="text" id="title" class="swal2-input" placeholder="Título">
        <input type="date" id="date" class="swal2-input">
        <input type="text" id="description" class="swal2-input" placeholder="Descripción">
        <input type="number" id="capacity" class="swal2-input" placeholder="Capacidad">
      </form>
    `,
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: "Registrar",
    preConfirm: () => {
      const newEvents = {
        titulo: document.getElementById("title").value,
        descripcion: document.getElementById("description").value,
        fecha: document.getElementById("date").value,
        capacidad: document.getElementById("capacity").value,
      };

      if (
        !newEvents.titulo ||
        !newEvents.descripcion ||
        !newEvents.fecha ||
        !newEvents.capacidad
      ) {
        Swal.showValidationMessage(" Todos los campos son obligatorios");
        return false;
      }

      if (newEvents.capacidad < 0) {
        Swal.showValidationMessage(" Ingrese una capacidad valida");
        return false;
      }
      return newEvents;
    },
  }).then(async (results) => {
    if (results.isConfirmed) {
      try {
        const respuesta = await createEvent(results.value);
        Swal.fire("exito", respuesta.message, "success");
      } catch (error) {
        Swal.fire("Error", "No se pudo registrar el evento", "error");
      }
    }
  });
}
