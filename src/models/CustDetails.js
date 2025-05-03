const connection = require('../db/connection');

class CustDetails {
  constructor(id, cust_id, domain, api_key, active_session) {
    this.id = id;
    this.cust_id = cust_id;
    this.domain = domain;
    this.api_key = api_key;
    this.active_session = active_session;
  }

  static async getAll() {
    const [rows] = await connection.query('SELECT * FROM cust_details');
    return rows.map(row => new CustDetails(row.id, row.cust_id, row.domain, row.api_key, row.active_session));
  }

  static async getById(id) {
    const [rows] = await connection.query('SELECT * FROM cust_details WHERE id = ?', [id]);
    if (rows.length === 0) {
      return null;
    }
    const row = rows[0];
    return new CustDetails(row.id, row.cust_id, row.domain, row.api_key, row.active_session);
  }

  static async create(cust_id, domain, api_key, active_session) {
    const [result] = await connection.query('INSERT INTO cust_details (cust_id, domain, api_key, active_session) VALUES (?, ?, ?, ?)', [cust_id, domain, api_key, active_session]);
    const id = result.insertId;
    return new CustDetails(id, cust_id, domain, api_key, active_session);
  }

  static async update(id, cust_id, domain, api_key, active_session) {
    await connection.query('UPDATE cust_details SET cust_id = ?, domain = ?, api_key = ?, active_session = ? WHERE id = ?', [cust_id, domain, api_key, active_session, id]);
    return new CustDetails(id, cust_id, domain, api_key, active_session);
  }

  static async delete(id) {
    await connection.query('DELETE FROM cust_details WHERE id = ?', [id]);
  }
}

module.exports = CustDetails;