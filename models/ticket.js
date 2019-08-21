'use strict';
module.exports = (sequelize, DataTypes) => {
  const Ticket = sequelize.define('Ticket', {
    event_id: DataTypes.STRING,
    event_name: DataTypes.STRING,
    event_date: DataTypes.STRING,
    artist_name: DataTypes.STRING,
    venue_name: DataTypes.STRING,
    seat_group: DataTypes.STRING,
    seat: DataTypes.STRING,
    class: DataTypes.STRING,
    pre_tax: DataTypes.FLOAT,
    ticket_status: DataTypes.STRING
  }, {});
  Ticket.associate = function(models) {
    Ticket.belongsTo(models.Order,{as : 'Order', foreignKey: 'order_id'})
    Ticket.belongsTo(models.QRCode,{as : 'QRCode', foreignKey: 'qr_code_id'})
  };
  return Ticket;
};