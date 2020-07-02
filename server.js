// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
var express = require("express");
var app = express();
var low = require('lowdb')
var FileSync = require('lowdb/adapters/FileSync')

var adapter = new FileSync('db.json')
var db = low(adapter)

// our default array of dreams
var books = [
  {title: "GOD Father", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit"},
  {title: "GOD Father", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit"},
  {title: "GOD Father", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit"}
];
// db.defaults({ databooks: [], user: {}, count: 0 })
//   .write()
app.set('views', './views');
app.set('view engine', 'pug');
app.get('/books', function (req, res) {
  res.render('index', { databooks: books })
})


// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
