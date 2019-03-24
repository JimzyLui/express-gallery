const router = require("express").Router();
const Users = require("../models/User");
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
  Users.where({ email: user.email })
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
    Users.where({ email })
      .fetch()
      .then(user => {
        console.log("user in local strategy: ", user);
        user = user.toJSON();
        // if (user.password === password) {
        //   done(null, user )
        // } else {
        //   done(null, false)
        // }
        bcrypt.compare(password, user.hashedPassword).then(res => {
          if (res) {
            done(null, user);
          } else {
            done(null, false);
          }
        });
      })
      .catch(err => {
        done(null, false);
      });
  })
);

const SALT_ROUND = 12;

router.post("/register", (req, res) => {
  const { email, password, nameFirst, nameLast, username } = req.body;

  bcrypt
    .genSalt(SALT_ROUND)
    .then(salt => {
      console.log("salt", salt);
      return bcrypt.hash(password, salt);
    })
    .then(hashedPassword => {
      console.log("hash", hashedPassword);
      return Users.forge({
        email,
        nameFirst,
        nameLast,
        username,
        hashedPassword: hashedPassword
      }).save();
    })
    .then(user => {
      user = user.toJSON();
      res.redirect("/");
      //res.json(user); // Never send the entire user object back to client! It has their password!
      // res.sendStatus(200)
      // res.redirect('/api/auth/secret')
    })
    .catch(err => {
      console.log("err", err);
      res.json(err);
      // res.sendStatus(500)
    });
});

router.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/" }),
  (req, res) => {
    console.log("login successful!");
    // authenticate grabs the user on record
    // compare req.body.password to password on record

    res.send("YAY IM IN!!!!");
  }
);

router.post("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

router.get("/secret", isAuthenticated, (req, res) => {
  res.send("YOU HAVE REACHED NIRVANA");
});

function isAuthenticated(req, res, done) {
  if (req.isAuthenticated()) {
    done();
  } else {
    res.redirect("/");
  }
}

module.exports = router;
