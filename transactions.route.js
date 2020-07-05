var express = require('express')
var router = express.Router()
var db = require('./db.json')
var shortid = require('shortid')

router.get("/", function(req, res){
  res.render("transactions", db.get("transactions").value())
})
router.get("/create", function(req, res){
  res.render
})


module.exports = router;