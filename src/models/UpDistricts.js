const pool = require('../db/connection');

const getUpDistricts = async () => {
  const [rows] = await pool.query('SELECT * FROM up_district');
  return rows;
};

module.exports = {
  getUpDistricts,
};