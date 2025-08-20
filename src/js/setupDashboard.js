import { redirecto } from "./routes";

export function setupDashboard() {
  setupOutButton();
}

function setupOutButton() {
  const logout = document.querySelector(".logout-btn");
 logout.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.removeItem("current");
    redirecto("/");
  });
}
