// read env vars from file .env if in not production
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 8080;
const host = process.env.HOST || "127.0.0.1";
const router = require("./routes");
const expressSanitizer = require("express-sanitizer");
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");

app.use(bodyParser.json(), bodyParser.urlencoded({ extended: true }));
app.use(expressSanitizer());
app.set("trust proxy", 1);
app.use(expressValidator());
app.use("/", router);

app.listen(port, function (err) {
  if (!err) {
    console.log("App listening on " + host + " and port " + port);
  } else {
    console.log(err);
  }
});

module.exports = app;
