var express = require("express");
var firebase = require("firebase");
var router = express.Router();
const authorize = require("../../middleware/auth-middleware");

router.get("/login", function(req, res, next) {
    res.render("pages/auth/login", {
        title: "Express",
        isLogedIn: req.session.isLogedIn,
    });
});

router.post("/login", function(req, res, next) {
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
            res.send(err);
        });
});

router.get("/signup", function(req, res, next) {
    res.render("pages/auth/signUp", {
        title: "Express",
        isLogedIn: req.session.isLogedIn,
    });
});

router.post("/signup", function(req, res, next) {
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
            res.send(err);
        });
});

router.get("/signout", authorize(), function(req, res, next) {
    firebase
        .auth()
        .signOut()
        .then(function() {
            req.session.isLogedIn = false;
            res.redirect("/");
        })
        .catch(function(error) {
            // An error happened.
        });
});

module.exports = router;