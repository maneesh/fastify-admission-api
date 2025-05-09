const mysql = require('mysql2/promise');
const config = require('../../postgrator-config');

class CustDetails {
  constructor(id, cust_id, domain, api_key, active_session) {
    this.id = id;
    this.cust_id = cust_id;
    this.domain = domain;
    this.api_key = api_key;
    this.active_session = active_session;
  }

  static async getAll() {
    const connection = await mysql.createConnection(config.connectionString);
    try {
      const [rows] = await connection.execute('SELECT * FROM cust_details');
      return rows.map(row => new CustDetails(row.id, row.cust_id, row.domain, row.api_key, row.active_session));
    } finally {
      await connection.end();
    }
  }

  static async getById(id) {
    const connection = await mysql.createConnection(config.connectionString);
    try {
      const [rows] = await connection.execute('SELECT * FROM cust_details WHERE id = ?', [id]);
      if (rows.length === 0) {
        return null;
      }
      const row = rows[0];
      return new CustDetails(row.id, row.cust_id, row.domain, row.api_key, row.active_session);
    } finally {
      await connection.end();
    }
  }

  static async create(cust_id, domain, api_key, active_session) {
    const connection = await mysql.createConnection(config.connectionString);
    try {
      const [result] = await connection.execute('INSERT INTO cust_details (cust_id, domain, api_key, active_session) VALUES (?, ?, ?, ?)', [cust_id, domain, api_key, active_session]);
      const id = result[0].insertId;
      return new CustDetails(id, cust_id, domain, api_key, active_session);
    } finally {
      await connection.end();
    }
  }

  static async update(id, cust_id, domain, api_key, active_session) {
    const connection = await mysql.createConnection(config.connectionString);
    try {
      await connection.execute('UPDATE cust_details SET cust_id = ?, domain = ?, api_key = ?, active_session = ? WHERE id = ?', [cust_id, domain, api_key, active_session, id]);
      return new CustDetails(id, cust_id, domain, api_key, active_session);
    } finally {
      await connection.end();
    }
  }

  static async delete(id) {
    const connection = await mysql.createConnection(config.connectionString);
    try {
      await connection.execute('DELETE FROM cust_details WHERE id = ?', [id]);
    } finally {
      await connection.end();
    }
  }
}

module.exports = CustDetails;