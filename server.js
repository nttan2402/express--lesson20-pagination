1;

// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
var express = require("express");
var db = require("./db");
var shortid = require("shortid");
var cookieParser = require("cookie-parser");
//require
var booksRoute = require("./Route/books.route");
var usersRoute = require("./Route/users.route");
var transactionRoute = require("./Route/transactions.route");
var loginRoute = require("./Route/login.route");
// auth middleware
var authLogin = require("./middleware/middleware.login");
var authAdmin = require("./middleware/middleware.admin");
// our default array of dreams
var count = 0;
var app = express();

app.use(cookieParser());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("views", "./views");
app.set("view engine", "pug");

app.get("/", function(req, res) {
  res.cookie("users-id", shortid.generate());
  res.render("home");
  if (req.cookies) {
    count++;
  }
  console.log("cookes:", count);
});
//login
app.use("/login", loginRoute);
//Books
app.use("/books", booksRoute);
//Users
app.use("/users", authLogin.requireAuth, usersRoute);
//Transactions
app.use("/transactions", authAdmin.admin, transactionRoute);

// listen for requests :)

const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
