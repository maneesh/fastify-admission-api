const mysql = require('mysql2/promise');
const config = require('../../config/config.js')['development'];

class SaasCustUser {
  static async create({ user_id, saas_cust_id }, request) {
    const connection = await mysql.createConnection({
      host: config.host,
      user: config.username,
      password: config.password,
      database: config.database,
      multipleStatements: true
    });
    try {
      await connection.execute(
        'INSERT INTO saas_cust_user (user_id, saas_cust_id, created_by) VALUES (?, ?, ?)',
        [user_id, saas_cust_id, request.user.id]
      );

      return { user_id, saas_cust_id };
    } finally {
      await connection.end();
    }
  }
}

module.exports = SaasCustUser;
