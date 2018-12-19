// module used for interacting with the Heroku platform API
const Heroku = require('heroku-client')
const heroku = new Heroku({ token: process.env.HEROKU_API_TOKEN })
const logging = require("./logging");
const slack = require("./slack");

// review apps API is in beta, and we need to use a special Accept header:
const API_ACCEPT_HEADERS = { headers: { 'Accept': 'application/vnd.heroku+json; version=3.review-apps' } };

// delete all review apps
function deleteAllRunningReviewApplications() {
  logging.debug("Fetching review apps prior to deletion...");
  heroku.get(`/pipelines/${process.env.PIPELINE_ID}/review-apps`, API_ACCEPT_HEADERS)
    .then(apps => {
      let deleted = []
      if (apps.length === 0) {
        logging.debug("No running reviews app available.");
      };
      apps.forEach(app => {
        deleted.push(deleteSingleReviewApplication(app));
      });
      return deleted;    
    })
    .catch(error => {
      logging.error(error.body.message);
    });
}

// delete a single review app
function deleteSingleReviewApplication(review_app) {
  // the review_app.id refers to the review app, but review_app.app.id refers to the underlying app
  // which is what we want to delete. The review_app delete API doesn't appear to work.  
  logging.info(`Deleting review app for '${review_app.branch}'...`);
  heroku.delete(`/apps/${review_app.app.id}`)
    .then(app => {
      const message = `Review app for '${review_app.branch}' deleted.`;
      logging.info(message);
      slack.sendMessage(message);
      return review_app.branch;
    })
    .catch(error => {
      logging.error(`Unable to delete review app. '${review_app.branch}':\n${error}`);
    });
}

module.exports = {
  deleteReviewApps: deleteAllRunningReviewApplications
};
