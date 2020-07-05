var express = require('express')
var router = express.Router()
var db = require("./db")
var shortid = require('shortid')

router.get("/", function(req, res){
  res.render("transactions", {transactions: db.get("transactions").value()})
})
router.get("/create", function(req, res){
  res.render("createTransaction", {transactions: db.get("transactions").value(),
                                  databooks: db.get("databooks").value(),
                                  users: db.get("users").value()})
  var databooks = db.get("databooks").value();
  
  
})


module.exports = router;