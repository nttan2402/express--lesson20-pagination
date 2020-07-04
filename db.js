var low = require("lowdb");
var FileSync = require("lowdb/adapters/FileSync");

var adapter = new FileSync("db.json");
var db = low(adapter);

db.defaults({
  databooks: [
    { title: "GOD Father", description: "Lorem ipsum dolor sit amet", id: "abcsdos129n" },
    { title: "GOD Father", description: "Lorem ipsum dolor sit amet", id: "abcsq2os19n"  },
    { title: "GOD Father", description: "Lorem ipsum dolor sit amet", id: "abcsdosvb9n"  }
  ],
  users: [{ name: "Tan", age: 21 }, { name: "Nam", age: 21 }]
}).write();

module.exports = db;