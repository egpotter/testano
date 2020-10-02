port = process.env.PORT || process.argv[2] || 8083;

const express = require("express");
const app = express();

app.use('/static', express.static(__dirname + "/public/"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get('/',(req, res) => {
  res.render('hugo.ejs', { nomes: [] });
});

app.post('/',(req, res) => {
  array = req.body["nomes"].split(",")
  n = req.body["players"]
  result = []
  while (array.length >= n) {
    random = getRandom(array, n)
    result.push(random)
    array = array.filter(function(item) {
      return !random.includes(item);
    })
  }
  res.render('hugo.ejs', { resto: array, times: result, nomes: req.body["nomes"] });
});

// look for PORT environment variable,
// else look for CLI argument,
// else use hard coded value for port 8080
app.listen(port, () => console.log("Server Up and running"));


function getRandom(arr, n) {
  var result = new Array(n),
      len = arr.length,
      taken = new Array(len);
  if (n > len)
      throw new RangeError("getRandom: more elements taken than available");
  while (n--) {
      var x = Math.floor(Math.random() * len);
      result[n] = arr[x in taken ? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
}
