import express from "express";
import bcrypt from "bcrypt";
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
    "insert into users (fullname,email,password,id_role) values (?,?,?,?)";
  const sqlEmailCheck = "select * from users where email = ?";

  const { fullname, email, password, id_role } = req.body;

  connection.query(sqlEmailCheck, [email], (err, isEmail) => {
    if (err) {
      return resp.status(500).json({ message: "Error al verificar el correo" });
    }

    if (isEmail.length > 0) {
      return resp.status(400).json({ message: "El correo ya está registrado" });
    }

    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        return resp.status(500).json({ message: "no se pudo encriptar" });
      }

      connection.query(
        sql,
        [fullname, email, hashedPassword, id_role],
        (err, resultado) => {
          if (err) {
            return resp
              .status(500)
              .json({ message: "no se pudo insertar el usuario "+err });
          }
          resp.status(201).json({ message: "usuario creado " });
        }
      );
    });
  });
});

route.post("/login", (req, resp) => {
  const { email, password } = req.body;
  const sql = "select * from users where  email = ? ";
  connection.query(sql, [email], (err, resultado) => {
    if (err) {
      return resp.status(500).json({ message: "error en el servidor" });
    }
    if (resultado === 0) {
      return resp.status(401).json({ message: "usuario no encontrado" });
    }
    const user = resultado[0];
    console.log(user);

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        return resp.status(500).json({ message: "error al validar" });
      }

      if (!isMatch) {
        return resp.status(401).json({ message: "constraseña incorrecta" });
      }

      resp.json({
        message: "Login exitoso",
        user: {
          id: user.Id,
          fullname: user.fullname,
          email: user.email,
          role: user.id_role,
        },
      });
    });
  });
});

export default route;
