import exprees from "express";
import connection from "../sql/connection.js";

const route = exprees.Router();

route.get("/", (_req, resp) => {
  const sql = "select  * from participaciones";
  connection.query(sql, (err, resultado) => {
    if (err) {
      return resp
        .status(500)
        .json({ message: "no se encontraron participaciones " });
    }

    resp.json({
      participaciones: resultado,
    });
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


/*endpoint para buscar las participaciones por usuario  */
route.get("/:Id", (req, resp) => {
  const { Id } = req.params;

  const sql = `
    SELECT p.Id, e.titulo, e.fecha
    FROM participaciones p
    JOIN users u ON u.Id = p.id_user
    JOIN events e ON e.Id = p.id_event
    WHERE u.Id = ?;
  `;

  connection.query(sql, [Id], (err, resultado) => {
    if (err) {
      return resp.status(500).json({
        ok: false,
        message: "Error al obtener las participaciones",
        error: err.message,
      });
    }

    // si no hay participaciones
    if (resultado.length === 0) {
      return resp.status(404).json({
        ok: false,
        message: "No se encontraron participaciones para este usuario",
      });
    }

    resp.json({
      ok: true,
      total: resultado.length,
      participaciones: resultado,
    });
  });
});

route.delete("/:Id", (req, resp) => {
  const sql = "delete from participaciones where Id = ?";
  const { Id } = req.params;
  connection.query(sql, [Id], (err, resultado) => {
    if (err) {
      return resp.status(500).json({ message: "no se pudo eliminar " });
    }
    if (resultado.length === 0) {
      return resp.status(404).json({ message: "no encontre la participacion" });
    }
    resp.json({ message: "Te has salido de la participacion" });
  });
});

export default route;
