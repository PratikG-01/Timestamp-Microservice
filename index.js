// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

function isUnixTimestamp(value) {
  return value.length === 10 || value.length === 13;
}

app.get("/api", (req, res) => {
  // const currentDate = new Date();
  return res.status(200).json({
    unix: new Date().getTime(),
    utc: new Date().toUTCString(),
  });
});

app.get("/api/:date", (req, res) => {
  let date = req.params.date;

    
  

  // console.log(new Date(date));
  if (new Date(date).toString() !== "Invalid Date") {
    res.status(200).json({
      unix: new Date(date).getTime(),
      utc: new Date(date).toUTCString(),
    });
    
  } else if (isUnixTimestamp(date)) {
    if( date.length === 10) {
      date = parseInt(date) * 1000; // Convert seconds to milliseconds
    } else {
      date = parseInt(date);
    }
    // console.log(new Date(date));
  } else {
    return res.status(400).json({
      error: "Invalid Date",
    });
  }

   res.status(200).json({
     unix: new Date(date).getTime(),
     utc: new Date(date).toUTCString(),
   });
 
   

});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
