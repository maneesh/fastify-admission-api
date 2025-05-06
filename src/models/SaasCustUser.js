const connection = require('../db/connection');

class SaasCustUser {
  static async create({ saas_cust_id }) {
    const [result] = await connection.query(
        'INSERT INTO saas_cust_user (saas_cust_id) VALUES (?)',
        [saas_cust_id]
      );
      
    return { user_id: result.insertId, saas_cust_id };
  }
}

module.exports = SaasCustUser;
