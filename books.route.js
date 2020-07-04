var express = require('express')
var router = express.Router()
var db = require('./db');


router.get("/", function(req, res) {
  res.render("index", { databooks: db.get("databooks").value() });
});

router.post("/", function(req, res) {
  db.get("databooks")
    .push(req.body) // {title:abc, description:"something"}
    .write();
  res.redirect("/");
});

router.post("/update/:title", function(req, res) {
  var olddata = req.params.title;
  var newdata = req.body.title; //{title: abc}
  db.get("databooks")
    .find({ title: olddata })
    .assign({ title: newdata })
    .write();
  res.redirect("/");
});

router.post("/delete/:title", function(req, res) {
  var title = req.params.title;
  db.get("databooks")
    .remove({ title: title })
    .write();
  res.redirect("/");
});

module.exports = router