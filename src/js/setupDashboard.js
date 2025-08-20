import { redirecto } from "./routes";

export function setupDashboard() {
    setupLogoutButton()
    
}













function setupLogoutButton() {
    const exit =document.querySelector(".logout-btn") 
    exit.addEventListener("click",(e)=>{
        e.preventDefault()
        localStorage.removeItem("current");
        redirecto("/")
        

    })
}