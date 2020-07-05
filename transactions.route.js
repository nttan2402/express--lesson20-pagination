var express = require('express')
var router = express.Router()
var db = require("./db")
var shortid = require('shortid')

router.get("/", function(req, res){
  res.render("transactions", {transactions: db.get("transactions").value()})
})
router.get("/create", function(req, res){
  res.render("createTransaction", {databooks: db.get("databooks").value(),
                                  users: db.get("users").value()})
});
router.post("/create", function(req, res){
  req.body.id = shortid.generate();
  db.get("transactions").push(req.body).write();
  res.redirect("/transactions")
})
module.exports = router;