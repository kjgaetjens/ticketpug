'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Tickets',
      'qr_code_id',
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'QRCodes',
          key: 'id'
        }
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Tickets',
      'qr_code_id'
    )
  }
};
