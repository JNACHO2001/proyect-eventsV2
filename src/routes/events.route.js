import express from "express";

import connection from "../sql/connection.js";

const route = express();

route.use(express.json());

route.get("/", (req, resp) => {
  const sql = "select *from events";

  connection.query(sql, (err, resultado) => {
    if (err) {
      resp.status(500).json({ message: "no se trarer nada " });
    }
    resp.json(resultado);
  });
});

route.listen(3000, () => {
  console.log(`Servidor corriendo en http://localhost:3000`);
});

