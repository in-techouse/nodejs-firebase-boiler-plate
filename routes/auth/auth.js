var express = require("express");
var firebase = require("firebase");
var router = express.Router();
const authorize = require("../../middleware/auth-middleware");

router.get("/login", authorize(), function (req, res, next) {
  res.render("pages/auth/login", {
    isLogedIn: req.session.isLogedIn,
    error: "",
  });
});

router.post("/login", function (req, res, next) {
  const userEmail = req.body.userEmail;
  const userPassword = req.body.userPassword;
  firebase
    .auth()
    .signInWithEmailAndPassword(userEmail, userPassword)
    .then((result) => {
      req.session.isLogedIn = true;
      res.redirect("/");
    })
    .catch((err) => {
      res.render("pages/auth/login", {
        isLogedIn: req.session.isLogedIn,
        error: err.message,
      });
    });
});

router.get("/signup", authorize(), function (req, res, next) {
  res.render("pages/auth/signUp", {
    isLogedIn: req.session.isLogedIn,
    error: "",
  });
});

router.post("/signup", function (req, res, next) {
  // firebase.auth().sendPasswordResetEmail();
  const userEmail = req.body.userEmail;
  const userPassword = req.body.userPassword;
  firebase
    .auth()
    .createUserWithEmailAndPassword(userEmail, userPassword)
    .then((result) => {
      req.session.isLogedIn = true;
      res.redirect("/");
    })
    .catch((err) => {
      res.render("pages/auth/signUp", {
        isLogedIn: req.session.isLogedIn,
        error: err.message,
      });
    });
});

router.get("/signout", authorize(), function (req, res, next) {
  firebase
    .auth()
    .signOut()
    .then(function () {
      req.session.isLogedIn = false;
      res.redirect("/");
    })
    .catch(function (error) {
      // An error happened.
    });
});

router.get("/forgotPassword", authorize(), function (req, res, next) {
  res.render("pages/auth/forgotPassword", {
    isLogedIn: req.session.isLogedIn,
    error: "",
  });
});

router.post("/forgotPassword", function (req, res, next) {
  const userEmail = req.body.userEmail;
  firebase
    .auth()
    .sendPasswordResetEmail(userEmail)
    .then((result) => {
      res.redirect("/");
    })
    .catch((err) => {
      res.render("pages/auth/forgotPassword", {
        isLogedIn: req.session.isLogedIn,
        error: err.message,
      });
    });
});

module.exports = router;
