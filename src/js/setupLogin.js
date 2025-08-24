import { loginUser } from "../config/configApis";
import { getUser } from "../config/guardian";
import { redirecto } from "./routes";

export function setupLogin() {
  const btnRegister = document.querySelector(".ir_register");
  btnRegister.addEventListener("click", (e) => {
    e.preventDefault();
    redirecto("/register");
  });

  const form = document.getElementById("form-login");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const credentials = {
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
    };
    try {
      const data = await loginUser(credentials);
      localStorage.setItem("current", JSON.stringify(data.user));
      const user = data.user;
      console.log("Usuario logueado:", user);
      if (user.role === 1) {
        redirecto("/dashboard"); // ruta exclusiva para admin
      } else if (user.role === 2) {
        redirecto("/dashboardVisit"); // ruta para barbero
      } else {
        redirecto("/notfound"); // ruta normal cliente
      }
    } catch (error) {
      alert(error.message);
    }
  });
}
