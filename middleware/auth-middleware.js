var firebase = require("firebase");

module.exports = () => {
  return (req, res, next) => {
    if (firebase.auth().currentUser !== null) {
      if (
        req.originalUrl === "/auth/login" ||
        req.originalUrl === "/auth/signup" ||
        req.originalUrl === "/auth/forgotPassword"
      ) {
        return res.redirect("/");
      } else {
        next();
      }
    } else {
      if (
        req.originalUrl === "/auth/login" ||
        req.originalUrl === "/auth/signup" ||
        req.originalUrl === "/auth/forgotPassword"
      ) {
        next();
      }
      return res.redirect("/auth/login");
    }
  };
};
