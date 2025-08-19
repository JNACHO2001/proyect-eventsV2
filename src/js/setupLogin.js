import { loginUser } from "../config/configApis"
import { redirecto } from "./routes"

export function setupLogin() {

    const btnRegister=document.querySelector(".ir_register")
    btnRegister.addEventListener("click",(e)=> {
        e.preventDefault()
    redirecto("/register")
    })    

    const form = document.getElementById("form-login")
    form.addEventListener("submit", async (e)=>{
        e.preventDefault()

        const credentials = {
            email:document.getElementById("email").value,
            password:document.getElementById("password").value

        };
        try {
           const  data =await loginUser(credentials)
            alert(data.message);
            localStorage.setItem("current",JSON.stringify(data.user))

            redirecto("/dashboard")
            
            
            
        } catch (error) {
            alert(error.message)
            
        }


    } )




    
}