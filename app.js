var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
require("dotenv").config();
var session = require("express-session");

var indexRouter = require("./routes/index");
var authRouter = require("./routes/auth/auth");

// var usersRouter = require("./routes/users");
// var loginRouter = require("./routes/login");
// var signUpRouter = require("./routes/signUp");
// var profileRouter = require("./routes/profile");

var app = express();

// view engine setup
app.engine("ejs", require("express-ejs-extend"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/public", express.static(path.join(__dirname, "public")));
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use(express.static(__dirname + '/node_modules/firebase'));

app.use("/", indexRouter);
app.use("/auth", authRouter);
// app.use("/users", usersRouter);
// app.use("/login", loginRouter);
// app.use("/signUp", signUpRouter);
// app.use("/profile", profileRouter);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

// Start the server
app.listen(process.env.PORT || 3000, function() {
    console.log(
        "Express server listening on port %d in %s mode",
        this.address().port,
        app.settings.env
    );
});

module.exports = app;