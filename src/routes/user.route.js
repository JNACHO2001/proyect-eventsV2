import express from "express";

import connection from "../sql/connection.js";

const route = express.Router();



route.get("/", (req, resp) => {
  const sql = "select * from users";

  connection.query(sql, (err, resultado) => {
    if (err) {
      return resp
        .status(500)
        .json({ message: "no se pudo obtener los usuarios " });
    }
    resp.json(resultado);
  });
});

route.post("/", (req, resp) => {
  const sql =
    "insert into users (fullname,email,password,id_role) values (?,?,?,?)  ";
  const { fullname, email, password, id_role } = req.body;

  connection.query(
    sql,
    [fullname, email, password, id_role],
    (err, resultado) => {
      if (err) {
        return resp
          .status(500)
          .json({ message: "no se pudo  insertar el usuario " });
      }
      resp
        .status(201)
        .json({ message: "usuario creado   ", Id: resultado.insertId });
    }
  );
});
export default route;