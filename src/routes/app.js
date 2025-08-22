import express from "express"
import cors from "cors"
import usersRoute from"./user.route.js"
import EventsRoute from "./events.route.js"

const app = express()
app.use(cors())
app.use(express.json())

app.use("/api/users", usersRoute);
app.use("/api/events", EventsRoute);
app.get("/", (req, res) => {
  res.json({ message: "Servidor preparado" });
});


app.listen(3000,()=>{
    console.log(`Servidor corriendo en http://localhost:3000`)


})

