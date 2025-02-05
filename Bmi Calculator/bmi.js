const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const port = 3000 || 4000;

app.get("/", (req, res) => {
  res.render("home");
});

app.post("/", (req, res) => {
  var w = parseFloat(req.body.w);
  var h = parseFloat(req.body.h);
  let result = (w / (h * h)) * 10000;
  var bmi = result.toFixed(2);
  res.render("bmi", { bmi: bmi });
});

app.listen(port, () => {
  console.log("Server is listening on port " + port);
});
