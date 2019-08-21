'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Tickets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      event_id: {
        allowNull: false,
        type: Sequelize.STRING
      },
      venue_id: {
        allowNull: false,
        type: Sequelize.STRING
      },
      artist_id: {
        allowNull: false,
        type: Sequelize.STRING
      },
      seat_group: {
        type: Sequelize.STRING
      },
      seat: {
        type: Sequelize.STRING
      },
      class: {
        type: Sequelize.STRING
      },
      pre_tax: {
        type: Sequelize.FLOAT
      },
      ticket_status: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Tickets');
  }
};