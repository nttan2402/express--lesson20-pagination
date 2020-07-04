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
  ],
  users: [
    {name:"Tan", age: 21},
    {name:"Nam", age: 21}
  ]
}).write();

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));
app.set("views", "./views");
app.set("view engine", "pug");
app.get("/books", function(req, res) {
  res.render("index", { databooks: db.get("databooks").value() });
});

app.post("/books", function(req, res) {
  db.get("databooks")
    .push(req.body) // {title:abc, description:"something"}
    .write();
  res.redirect("/books");
});

app.post("/books/update/:title", function(req, res) {
  var olddata = req.params.title;
  var newdata = req.body.title; //{title: abc}
  db.get("databooks")
    .find({ title: olddata })
    .assign({ title: newdata })
    .write();
  res.redirect('/books');
});

app.post("/books/delete/:title",function(req, res){
  var title = req.params.title;
  db.get("databooks").remove({title: title}).write();
  res.redirect('/books');
})
//Users
app.get("/users", function(req, res) {
  res.render("users", { users: db.get("users").value() });
});
app.get("/users/update/:name" , function(req, res){
  var name = req.params.name;
  res.render("update", {name: name})
});
app.post("/users/update/:name", function(req, res){
  var oldname = req.params.name;
  var newname = req.body.name; //{name: abc}
  var newage = req.body.age; //{age: abc}

    db.get("users")
    .find({ name: oldname })
    .assign({ name: newname,
              age: newage })
    .write();

  res.redirect('/users');
})

app.post("/user/delete/:name",function(req, res){
  var oldname = req.params.name;
  db.get("users").remove(oldname).write()
  res.redirect('')
})

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
// 