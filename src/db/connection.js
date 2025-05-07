require('dotenv').config();
const { Sequelize } = require('sequelize');
const config = require('../../config/config.json')['development'];  // ← fixed path

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect
});

module.exports = sequelize;
