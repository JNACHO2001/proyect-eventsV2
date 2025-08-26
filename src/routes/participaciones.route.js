import exprees from "express";
import connection from "../sql/connection.js";

const route = exprees.Router();

route.get("/", (req, resp) => {
  const sql = "select  * from participaciones";
  connection.query(sql, (err, resultado) => {
    if (err) {
      return resp
        .status(500)
        .json({ message: "no se encontraron participaciones " });
    }

    resp.json(resultado);
  });
});

route.get("/:Id", (req, resp) => {
  const {Id}=req.params
  const sql = `SELECT participaciones.Id,events.titulo,events.fecha
FROM users
JOIN participaciones
ON users.Id = participaciones.id_user
join events
on events.Id=participaciones.id_event where users.Id=? ;`;
  connection.query(sql,[Id], (err, resultado) => {
    if (err) {
      return resp
        .status(500)
        .json({ message: "no se encontro la participacion " });
    }

    resp.json(resultado);
  });
});

export default route;
