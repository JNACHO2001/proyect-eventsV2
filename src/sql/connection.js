import mysql from "mysql2";

const connection = mysql.createConnection({
  host: "mysql-miapp1.alwaysdata.net",
  user: "miapp1_events",
  password: "R@@t2025",
  database: "miapp1_events",
});

connection.connect((error) => {
  if (error) {
    console.log("No se pudo conectar al servidor:", error.message);
    return;
  }
  console.log("Conectado ");

  connection.query("SHOW TABLES", (err, results) => {
    if (err) {
      console.error("Error al mostrar tablas:", err.message);
      return;
    }

    console.log("Tablas encontradas:");

    const tablas = results.map((fila) => Object.values(fila)[0]);
    console.log(tablas);

    connection.end();
  });
});
