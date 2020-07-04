var express = require('express')
var router = express.Router()
var shortid = require('shortid')
var db = require('./db');


router.get("/", function(req, res) {
  res.render("index", { databooks: db.get("databooks").value() });
});
//ADD
router.post("/", function(req, res) {
 req.body.id = shortid.generate()
  db.get("databooks")
    .push(req.body) // {title:abc, description:"something"}
    .write();
  res.redirect("/");
});
//UPDATE
router.post("/update/:title", function(req, res) {
  var olddata = req.params.title;
  var newdata = req.body.title; //{title: abc}
  req.body.id = shortid.generate()
  db.get("databooks")
    .find({ title: olddata })
    .assign({ title: newdata })
    .write();
  res.redirect("/");
});
//DELETE
router.post("/delete/:title", function(req, res) {
  var title = req.params.title;
  db.get("databooks")
    .remove({ title: title })
    .write();
  res.redirect("/");
});

module.exports = router