import { loginUser } from "../../../backend/config/configApis";
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
      if (user.role === 1) {
        redirecto("/dashboard");
      } else if (user.role === 2) {
        redirecto("/dashboardVisit");
      } else {
        redirecto("/notfound");
      }
    } catch (error) {
      alert(error.message);
    }
  });
}
