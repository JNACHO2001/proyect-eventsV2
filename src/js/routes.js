import { setupLogin } from "./setupLogin";
import { setupRegister } from "./setupRegister";

const routes = {
  "/": {
    path: "/src/view/login.html",
    setup:setupLogin
  
  },
  "/register":{
    path: "/src/view/register.html",
    setup:setupRegister

  },


  "/notfound":{
    path:"src/view/notfound.html"
  }
};

 export async function renderRoute() {
    const app = document.getElementById('app')
    const path = window.location.pathname
    const route = routes[path] || routes["/notfound"]

    try {
        const file = await fetch(route.path)
        const content = await file.text()
        app.innerHTML=content

        if (route.setup) {
          route.setup();
          
        }
        
    } catch (error) {
        console.log("no encontre la ruta ",error)
        
    }

    
}

export function redirecto(path) {
    window.history.replaceState({},"",`${path}`)
    return renderRoute();
    
}
