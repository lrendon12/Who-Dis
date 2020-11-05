
/* eslint-disable prefer-const */
// Dependencies
const db = require("../models");
const passport = require("passport");
// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");
module.exports = function(app) {
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/questions/quiz/:id", isAuthenticated, function(req, res) {
    db.Questions.findAll({
      where: {
        id: req.params.id
      },
    })
      .then(response => res.render("questions", {
        questions: response
      }))
      .catch(err => console.error(err));
  });

  app.get("/answers/:id", isAuthenticated, function(req, res) {
    if (req.params.id === "16") {
      res.redirect("/complete");
    } else {
      db.UserAnswers.findAll({
        where: {
          QuestionId: req.params.id
        },
        group: ["name", "question"]
      })
        .then(answers => res.render("answers", {
          answers
        }))
        .catch(err => console.error(err));
    }
  });

  app.post("/questions/quiz/:id", isAuthenticated, function(req, res) {
    if(req.body.questId === "15") {
      console.log("reached me");
      let questId = parseInt(req.body.questId);
      const ans = (req.body.yes_no === "yes");
      db.UserAnswers.create({
        answer: ans,
        question: req.body.questions,
        name: req.user.name, 
        UserId: req.user.id,
        QuestionId: questId
      }).then(() => res.redirect("/answers/1"));
    } else {
      console.log("api questions working");
      let questId = parseInt(req.body.questId);
      const ans = (req.body.yes_no === "yes");
      db.UserAnswers.create({
        answer: ans,
        question: req.body.questions,
        name: req.user.name, 
        UserId: req.user.id,
        QuestionId: questId
      }).then(() => res.redirect(`${++questId}`));
    }
  });

  app.post("/login", passport.authenticate("local"), function(req, res) {
    res.redirect("/questions/quiz/1");
    console.log("api login working");
  });
  // If user creates an account
  app.post("/signup", function (req, res) {
    // Adds data to DB
    db.Users.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    })
    // Once account created, log them in
      .then(function () {
        console.log("api sign up working");
        res.redirect(307, "/login");
      })
      // If error, catch error
      .catch(function (err) {
        res.status(401).json(err);
      });
  });
};