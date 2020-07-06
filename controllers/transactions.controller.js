var db = require("../db");
var shortid = require("shortid");

module.exports.index = function(req, res) {
  res.render("transactions", { transactions: db.get("transactions").value() });
};

module.exports.create = function(req, res) {
  res.render("createTransaction", {
    databooks: db.get("databooks").value(),
    users: db.get("users").value()
  });
};
module.exports.postCreate = function(req, res){
  req.body.id = shortid.generate();
  db.get("transactions").push(req.body).write();
  res.redirect("/transactions")
}

