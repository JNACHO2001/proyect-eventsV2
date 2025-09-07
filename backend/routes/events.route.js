import express from "express";

import connection from "../sql/connection.js";

const route = express.Router();

route.get("/", (_req, resp) => {
  const sql = "select *from events";

  connection.query(sql, (err, resultado) => {
    if (err) {
      return resp.status(500).json({ message: "no traje nada " });
    }
    resp.json(resultado);
  });
});

/*este endopin es para ver cuantos eventos hay creados en numeros  */

route.get("/numbers", (_req, resp) => {
  const sql = "SELECT COUNT(*) AS eventos FROM events;";

  connection.query(sql, (err, resultado) => {
    if (err) {
      return resp.status(500).json({
        ok: false,
        message: "No se pudo contar los eventos",
        error: err.message
      });
    }

    // MySQL devuelve un array, así que extraemos el primer objeto
    const totalEventos = resultado[0].eventos;

    resp.json({
      ok: true,
      total: totalEventos
    });
  });
});


route.get("/:id", (req, resp) => {
  const { id } = req.params;
  const sql = "SELECT * FROM events WHERE Id = ?";

  connection.query(sql, [id], (err, resultado) => {
    if (err) {
      return resp.status(500).json({ message: "Error en la base de datos" });
    }

    if (resultado.length === 0) {
      return resp.status(404).json({ message: "Evento no encontrado" });
    }

    resp.json(resultado[0]);
  });
});

route.post("/", (req, resp) => {
  const sql =
    "insert into events(titulo,descripcion,fecha,capacidad)  values(?,?,?,?) ";
  const { titulo, descripcion, fecha, capacidad } = req.body;
  console.log("Datos recibidos:", req.body);

  connection.query(
    sql,
    [titulo, descripcion, fecha, capacidad],
    (err, resultado) => {
      if (err) {
        return resp.status(500).json({ message: "no se pudo registrar " });
      }
      resp
        .status(201)
        .json({ message: "el evento fue registrado", Id: resultado.insertId });
    }
  );
});

route.put("/:Id", (req, resp) => {
  const sql =
    "update events  set titulo = ?,descripcion =?,fecha=?,capacidad=?  where  Id=? ";
  const { Id } = req.params;
  const { titulo, descripcion, fecha, capacidad } = req.body;

  connection.query(
    sql,
    [titulo, descripcion, fecha, capacidad, Id],
    (err, resultado) => {
      if (err) {
        return resp.status(500).json({ message: "no se pudo actualizar " });
      }
      if (resultado.length === 0) {
        return resp.status(404), json({ message: "no encontre el evento" });
      }
      resp.json({ message: "fue actualizado" });
    }
  );
});

route.delete("/:Id", (req, resp) => {
  const sql = "delete from events where Id = ?";
  const { Id } = req.params;
  connection.query(sql, [Id], (err, resultado) => {
    if (err) {
      return resp.status(500).json({ message: "no se pudo eliminar " });
    }
    if (resultado.length === 0) {
      return resp.status(404).json({ message: "no encontre el evento" });
    }
    resp.json({ message: "evento eliminado" });
  });
});

export default route;
