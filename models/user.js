'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    status: DataTypes.STRING,
    last_login: DataTypes.DATE
  }, {});
  User.associate = function(models) {
    User.hasMany(models.PaymentInfo,{as : 'PaymentInfo', foreignKey: 'id'})
    User.hasMany(models.Order,{as : 'Order', foreignKey: 'id'})
  };
  return User;
};