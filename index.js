"use strict";

process.env.DEBUG = "actions-on-google:*";
const App = require("actions-on-google").ApiAiApp;
const admin = require("firebase-admin");
const jsonfile = require("jsonfile");

// [START YourAction]
exports.kidsStories = (request, response) => {
  const app = new App({request, response});
  console.log("Request headers: " + JSON.stringify(request.headers));
  console.log("Request body: " + JSON.stringify(request.body));
  // Fulfill action business logic
  function inputWelcome (app) {
    // Complete your fulfillment logic and send a response
    var initMsg = "Hi, welcome to Kids Stories! Would you like to hear a fable or a fairy tale?"
    var backups = ["Would you like to hear a fable or a fairy tale? If you don't care, just say \"random\"! You can also specify the length, by saying, for example: \"long fairy tale\".",
      "I'm ready when you are! Just say \"fable\", \"fairy tale\", or \"random\" to start listening to a kids bedtime story!",
      "I can tell you a great kid's bedtime story some other time. Thank you for using Kids Stories!"
    ]; //todo
    app.ask(initMsg,backups);
  }

  function giveStory (app) {
    const storyType = request.body.result.storyType == null ? "fable" : request.body.result.storyType;
    const storyLength = request.body.result.storyType == null ? "short" : request.body.result.storyType;
    var file;
    switch(storyType) {
      case "fable":
        file = "./fable.json";
        break;
      case "fairytale":
        file = "./fairytale.json";
        break;
      default:
        //impossible to come here
    }
    jsonfile.readFile(file, function(err, stories) {
      switch(storyType) {
        case "fable":
          var storyNum = getRandInt(stories.fable.short.length);
          app.tell("Here's a great fable:\n\n"+stories.fable.short[storyNum]);
          break;
        case "fairytale":
          var storyNum = (storyLength == "short") ? getRandInt(stories.fairytales.short.length) : getRandInt(stories.fairytales.long.length);
          app.tell("Here's a great fairy tale:\n\n"+stories.fairy.short[storyNum]);
          break;
        default:
          //impossible to come here
      }
    })
  }

  function getRandInt(max) {
    var min = 0;
    var max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
  }


  const actionMap = new Map();
  actionMap.set("input.welcome", inputWelcome);
  actionMap.set("giveStory", giveStory);

  app.handleRequest(actionMap);
}
