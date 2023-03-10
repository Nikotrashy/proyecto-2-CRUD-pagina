var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

//cod adicional de la clase
const mongoose = require("mongoose");
const database = require("./config/database");
const bodyParser = require("body-parser");
const cors = require("cors");
mongoose.set("strictQuery", true);
mongoose
  .connect(database.url)
  .then(() => console.log("MongoDb connected"))
  .catch(() => console.log("Connection Error"));

//cod adicional de la clase

var app = express();
app.use(bodyParser.json);
app.use(cors());
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.get("*", (req, res) => {
  res.send("Conetado exitosamente a MongoDB Atlas");
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/est", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
