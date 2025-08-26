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

route.post("/", (req, res) => {
  const { id_user, id_event } = req.body;

  const checkSql =
    "SELECT * FROM participaciones WHERE id_user = ? AND id_event = ?";
  connection.query(checkSql, [id_user, id_event], (err, results) => {
    if (err) {
      console.error("Error al verificar participación:", err);
      return res
        .status(500)
        .json({ ok: false, message: "Error en la verificación" });
    }

    if (results.length > 0) {
      return res.status(400).json({
        ok: false,
        message: "El usuario ya está inscrito en este evento",
      });
    }

    const Sql = "INSERT INTO participaciones (id_user, id_event) VALUES (?, ?)";
    connection.query(Sql, [id_user, id_event], (err, resultado) => {
      if (err) {
        console.error("Error al insertar participación:", err);
        return res
          .status(500)
          .json({ ok: false, message: "Error al registrar participación" });
      }

      res.status(201).json({
        ok: true,
        message: "Participación registrada con éxito",
        id_participacion: resultado.insertId,
        data: { id_user, id_event },
      });
    });
  });
});

route.post("/:Id", (req, resp) => {
  const { Id } = req.params;
  const sql = `SELECT participaciones.Id,events.titulo,events.fecha
FROM users
JOIN participaciones
ON users.Id = participaciones.id_user
join events
on events.Id=participaciones.id_event where users.Id=? ;`;
  connection.query(sql, [Id], (err, resultado) => {
    if (err) {
      return resp
        .status(500)
        .json({ message: "no se encontro la participacion " });
    }

    resp.json(resultado);
  });
});

export default route;
