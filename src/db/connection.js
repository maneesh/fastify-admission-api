require('dotenv').config();
const mysql = require('mysql2/promise');
const config = require('../../config/config.json')['development'];

const pool = mysql.createPool({
  host: config.host,
  user: config.username,
  password: config.password,
  database: config.database,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;
