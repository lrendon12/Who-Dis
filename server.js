// Dependencies
const express = require("express");
const PORT = process.env.PORT || 8080;
const app = express();
const session = require("express-session");
// Requiring passport as we've configured it
const passport = require("./config/passport");
require("dotenv").config();
const Handlebars = require("handlebars");

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));
app.subscribe(express.json());

// We need to use sessions to keep track of our user's login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Require models
const db = require("./models");

// Sets up the Express App
const exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// eslint-disable-next-line no-unused-vars
Handlebars.registerHelper("limit", function (arr, limit){
  if (!Array.isArray(arr)) { return [];}
  return arr.slice(0, limit);
});
// eslint-disable-next-line no-unused-vars
Handlebars.registerHelper("inc", function(value, options)
{return parseInt(value) + 1; });
//require("./routes/questions-api-routes.js")(app);
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);



// Starts the server to begin listening
db.sequelize.sync().then(function () {
  app.listen(PORT, function () {
    console.log("App listening on PORT http://localhost:" + PORT);
  });
});