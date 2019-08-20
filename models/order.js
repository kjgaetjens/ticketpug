'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    order_status: DataTypes.STRING,
    processed_date: DataTypes.DATE,
    quantity_total: DataTypes.INTEGER,
    pre_tax_total: DataTypes.FLOAT,
    post_tax_total: DataTypes.FLOAT,
    user_id: DataTypes.INTEGER,
    payment_info_id: DataTypes.INTEGER
  }, {});
  Order.associate = function(models) {
    // associations can be defined here
  };
  return Order;
};