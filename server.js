// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

function isNumeric(str) {
  if (typeof str != "string") return false // we only process strings!
  return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
         !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

app.get("/api/timestamp/:date?", function(req, res){
  var date = new Date();

  if(isNumeric(req.params.date)) {
    date.setTime(req.params.date);
  }else{
    date = req.params.date === undefined ? new Date() : new Date(req.params.date);
  }

  if ( Object.prototype.toString.call(date) === "[object Date]" ) {
    // it is a date
    if ( isNaN( date.getTime() ) ) {  // d.valueOf() could also work
      // date is not valid
      res.json({error: "Invalid Date"});
    }
    else {
      // date is valid
      res.json({unix:date.valueOf(), utc: date.toGMTString()});
    }
  }else{
    res.json({error: "Invalid Date"});
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
