var low = require("lowdb");
var FileSync = require("lowdb/adapters/FileSync");

var adapter = new FileSync("db.json");
var db = low(adapter);

db.defaults({
  databooks: [
    { title: "GOD Father", description: "Lorem ipsum dolor sit amet" },
    { title: "GOD Father", description: "Lorem ipsum dolor sit amet" },
    { title: "GOD Father", description: "Lorem ipsum dolor sit amet" }
  ],
  users: [{ name: "Tan", age: 21 }, { name: "Nam", age: 21 }]
}).write();

module.exports = db;