var express = require('express')
var router = express.Router()
var db = require('./db');

router.get("/", function(req, res) {
  res.render("users", { users: db.get("users").value() });
});
router.get("/update/:name", function(req, res) {
  var name = req.params.name;
  res.render("update", { name: name });
});
router.post("/update/:name", function(req, res) {
  var oldname = req.params.name;
  var newname = req.body.name; //{name: abc}
  var newage = req.body.age; //{age: abc}

  db.get("users")
    .find({ name: oldname })
    .assign({ name: newname, age: newage })
    .write();

  res.redirect("/users");
});

router.post("/delete/:name", function(req, res) {
  var oldname = req.params.name;
  db.get("users")
    .remove({ name: oldname })
    .write();
  res.redirect("/users");
});

router.get("/create", function(req, res) {
  res.render("create");
});
router.post("/create", function(req, res) {
  var newname = req.body.name; //{name: abc}
  var newage = req.body.age; //{age: abc}
  db.get("users")
    .push(req.body)
    .write();
  res.redirect("/users");
});
module.exports = router