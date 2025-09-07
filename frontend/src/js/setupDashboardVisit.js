import { configData } from "../../public/sweetAlert2/config";
import {
  deleteParticipations,
  getUserParticipation,
  registrarParticipacion,
} from "../../../backend/config/configApiParticipation";
import {
  getEvents,
  getEventsNumbers,
  getOneEvents,
} from "../../../backend/config/configApisEvents"
import { getUser } from "../../../backend/config/guardian";
import { redirecto } from "./routes";
import Swal from "sweetalert2";

export function setupDashboardVisit() {
  setupOutButton();
  infoUserSlide();
  loadEventsView();
  setupTabsDashboard();
  
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
            <button class="edit-btn" data-id="${events.Id}">Ingresar</button>
           
        
          </div>
 `;
}

async function handleEventActions(e) {
  try {
    const target = e.target;

    if (target.classList.contains("edit-btn")) {
      const evento = target.dataset.id;
      const user = getUser().id;

      if (target.textContent === "Ingresar") {
        // Registrar participación
        const resp = await registrarParticipacion(user, evento);

        if (!resp.ok) {
          return Swal.fire({
            title: "Error",
            text: resp.message,
            icon: "error",
            confirmButtonText: "Aceptar",
          });
        }

        target.dataset.participationId = resp.id_participacion;

        Swal.fire({
          title: "¡Agregado!",
          text: resp.message,
          icon: "success",
          confirmButtonText: "Aceptar",
        });
          target.textContent = "Salir";
        target.style.backgroundColor = "red";

        console.log(target.dataset.participationId);
      } else {
        const participationId = target.dataset.participationId;

        const resp = await deleteParticipations(participationId);

        if (!resp.ok) {
          return Swal.fire({
            title: "Error",
            text: resp.message,
            icon: "error",
            confirmButtonText: "Aceptar",
          });
        }

        Swal.fire({
          title: "¡Eliminado!",
          text: resp.message,
          icon: "success",
          confirmButtonText: "Aceptar",
        });

        target.textContent = "Ingresar";
        target.style.backgroundColor = "#0ab118";
      }
    }
  } catch (error) {
    console.error("Hay un nuevo error", error);
    Swal.fire({
      title: "Error inesperado",
      text: error.message,
      icon: "error",
      confirmButtonText: "Aceptar",
    });
  }
}

async function loadParicipationEvent() {
  const contentparticipation = document.getElementById("participations");
  const userId = JSON.parse(localStorage.getItem("current")).id;

  const datas = await getUserParticipation(userId);

  const data = datas.participaciones;
contentparticipation.innerHTML="";
  data.forEach((participation) => {
    contentparticipation.innerHTML += renderParticipations(participation);
  });

  if (data.length===0) {
    contentparticipation.innerHTML="<p>no hay participaciones</p>"
    console.log("no hay ");
    
  }
}
async function setupTabsDashboard() {
  const tabs = document.querySelectorAll(".tab");
  const eventsSection = document.querySelector(".events-grid");
  const participationsSection = document.querySelector("#participations");

  eventsSection.style.display = "block";
  participationsSection.style.display = "none";

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      if (tab.dataset.tab === "events") {
        eventsSection.style.display = "block";
        participationsSection.style.display = "none";
      } else {
        eventsSection.style.display = "none";
        participationsSection.style.display = "block";
        loadParicipationEvent()
      }
    });
  });
}

function renderParticipations(participation) {
  return `  
   <div class="participations-list">
                    <div class="participation-card">
                        <div class="participation-info">
                            <h3>${participation.titulo}</h3>
                            <div class="participation-date">${configData(
                              participation.fecha
                            )}</div>
                        </div>
                        <div class="participation-status status-confirmed">Confirmado</div>
                    </div>
                </div> `;
}
