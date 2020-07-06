var express = require("express");
var router = express.Router();
var db = require("../db");
var shortid = require("shortid");

router.get("/", function(req, res) {
  res.render("users", { users: db.get("users").value() });
});
router.get("/update/:name", function(req, res) {
  res.render("update", { name: req.params.name });
});
router.post("/update/:name", function(req, res) {
  req.body.id = shortid.generate();
  db.get("users")
    .find({ name: req.params.name })
    .assign(req.body)
    .write();
  res.redirect("/users");
});

router.post("/delete/:name", function(req, res) {
  db.get("users")
    .remove({ name: req.params.name })
    .write();
  res.redirect("/users");
});

router.get("/create", function(req, res) {
  res.render("create");
});
router.post("/create", function(req, res) {
  req.body.id = shortid.generate();
  db.get("users")
    .push(req.body)
    .write();
  res.redirect("/users");
});
module.exports = router;
