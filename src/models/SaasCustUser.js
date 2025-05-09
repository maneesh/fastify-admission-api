const mysql = require('mysql2/promise');
const config = require('../../postgrator-config');

class SaasCustUser {
  static async create({ user_id, saas_cust_id }) {
    const connection = await mysql.createConnection(config.connectionString);
    try {
      await connection.execute(
        'INSERT INTO saas_cust_user (user_id, saas_cust_id) VALUES (?, ?)',
        [user_id, saas_cust_id]
      );

      return { user_id, saas_cust_id };
    } finally {
      await connection.end();
    }
  }
}

module.exports = SaasCustUser;
