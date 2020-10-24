function signOut() {
  firebase
    .auth()
    .signOut()
    .then(function () {
      console.log("sign out successful");
      // Sign-out successful.
    })
    .catch(function (error) {
      // An error happened.
      console.log("eroor during sign out", error);
    });
}
