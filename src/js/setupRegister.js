

export function setupRegister() {

    const registerForm = document.querySelector(".register-form");

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const fullname = document.getElementById("fullName").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (password !== confirmPassword) {
    alert("Las contraseñas no coinciden");
    return;
  }

  try {
    const resp = await fetch("http://localhost:3000/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fullname, email, password,id_role:2 })
    });

    if (!resp.ok) {
      throw new Error("Error al registrar usuario");
    }

    const data = await resp.json();
    alert(data.message)


  } catch (err) {
    console.error(err);
    alert("Hubo un problema al registrar el usuario");
  }
});

    
}