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

export default route;
