var express = require("express");
var firebase = require("firebase");
var router = express.Router();

router.get("/login", function (req, res, next) {
  res.render("pages/auth/login", { title: "Express" });
});

router.post("/login", function (req, res, next) {
  const userEmail = req.body.userEmail;
  const userPassword = req.body.userPassword;
  firebase
    .auth()
    .signInWithEmailAndPassword(userEmail, userPassword)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
});

router.get("/signup", function (req, res, next) {
  res.render("pages/auth/signUp", { title: "Express" });
});

router.post("/signup", function (req, res, next) {
  const userEmail = req.body.userEmail;
  const userPassword = req.body.userPassword;
  firebase
    .auth()
    .createUserWithEmailAndPassword(userEmail, userPassword)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
});

router.get("/profile", function (req, res, next) {
  res.render("pages/auth/profile", { title: "Express" });
});

router.get("/singout", function (req, res) {
  firebase.auth().signOut();
  req.session.destroy(function (err) {
    if (err) {
      res.negotiate(err);
    }
    res.redirect("/");
  });
});

module.exports = router;
