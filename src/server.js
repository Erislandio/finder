const express = require("express");
const app = express();
const cors = require("cors");
const port = 3000;
const routes = require("./routes/routes");
const db = require("./database/db");
const chalk = require("chalk");

app.use(express.json());
app.use(cors());
app.use(routes);

app.listen(port, () => {
  console.log(
    chalk.cyanBright.bold("server online ==> http://localhost:3000/")
  );

  db.then(res => {
    console.log(chalk.yellowBright.bold("Conectado ao banco de dados mongodb"));
  });
});
