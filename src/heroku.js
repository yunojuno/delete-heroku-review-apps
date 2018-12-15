const Heroku = require('heroku-client')
const heroku = new Heroku({ token: process.env.HEROKU_API_TOKEN })
const slack = require("./slack");

// review apps API is in beta, and we need to use a special Accept header:
const API_ACCEPT_HEADERS = { headers: { 'Accept': 'application/vnd.heroku+json; version=3.review-apps' } };

// delete all review apps
const deleteReviewApps = () => {
  heroku.get('/pipelines/' + process.env.PIPELINE_ID + '/review-apps', API_ACCEPT_HEADERS)
  .then(apps => {
    let deleted = []
    apps.forEach(app => {
      deleted.push(deleteReviewApp(app));
    });
    return deleted;    
  })
  .catch(error => {
    logMessage("ERROR: " + error.body.message);
  });
}

// delete a single review app
const deleteReviewApp = review_app => {
  // the app.id refers to the review app, but app.app.id refers to the underlying app
  // which is what we want to delete. The review_app delete API doesn't appear to work.
  heroku.delete('/apps/' + review_app.app.id)
  .then(app => {
    logMessage("Review app for '" + review_app.branch + "' deleted");
    return review_app.branch;
  })
  .catch(error => {
    logMessage("ERROR Unable to delete review app. '" + review_app.branch + "'. " + error);
  });
}

const logMessage = message => {
  console.log(message);
  slack.sendChannelMessage('#junobot', message);
}

module.exports = {
  deleteReviewApps: deleteReviewApps
};
