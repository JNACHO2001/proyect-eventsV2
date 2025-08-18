const routes = {
  "/": {
    path: "/src/view/login.html"
  
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
        
    } catch (error) {
        console.log("no encontre la ruta ",error)
        
    }

    
}

export function redirecto(path) {
    window.history.replaceState({},"",`${path}`)
    return renderRoute();
    
}
