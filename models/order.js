'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    order_status: DataTypes.STRING,
    processed_date: DataTypes.DATE,
    quantity_total: DataTypes.INTEGER,
    pre_tax_total: DataTypes.FLOAT,
    post_tax_total: DataTypes.FLOAT
  }, {});
  Order.associate = function(models) {
    Order.belongsTo(models.User,{as : 'User', foreignKey: 'user_id'})
    Order.belongsTo(models.PaymentInfo,{as : 'PaymentInfo', foreignKey: 'payment_info_id'})
    Order.hasMany(models.Ticket,{as : 'Ticket', foreignKey: 'id'})
  };
  return Order;
};