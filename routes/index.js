var express = require("express");
const passport = require("passport");
var router = express.Router();
var userModel = require("./users");
var googleAuth = require("passport-google-oauth20").Strategy;
passport.use(
  new googleAuth(
    {
      clientID:
        "317822225393-1d5eb9grhgpkk5facc5pjrd2rgui9602.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:3000/auth",
    },
    (accesstoken, refreshtoken, profile, done) => {
      console.log("working");
      userModel.findOne({ googleId: profile.id }).then((foundUser) => {
        if (foundUser) {
          done(null, foundUser);
        } else {
          new userModel({ googleId: profile.id }).save().then((newUser) => {
            done(null, newUser);
          });
        }
      });
    }
  )
);

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index");
});

router.get("/profile", (req, res) => {
  res.render("profile");
});

router.get(
  "/auth",
  passport.authenticate("google", { failureRedirect: "/localhost:3000/" }),
  (req, res) => {
    res.render("profile");
  }
);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
  function (req, res) {}
);

router.get("/logout", (req, res) => {
  req.logOut();
  res.redirect();
});
module.exports = router;
