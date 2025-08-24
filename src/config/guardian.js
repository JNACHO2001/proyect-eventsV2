export function getUser() {
  const user = localStorage.getItem("current");
  return user ? JSON.parse(user) : null;
}

export function guard(path) {
  const user = getUser();

  if (!user) {
    return path === "/" || path === "/register";
  }
  if (path === "/" || path === "/register") {
    return false;
  }

  if (user.role === 1 && path === "/dashboard") return true;
  if (user.role === 1 && path === "/dashboardVisit") return false;

  if (user.role === 2 && path === "/dashboardVisit") return true;
  if (user.role === 2 && path === "/dashboard") return false;

  return false;
}
