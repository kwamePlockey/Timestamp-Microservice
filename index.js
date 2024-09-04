// index.js
// where your node app starts

// init project
const express = require('express');
const app = express();
const {isDateValid} = require("./dateValidator")

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
const cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// GET API with empty date parameter returning the current time 
app.get("/timestamp/api/", function (req, res) {
  const currentDate = new Date()
  const unix = Date.parse(currentDate)
  res.json({unix, utc: currentDate.toUTCString()});
});


//GET API with valid date parameter
app.get("/timestamp/api/:dateParam", (req, res) =>{
  const dateParam = req.params.dateParam
  console.log(isDateValid(dateParam))

  //Validate date_string
  if(!isDateValid(dateParam)){
    res.json({ error : "Invalid Date" })
    return;
  }

  let standardTime = new Date(dateParam) 

  //converting unix dateParam to type number
  if(!isDateValid(standardTime)){
    standardTime = new Date(Number(dateParam))
  }

  const unix = Date.parse(standardTime) 

  res.json({unix, utc: standardTime.toUTCString()})
})



// Listen on port set in environment variable or default to 3000
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});



