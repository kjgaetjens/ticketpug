'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Orders',
      'payment_info_id',
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'PaymentInfos',
          key: 'id'
        }
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Orders',
      'payment_info_id'
    )
  }
};
