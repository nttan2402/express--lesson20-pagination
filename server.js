// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
var express = require("express");
var app = express();

// our default array of dreams
var books = [
  "GOD Father",
  "Climb a really tall mountain",
  "Wash the dishes"
];
app.set('views', './views')
app.set('view engine', 'pug')
app.get('/', function (req, res) {
  res.render('index', { title: 'Hey', message: 'Hello there!' })
})


// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
