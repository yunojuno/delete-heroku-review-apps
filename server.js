const heroku = require('./src/heroku');
const logging = require('./src/logging');
const express = require('express');
const app = express();


app.get('/delete', function(request, response) {
  heroku.deleteReviewApps();
  response.send("Deleting review apps. Output will be posted to Slack (" + process.env.SLACK_CHANNEL + ").");
});


// listen for requests :)
app.listen(process.env.PORT, function() {
  logging.debug(`Your app is listening on port ${process.env.PORT}`);
});
