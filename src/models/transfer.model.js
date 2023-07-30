const { DataTypes } = require('sequelize');
const { db } = require('./../database/config');

const Transfer = db.define('transfers', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  senderUserId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'sender_user_id',
  },
  receiverUserId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'receiver_user_id',
  },
});

module.exports = Transfer;
