"use strict";
const moment = require("moment");
const path = require("path");
const express = require("express");
const expressHBS = require("express-handlebars");
// const User = require("./resources/database/models/User");
// const Photo = require("./resources/database/models/Photo");
const bodyParser = require("body-parser");
const session = require("express-session");
const RedisStore = require("connect-redis")(session);
const passport = require("passport");

const flash = require("connect-flash");
const fs = require("fs"); // file system
const morgan = require("morgan"); // for logging
const rfs = require("rotating-file-stream");
// const sass = require("node-sass");
//data const
// const PORT = process.env.PORT || 8080;
const PORT = process.env.EXPRESS_CONTAINER_PORT || 8080;

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

const photoRouter = require("./resources/database/routes/photosRoute");
const userRouter = require("./resources/database/routes/usersRoute");
const authRouter = require("./resources/database/routes/authRoute");

const app = express();

const dirYYYY = moment().format("YYYY");
const dirMM = moment().format("MM");
const logDirectory = path.join(__dirname, "logs/", dirYYYY, "/", dirMM);
// ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory, { recursive: true });
const logFileName = moment().format("YYYYMMDD") + "_access.log";
// create a rotating write stream
const accessLogStream = rfs(logFileName, {
  interval: "1d", // rotate daily
  path: logDirectory
});

// log only 4xx and 5xx responses to console
app.use(
  morgan("dev", {
    skip: function(req, res) {
      return res.statusCode < 400;
    }
  })
);
// setup the logger
app.use(morgan("combined", { stream: accessLogStream }));

const cookie_secret = "asdfadfs";
// These 3 lines are for middleware passing of msgs
// app.use(cookieParser('secretString'));
// app.use(session({cookie: { maxAge: 60000 }}));
app.use(
  session({
    secret: cookie_secret,
    resave: true,
    saveUninitialized: true
  })
);
app.use(flash());
// app.use(function(req, res, next){
//   res.locals.success_messages = req.flash('success');
//   res.locals.error_messages = req.flash('fail');
//   next();
// });

app.use(bodyParser.json());
// adding the sass middleware
// app.use(
//   sass.middleware({
//       src: __dirname + '/resources',
//       dest: __dirname + '/resources',
//       prefix: '',
//       debug: true,
//   })
// );
app.use(bodyParser.urlencoded({ extended: true })); // parse forms
app.use(
  session({
    store: new RedisStore(),
    secret: "oompah loompah",
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, "/resources")));
//app.use(express.static(__dirname + "/node_modules/bootstrap/dist"));

//set up handlebars engine
// Register `hbs.engine` with the Express app.
const hbs = expressHBS.create({
  layoutsDir: "resources/views/layouts/",
  defaultLayout: "main",
  extname: "hbs"
});

// the extname applies to the layout only
// now can use special "layout: false" key to prevent the default layout from being used
app.engine("hbs", hbs.engine); // register hbs engine, 'hbs' applies to all files but layout

/* --OR-- */
/*
app.engine(
  "hbs",
  expressHBS({
    layoutsDir: "templates/layouts/",
    defaultLayout: "mainLayout",
    extname: "hbs"
  })
);
*/

app.set("view engine", "hbs"); // to point the view engine to the hbs engine
// to point the views location to a different location
app.set("views", path.join(__dirname, "/resources/views"));
// app.get("/images", function(request, response) {
//   response.render("image");
//  });
// console.log("__dirname: ", __dirname);
// var appDir = path.dirname(require.main.filename);
// console.log("appDir: ", appDir);
app.use("/images", express.static(path.join(__dirname, "/resources/images")));

// app.get("/", (req, res) => {
//   res.send("sanity check");
// });
app.use("/auth", authRouter);

app.use("/users", userRouter);
app.use("/photos", photoRouter);

app.get("/index", (req, res) => {
  res.render("index", { mainHeading: "I don't know" });
});

app.get("/", (req, res, next) => {
  res.render("landing", {
    mainHeading: "REMEMBER US",
    pageTitle: "Ciao!  Welcome!",
    hasBackgroundImage: false
  });
});

// for caching
app.enable("view cache");
//process.env.NODE_ENV === "production"

// catch anything else as set page not found 404
app.use((req, res, next) => {
  res.status(404).render("404");
});

//start server
app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});

/////

// require('dotenv').config({path: './.env'});

// const request = require('supertest');

// var cookieParser = require('cookie-parser');

// log all requests to access.log
// app.use(morgan('common', {
//   stream: fs.createWriteStream(accessLogStream)
// }));
