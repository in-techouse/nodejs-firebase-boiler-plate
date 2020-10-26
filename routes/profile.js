var express = require("express");
var router = express.Router();
const authorize = require("../auth-middleware");

router.get("/profile", authorize(), function (req, res, next) {
    res.render("pages/auth/profile", {
      title: "Express",
      isLogedIn: req.session.isLogedIn,
    });
  });

module.exports = router;