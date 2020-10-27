var firebase = require("firebase");

module.exports = () => {
  return (req, res, next) => {
    console.log("autherization middleware");
    if (firebase.auth().currentUser !== null) {
      next();
    } else {
      return res.redirect("/auth/login");
    }
  };
};
