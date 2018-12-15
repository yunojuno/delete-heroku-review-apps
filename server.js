// server.js
// where your node app starts
const heroku = require('./src/heroku');
const express = require('express');
const app = express();


app.get('/delete', function(request, response) {
  console.log("Deleting review apps");
  heroku.deleteReviewApps();
  response.send("Deleting review apps. Output will be posted to Slack.");
});


// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
