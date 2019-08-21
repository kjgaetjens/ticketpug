'use strict';
module.exports = (sequelize, DataTypes) => {
  const QRCode = sequelize.define('QRCode', {
    url: DataTypes.STRING
  }, {});
  QRCode.associate = function(models) {
    QRCode.hasOne(models.Ticket,{as : 'Ticket', foreignKey: 'id'})
  };
  return QRCode;
};