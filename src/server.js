const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3000;
const routes = require("./routes/routes");
const db = require("./database/db");
const chalk = require("chalk");
const http = require("http");
const path = require("path");
const morgan = require("morgan");
const authMiddleware = require("./app/middlewares/auth");

const { setupWebsocket } = require("./websocket");

const server = http.Server(app);
setupWebsocket(server);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(
  "/files",
  authMiddleware,
  express.static(path.resolve(__dirname, "..", "tmp", "uploads"))
);
app.use(routes);

app.listen(port, () => {
  console.log(
    chalk.cyanBright.bold("server online ==> http://localhost:3000/")
  );

  db.then(res => {
    console.log(chalk.yellowBright.bold("Conectado ao banco de dados mongodb"));
  });
});
