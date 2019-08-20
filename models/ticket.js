'use strict';
module.exports = (sequelize, DataTypes) => {
  const Ticket = sequelize.define('Ticket', {
    event_id: DataTypes.STRING,
    venue_id: DataTypes.STRING,
    artist_id: DataTypes.STRING,
    order_id: DataTypes.INTEGER,
    merchant_id: DataTypes.INTEGER,
    seat_group: DataTypes.STRING,
    seat: DataTypes.STRING,
    class: DataTypes.STRING,
    pre_tax: DataTypes.FLOAT,
    ticket_status: DataTypes.STRING,
    qr_code_id: DataTypes.INTEGER
  }, {});
  Ticket.associate = function(models) {
    // associations can be defined here
  };
  return Ticket;
};