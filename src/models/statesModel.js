const pool = require('../db/connection');

const getAllStates = async () => {
  const [rows] = await pool.query('SELECT * FROM states');
  return rows;
};

module.exports = {
  getAllStates,
};
