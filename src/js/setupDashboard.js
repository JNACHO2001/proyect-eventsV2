import { setupForm } from "../../public/sweetAlert2/setupForm";
import { redirecto } from "./routes";

export function setupDashboard() {
  setupOutButton();
  infoUserSlide();
  loadform();
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

function loadform() {
  const form = document.querySelector(".create-btn");
  form.addEventListener("click", async () => {
    setupForm();
  });
}
