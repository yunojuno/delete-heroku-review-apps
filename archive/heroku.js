// Useful functions we may wish to resurrect


// // stop all review apps
// const stopReviewApps = () => {
//     heroku.get('/pipelines/' + process.env.PIPELINE_ID + '/review-apps', API_ACCEPT_HEADERS)
//     .then(apps => {
//       apps.forEach(app => {
//         stopReviewApp(app);
//       });
//     })
//     .catch(error => {
//       console.log("ERROR: " + error.body.message);
//     });
// }


// // delete a single review app
// const deleteReviewApp = review_app_id => {
//   heroku.delete('/review-apps/' + review_app_id, API_ACCEPT_HEADERS)
//   .then(app => {
//     const msg = "Review app for '" + app.branch + "' deleted";
//     console.log(msg);
//     // slack.sendChannelMessage('#junobot', msg);
//   })
//   .catch(error => {
//     console.log("ERROR: " + error);
//   });
// }


// // stop all dynos for a specific app 
// const stopReviewApp = app => {
//   console.log("Fetching dynos for '" + app.branch + "'");
//   heroku.get('/apps/' + app.app.id + '/dynos')
//   .then(dynos => {
//     let stopped = [];
//     dynos.forEach(dyno => {
//       if (dyno.state === 'up') {
//         stopped.push(stopDyno(dyno));
//       } else {
//         const msg = "Ignoring '" + dyno.state + "' " + dynoLabel(dyno);
//         slack.sendChannelMessage('#junobot', msg);
//         console.log(msg);
//       }
//     });
//     return stopped;
//   })
//   .catch(error => {
//     console.log("ERROR: Unable to fetch dynos for '" + app.branch + "'. " + error.body.message);
//   });
// }

// // stop a single dyno
// const stopDyno = dyno => {
//   console.log("Stopping " + dynoLabel(dyno));
//   const url = '/apps/' + dyno.app.id + '/dynos/' + dyno.id + '/actions/stop';
//   heroku.post(url)
//     .then(resp => {
//       console.log("Stopped " + dynoLabel(dyno));
//       // slack.sendChannelMessage('#junobot', "Stopped " + dynoLabel(dyno));
//       return dyno.id;
//     })
//     .catch(error => {
//       console.log("ERROR: " + error.body.message);
//     });
// };