import { createEvent, putEvents } from "../../src/config/configApisEvents";
import Swal from "sweetalert2";
import { loadEventsView } from "../../src/js/setupDashboard";
export async function setupForm(eventToEdit=null) {
  Swal.fire({
    title: eventToEdit? "editar evento":"registrar evento",
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
    confirmButtonText: eventToEdit? "actualizar":"registrar",
    preConfirm: () => {
      const newEvents = {
        titulo: document.getElementById("title").value,
        descripcion: document.getElementById("description").value,
        fecha: document.getElementById("date").value,
        capacidad: document.getElementById("capacity").value,
      };
      const hoy = new Date();
      hoy.setHours(0, 0, 0);
      const dateEvents = new Date(newEvents.fecha);
      if (dateEvents < hoy) {
        Swal.fire({
          icon: "error",
          title: "Fecha inválida",
          text: "No puedes crear un evento en una fecha pasada.",
        });

        return false;
      }

      if (
        !newEvents.titulo ||
        !newEvents.descripcion ||
        !newEvents.fecha ||
        !newEvents.capacidad
      ) {
        Swal.showValidationMessage(" Todos los campos son obligatorios");
        return false;
      }

      if (newEvents.capacidad <= 0) {
        Swal.showValidationMessage(" Ingrese una capacidad valida");
        return false;
      }
      return newEvents;
    },
  }).then(async (results) => {
    if (results.isConfirmed) {
      try {
        let respuesta;
        if (eventToEdit) {
          respuesta = await putEvents(eventToEdit.Id,results.value)
        } else{
         respuesta = await createEvent(results.value);
        Swal.fire("exito", respuesta.message, "success");
        loadEventsView();

        }




      } catch (error) {
        Swal.fire("Error", "No se pudo registrar el evento", "error");
      }
    }
  });
}
