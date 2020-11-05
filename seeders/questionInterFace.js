module.exports = {
  // eslint-disable-next-line no-unused-vars
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Questions", [{
      question: "Do you feel hopelessly lost in class?"
    },
    {
      question: "Are you from San Antonio?"
    },
    {
      question: "Do you know the muffin man?"
    },
    {
      question: "Do you have pets?"
    },
    {
      question: "Have you ever been arrested?"
    },
    {
      question: "Have you ever passed out drunk?"
    },
    {
      question: "Have you ever fallen into the river walk?"
    },
    {
      question: "Do you remember the Alamo?"
    },
    {
      question: "Are the cowboys going to win this year?"
    },
    {
      question: "Do you drive a truck?"
    },
    {
      question: "Are you married?"
    },
    {
      question: "Do you have children?"
    },
    {
      question: "Are you smarter than a 5th grader?"
    },
    {
      question: "Do you believe in ghost?"
    },
    {
      question: "Does your milkshake bring all the boys to the yard?"
    }]);
  },
  // eslint-disable-next-line no-unused-vars
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Questions", null, {});
  }
};