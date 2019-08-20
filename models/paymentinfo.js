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
    zipcode: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {});
  PaymentInfo.associate = function(models) {
    // associations can be defined here
  };
  return PaymentInfo;
};