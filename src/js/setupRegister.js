import { registerUser } from "../config/configApis";
import { redirecto } from "./routes";

export function setupRegister() {
   const btnLogin=document.querySelector(".ir_login")
      btnLogin.addEventListener("click",(e)=> {
          e.preventDefault()
      redirecto("/")
      })    
  const registerForm = document.querySelector(".register-form");

  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    const newUser = {
      fullname: document.getElementById("fullName").value,
      email: document.getElementById("email").value,
      password: password,
      id_role: 2,
    };

    try {
      const resp = await registerUser(newUser);
      alert(resp.message);
      form.reset();
    } catch (err) {
      alert(err.message);
    }
  });
}
