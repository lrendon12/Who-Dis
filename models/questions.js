// Dependencies
const Sequelize = require("sequelize");

module.exports = function(sequelize, DataTypes) {
  const Questions = sequelize.define("Questions", {
    question: {
      type: Sequelize.STRING
    }, 
    date: {
      type: "TIMESTAMP",
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    }
  });
  
  Questions.associate = function(db) {
    Questions.hasMany(db.UserAnswers, {
      onDelete: "cascade"
    });
  };
  return Questions;
};