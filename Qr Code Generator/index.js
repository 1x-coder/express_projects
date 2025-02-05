const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const app = express();
const port = process.env.PORT || 8080;
const serv = require("http").Server(app);
const morgan = require("morgan");
const createQR = require("./src/createQR");
const routes = require("./src/routes/routes");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use("/", routes);

app.get("/", (req, res) => res.sendFile(__dirname + "/client/index.html"));

app.use("/client", express.static(__dirname + "/client"));

serv.listen(port);
console.log(`'${__filename}' listening at http://localhost:${port}`);
