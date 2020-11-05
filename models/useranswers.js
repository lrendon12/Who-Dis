module.exports = function (sequelize, DataTypes) {
  const UserAnswers = sequelize.define("UserAnswers", {
    question: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    answer: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }  
  });
  return UserAnswers;
};