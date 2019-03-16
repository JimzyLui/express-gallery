const express = require("express");
const exhbs = require("express-handlebars");
const bodyParser = require("body-parser");
const Photos = require("./resources/database/models/Photos");

//data consts
const PORT = process.env.PORT;
const SESSION_SECRET = process.env.SESSION_SECRET;
const REDIS_HOSTNAME = process.env.REDIS_HOSTNAME;

if (!PORT) {
  console.log("No Port Found!");
}
if (!SESSION_SECRET) {
  console.log("No Session Secret Found!");
}
if (!REDIS_HOSTNAME) {
  console.log("No Redis Hostname Found!");
}
if (!PORT || !SESSION_SECRET || !REDIS_HOSTNAME) {
  return process.exit(1);
}

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//set up handlebars engine
app.engine("hbs", exhbs({ defaultLayout: "main", extname: "hbs" }));

app.set("view engine", "hbs");

//main page GET req
app.get("/", (req, res) => {
  res.render("home");
});

//start server
app.listen(PORT, () => {
  console.log(`Listening on PORT  + ${PORT}`);
});
