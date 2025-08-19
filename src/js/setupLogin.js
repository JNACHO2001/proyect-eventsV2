import { redirecto } from "./routes"

export function setupLogin() {

    const btnRegister=document.querySelector(".ir_register")
    btnRegister.addEventListener("click",(e)=> {
        e.preventDefault()
    redirecto("/register")

        
    })    
    
}