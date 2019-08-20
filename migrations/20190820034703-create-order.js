'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      order_status: {
        allowNull: false,
        type: Sequelize.STRING
      },
      processed_date: {
        type: Sequelize.DATE
      },
      quantity_total: {
        type: Sequelize.INTEGER
      },
      pre_tax_total: {
        type: Sequelize.FLOAT
      },
      post_tax_total: {
        type: Sequelize.FLOAT
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      payment_info_id: {
        allowNull: false,
        type: Sequelize.INTEGER
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
    return queryInterface.dropTable('Orders');
  }
};