export  function getUser() {
    const user =localStorage.getItem("current")
    return user ?JSON.parse(user):null;   
}
export function isAuthenticated() {
  return !!getUser();
}
export function isAdmin() {
  const user = getUser();
  return user && user.id_role === 1;
}
