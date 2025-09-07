import { getUser, guard } from "../../../backend/config/guardian";
import { setupDashboard } from "./setupDashboard";
import { setupDashboardVisit } from "./setupDashboardVisit";
import { setupLogin } from "./setupLogin";
import { setupRegister } from "./setupRegister";

const routes = {
  "/": {
    path: "/src/view/login.html",
    setup: setupLogin,
  },
  "/register": {
    path: "/src/view/register.html",
    setup: setupRegister,
  },
  "/dashboard": {
    path: "/src/view/dashboard.html",
    setup: setupDashboard,
  },
  "/dashboardVisit": {
    path: "/src/view/dashboardVisit.html",
    setup: setupDashboardVisit,
  },

  "/notfound": {
    path: "src/view/notfound.html",
  },
};

export async function renderRoute() {
  const app = document.getElementById("app");
  const path = window.location.pathname;
  const route = routes[path] || routes["/notfound"];

  if (!guard(path)) {
    const user = getUser();
    if (!user) {
      return redirecto("/");
    }
    if (user.role === 1) {
      return redirecto("/dashboard");
    }
    return redirecto("/dashboardVisit");
  }

  try {
    const file = await fetch(route.path);
    const content = await file.text();
    app.innerHTML = content;

    if (route.setup) {
      route.setup(content);
    }
  } catch (error) {
    console.log("no encontre la ruta ", error);
  }
}

export function redirecto(path) {
  window.history.replaceState({}, "", `${path}`);
  return renderRoute();
}
