const router = require("express").Router();
const User = require("../models/User");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const bcrypt = require("bcryptjs");

passport.serializeUser((user, done) => {
  console.log("serializeUser", user);
  done(null, {
    email: user.email,
    junk: "randomData"
  });
});

passport.deserializeUser((user, done) => {
  console.log("deserializing User", user);
  User.where({ email: user.email })
    .fetch()
    .then(user => {
      user = user.toJSON();
      done(null, user);
    })
    .catch(err => {
      console.log("err", err);
    });
});

passport.use(
  new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
    console.log("local is being called");
    User.where({ email })
      .fetch()
      .then(user => {
        console.log("user in local strategy: ", user);
        user = user.toJSON();

        bcrypt.compare(password, user.hashedPassword).then(res => {
          if (res) {
            done(null, user);
          } else {
            done(null, false);
          }
        });
      })
      .catch(err => {
        const msg = `Errored during auth!`;
        req.flash("fail", msg);
        done(null, false);
      });
  })
);

const SALT_ROUND = 12;

router.post("/register", (req, res) => {
  const { email, password, nameFirst, nameLast, username } = req.body;
  console.log("registering...");
  bcrypt
    .genSalt(SALT_ROUND)
    .then(salt => {
      console.log("salt", salt);
      return bcrypt.hash(password, salt);
    })
    .then(hashedPassword => {
      console.log("hash", hashedPassword);
      return User.forge({
        email,
        nameFirst,
        nameLast,
        username,
        hashedPassword: hashedPassword
      }).save();
    })
    .then(user => {
      const msg = `Registration successful!`;
      console.log(msg);
      req.flash("success", msg);
      user = user.toJSON();
      res.render("landingPage", {
        mainHeading: "Remember Me",
        pageTitle: `Welcome, ${user.nameFirst} Home`,
        msgSuccess: req.flash("success")
      });
      //res.json(user); // Never send the entire user object back to client! It has their password!
      // res.sendStatus(200)
      // res.redirect('/api/auth/secret')
    })
    .catch(err => {
      const msg = `Registration failed!`;
      req.flash("fail", msg);
      console.log("err", err);
      res.json(err);
      // res.sendStatus(500)

      res.render("landingPage", {
        mainHeading: "Remember Me",
        pageTitle: `Welcome, ${user.nameFirst} Home`,
        msgFail: req.flash("fail")
      });
    });
});

router.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/" }),
  (req, res) => {
    const msg = `Login successful!`;
    req.flash("success", msg);
    console.log(msg);
    // authenticate grabs the user on record
    // compare req.body.password to password on record
    const email = req.body.email;
    //res.send("YAY IM IN!!!!");
    User.where({ email })
      .fetch()
      .then(user => {
        user = user.toJSON();
        res.render("landingPage", {
          mainHeading: "Remember Me",
          pageTitle: `Welcome, ${user.nameFirst}!`,
          msgSuccess: req.flash("success")
        });
      });
  }
);

router.post("/logout", (req, res) => {
  const msg = `User logged out!`;
  req.flash("success", msg);
  console.log(msg);
  req.logout();
  res.render("landingPage", {
    mainHeading: "Remember Me",
<<<<<<< HEAD
    pageTitle: `GoodBye Come Again Friend`,
=======
    pageTitle: `See you later!`,
>>>>>>> a407bfb3959419b30833dd136c8d4766eaed4676
    msgSuccess: req.flash("success")
  });
});

router.get("/secret", isAuthenticated, (req, res) => {
  console.log("secret authed");
  res.send("YOU HAVE REACHED NIRVANA");
});

function isAuthenticated(req, res, done) {
  if (req.isAuthenticated()) {
    done();
  } else {
    const msg = `Not authenticated!`;
    req.flash("Fail", msg);
    console.log(msg);
    res.redirect("/");
  }
}

module.exports = router;
