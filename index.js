"use strict";

process.env.DEBUG = "actions-on-google:*";
const App = require("actions-on-google").ApiAiApp;
const admin = require("firebase-admin");
var serviceAccount = require("../firebasekey.json");

// [START YourAction]
exports.kidsStories = (request, response) => {
  const app = new App({request, response});
  console.log("Request headers: " + JSON.stringify(request.headers));
  console.log("Request body: " + JSON.stringify(request.body));
  // Fulfill action business logic
  function responseHandler (app) {
    // Complete your fulfillment logic and send a response
    var initMsg = "Hi, welcome to Kids Stories! What would you like to do? You can specify by story type or length."
    var backups = [
      "p1",
      "p2",
      "p3"
    ]; //todo
    app.tell("Hello, World!");
  }

  const actionMap = new Map();
  actionMap.set("input.welcome", responseHandler);

  app.handleRequest(actionMap);
}
