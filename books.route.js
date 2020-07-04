var express = require("express");
var router = express.Router();
var shortid = require("shortid");
var db = require("./db");

router.get("/", function(req, res) {
  res.render("index", { databooks: db.get("databooks").value() });
});
//ADD
router.post("/", function(req, res) {
  req.body.id = shortid.generate();
  db.get("databooks")
    .push(req.body) // {title:abc, description:"something"}
    .write();
  res.redirect("/books");
});
//UPDATE
router.post("/update/:title", function(req, res) {
  req.body.id = shortid.generate();
  db.get("databooks")
    .find({ title: req.params.title })
    .assign({ title: req.body.title })
    .write();
  res.redirect("/books");
});
//DELETE
router.post("/delete/:title", function(req, res) {
  db.get("databooks")
    .remove({ title: req.params.title })
    .write();
  res.redirect("/books");
});

module.exports = router;
