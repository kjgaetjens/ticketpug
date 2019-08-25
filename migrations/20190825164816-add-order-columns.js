'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
        return Promise.all([
            queryInterface.addColumn('Orders', 'order_email', {
                type: Sequelize.STRING
            }, { transaction: t }),
            queryInterface.addColumn('Orders', 'order_phone', {
                type: Sequelize.STRING,
            }, { transaction: t })
        ])
    })
},

down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
        return Promise.all([
            queryInterface.removeColumn('Orders', 'order_email', { transaction: t }),
            queryInterface.removeColumn('Orders', 'order_phone', { transaction: t })
        ])
    })
}

};
