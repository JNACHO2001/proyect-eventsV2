import { createEvent } from "../config/configApisEvents";
import { redirecto } from "./routes";
import Swal from "sweetalert2";

export function setupDashboard() {
  setupOutButton();
  infoUserSlide();
  mostrarFormulario();
}

function infoUserSlide() {
  const contentUserInfo = document.querySelector(".user-info");
  const user = JSON.parse(localStorage.getItem("current"));
  const firsLetter = user.fullname[0].toUpperCase();

  contentUserInfo.innerHTML = ` <p class="user-avatar">${firsLetter}</p>
        <h2 class="user-name">${user.fullname}</h2>
        <p class="user-email">${user.email}</p>  `;
}

function setupOutButton() {
  const logout = document.querySelector(".logout-btn");
  logout.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.removeItem("current");
    redirecto("/");
  });
}

async function mostrarFormulario() {
  document.querySelector(".create-btn").addEventListener("click", () => {
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
  });
}
