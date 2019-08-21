'use strict';
module.exports = (sequelize, DataTypes) => {
  const PaymentInfo = sequelize.define('PaymentInfo', {
    favorite: DataTypes.BOOLEAN,
    full_name: DataTypes.STRING,
    card_number: DataTypes.INTEGER,
    exp_month: DataTypes.INTEGER,
    exp_year: DataTypes.INTEGER,
    cvv: DataTypes.INTEGER,
    country: DataTypes.STRING,
    address1: DataTypes.STRING,
    address2: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zipcode: DataTypes.STRING
  }, {});
  PaymentInfo.associate = function(models) {
    PaymentInfo.belongsTo(models.User,{as : 'User', foreignKey: 'user_id'})
    PaymentInfo.hasMany(models.Order,{as : 'Order', foreignKey: 'id'})
  };
  return PaymentInfo;
};