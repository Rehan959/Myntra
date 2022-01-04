var express = require("express");
const passport = require("passport");
var router = expyuyress.Router();
var userModel = require("./users");
var googleAuth = require("passport-google-oauth20").Strategy;
passport.use(
  new googleAuth(
    {
      clientID: "",
      clientSecret: "",
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

module.exports = router;
