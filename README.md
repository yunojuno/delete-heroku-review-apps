Review App Manager
==================

Simple webhook handler that will delete Heroku review apps when called.

This app uses the _beta_ [Review apps API](https://devcenter.heroku.com/articles/review-apps-beta#review-app-list) to fetch all review apps, and then
uses the stable Platform API to delete each one in turn.

The endpoint `/delete` should be pinged at 6pm (UTC) each day to power down the apps. This
URL is called from the Heroku scheduler attached to the dev app.
