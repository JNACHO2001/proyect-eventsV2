import { redirecto } from "./routes"

export function setupRegister() {

    const btnRegister=document.querySelector(".ir_login")
    btnRegister.addEventListener("click",(e)=> {
        e.preventDefault()
    redirecto("/")

        
    })    
    
}