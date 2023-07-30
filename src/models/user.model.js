const { DataTypes } = require('sequelize');
const { db } = require('./../database/config');
const randomNumber = require('./../utils/getRandomNumber');

const User = db.define('users', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  accountNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'acount_number',
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1000,
  },
  status: {
    type: DataTypes.ENUM('active', 'desactived'),
    allowNull: false,
    defaultValue: 'active',
  },
});

module.exports = User;
