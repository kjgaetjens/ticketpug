'use strict';
module.exports = (sequelize, DataTypes) => {
  const QRCode = sequelize.define('QRCode', {
    url: DataTypes.STRING
  }, {});
  QRCode.associate = function(models) {
    // associations can be defined here
  };
  return QRCode;
};