import Swal from "sweetalert2";
import { configData } from "../../public/sweetAlert2/config";
import { setupForm } from "../../public/sweetAlert2/setupForm";
import {
  deleteEvents,
  getEvents,
  getEventsNumbers,
  getOneEvents,
} from "../config/configApisEvents";
import { redirecto } from "./routes";

export function setupDashboard() {
  setupOutButton();
  infoUserSlide();
  loadform();
  loadEventsView();
}

async function infoUserSlide() {
  const contentUserInfo = document.querySelector(".user-info");
  const user = JSON.parse(localStorage.getItem("current"));
  const firsLetter = user.fullname[0].toUpperCase();

  contentUserInfo.innerHTML = `<p class="user-avatar">${firsLetter}</p>
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

export async function loadEventsView() {
  const spanNumber = document.querySelector(".stat-value");

  const contentEvets = document.querySelector(".events-grid");
  try {
    const data = await getEvents();
    const { total } = await getEventsNumbers();
    contentEvets.innerHTML = "";

    spanNumber.innerHTML = total;
    if (!data || data.length === 0) {
      contentEvets.innerHTML = `<h3>No hay ningún registro</h3>`;
      return;
    }
    data.forEach((events) => {
      contentEvets.innerHTML += renderEventsRow(events);
    });

    contentEvets.addEventListener("click", handleEventActions);
  } catch (error) {
    console.error("Error al cargar eventos:", error);
  }
}
function renderEventsRow(events) {
  return ` 
    <div class="event-card">
      <h3 class="event-title">${events.titulo}</h3>
          <p class="event-date">${configData(events.fecha)}</p>
          <p class="event-description">${events.descripcion}</p>
          <p class="event-capacity">CapMax:${events.capacidad}</p>
          <div class="event-actions">
            <button class="edit-btn" data-id="${events.Id}">Editar</button>
            <button class="delete-btn"  data-id="${
              events.Id
            }" >Eliminar</button>
        
          </div>
 `;
}

async function handleEventActions(e) {
  try {
    const target = e.target;

    if (target.classList.contains("edit-btn")) {
      const id = target.dataset.id;
      const evento = await getOneEvents(id);
      setupForm(evento);
    }

    if (target.classList.contains("delete-btn")) {
      const id = target.dataset.id;
      const respuesta = await deleteEvents(id);
      Swal.fire({
        title: "¡Eliminado!",
        text: respuesta.message,
        icon: "success",
        confirmButtonText: "Aceptar",
      });

      loadEventsView();
    }
  } catch (error) {
    console.error("Hay un nuevo error", error);
  }
}

function loadform() {
  const form = document.querySelector(".create-btn");
  form.addEventListener("click", async () => {
    setupForm();
  });
}
