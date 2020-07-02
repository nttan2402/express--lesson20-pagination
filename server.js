// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
var express = require("express");
var app = express();
var low = require("lowdb");
var FileSync = require("lowdb/adapters/FileSync");

var adapter = new FileSync("db.json");
var db = low(adapter);

// our default array of dreams

db.defaults({
  databooks: [
    { title: "GOD Father", description: "Lorem ipsum dolor sit amet" },
    { title: "GOD Father", description: "Lorem ipsum dolor sit amet" },
    { title: "GOD Father", description: "Lorem ipsum dolor sit amet" }
  ]
}).write();
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true }))
app.set("views", "./views");
app.set("view engine", "pug");
app.get("/books", function(req, res) {
  res.render("index", { databooks: db.get("databooks").value() });
});
app.post("/books", function(req, res) {
  db.get('databooks')
  .push(req.body)
  .write();
  res.redirect('/books');
});
// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
