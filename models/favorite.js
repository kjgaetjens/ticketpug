'use strict';
module.exports = (sequelize, DataTypes) => {
  const Favorite = sequelize.define('Favorite', {
    event_id: DataTypes.INTEGER,
    event_name: DataTypes.STRING,
    event_date: DataTypes.STRING,
    venue_name: DataTypes.STRING
  }, {});
  Favorite.associate = function(models) {
    Favorite.belongsTo(models.User, {as: 'User', foreignKey: 'user_id'})
  };
  return Favorite;
};