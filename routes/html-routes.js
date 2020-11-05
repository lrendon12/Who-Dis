// Requiring path to so we can use relative routes to our HTML files
const path = require("path");
module.exports = function(app) {
  // Direct user to login page first
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/login.html"));
    console.log("initial login page");
  });
  // Direct user to sign up page if button clicked
  app.get("/signup", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/signup.html"));
    console.log("clicked sign up");
  });
  app.get("/complete", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/complete.html"));
    console.log("done");
  });
  // Direct user to login page if button clicked
  app.get("/login", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/login.html"));
    console.log("clicked login");
  });
  // Log user out if logout clicked
  app.get("/questions/quiz/logout", function(req,res) {
    req.logout();
    res.redirect("/login");
  });
};
