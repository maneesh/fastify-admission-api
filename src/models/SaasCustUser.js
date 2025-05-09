const mysql = require('mysql2/promise');
const config = require('../../postgrator-config');

class SaasCustUser {
  static async create({ saas_cust_id }) {
    const connection = await mysql.createConnection(config.connectionString);
    try {
      const [result] = await connection.execute(
        'INSERT INTO saas_cust_user (saas_cust_id) VALUES (?)',
        [saas_cust_id]
      );
    
      return { user_id: result[0].insertId, saas_cust_id };
    } finally {
      await connection.end();
    }
  }
}

module.exports = SaasCustUser;
