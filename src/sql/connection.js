import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const connection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

connection.query("SHOW TABLES", (err, results) => {
  if (err) {
    console.error("Error al mostrar tablas:", err.message);
    return;
  }

  console.log("Tablas encontradas:");

  const tablas = results.map((fila) => Object.values(fila)[0]);
  console.log(tablas);
});

export default connection;
