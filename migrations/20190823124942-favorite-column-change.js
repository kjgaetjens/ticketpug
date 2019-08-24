'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn(
      'Favorites',
      'event_id',
      {
        type: Sequelize.STRING,
        allowNull: false
      }

    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn(
      'Favorites',
      'event_id',
      {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    )
  }
};
