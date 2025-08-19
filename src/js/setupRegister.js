import { registerUser } from "../config/configApis";

export function setupRegister() {
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
    } catch (err) {
      console.error(err);
      alert("Hubo un problema al registrar el usuario");
    }
  });
}
