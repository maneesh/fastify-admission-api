const mysql = require('mysql2/promise');
const config = require('../../config/config.js')['development'];

class SaasCustCourseFee {
  constructor(id, saas_cust_id, fee_type, amount, categery, updated_by, created_at, updated_at) {
    this.id = id;
    this.saas_cust_id = saas_cust_id;
    this.fee_type = fee_type;
    this.amount = amount;
    this.categery = categery;
    this.updated_by = updated_by;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  static async getAll() {
    const connection = await mysql.createConnection({
      host: config.host,
      user: config.username,
      password: config.password,
      database: config.database
    });
    try {
      const [rows] = await connection.execute('SELECT * FROM saas_cust_course_fee');
      return rows.map(row => new SaasCustCourseFee(row.id, row.saas_cust_id, row.fee_type, row.amount, row.categery, row.updated_by, row.created_at, row.updated_at));
    } finally {
      await connection.end();
    }
  }

  static async getById(id) {
    const connection = await mysql.createConnection({
      host: config.host,
      user: config.username,
      password: config.password,
      database: config.database
    });
    try {
      const [rows] = await connection.execute('SELECT * FROM saas_cust_course_fee WHERE id = ?', [id]);
      if (rows.length === 0) {
        return null;
      }
      const row = rows[0];
      return new SaasCustCourseFee(row.id, row.saas_cust_id, row.fee_type, row.amount, row.categery, row.updated_by, row.created_at, row.updated_at);
    } finally {
      await connection.end();
    }
  }

  static async create(saas_cust_id, fee_type, amount, categery, updated_by) {
    const connection = await mysql.createConnection({
      host: config.host,
      user: config.username,
      password: config.password,
      database: config.database
    });
    try {
      const [result] = await connection.execute('INSERT INTO saas_cust_course_fee (saas_cust_id, fee_type, amount, categery, updated_by) VALUES (?, ?, ?, ?, ?)', [saas_cust_id, fee_type, amount, categery, updated_by]);
      const id = result[0].insertId;
      return new SaasCustCourseFee(id, saas_cust_id, fee_type, amount, categery, updated_by);
    } finally {
      await connection.end();
    }
  }

  static async update(id, saas_cust_id, fee_type, amount, categery, updated_by) {
    const connection = await mysql.createConnection({
      host: config.host,
      user: config.username,
      password: config.password,
      database: config.database
    });
    try {
      await connection.execute('UPDATE saas_cust_course_fee SET saas_cust_id = ?, fee_type = ?, amount = ?, categery = ?, updated_by = ? WHERE id = ?', [saas_cust_id, fee_type, amount, categery, updated_by, id]);
      return new SaasCustCourseFee(id, saas_cust_id, fee_type, amount, categery, updated_by);
    } finally {
      await connection.end();
    }
  }

  static async delete(id) {
    const connection = await mysql.createConnection({
      host: config.host,
      user: config.username,
      password: config.password,
      database: config.database
    });
    try {
      await connection.execute('DELETE FROM saas_cust_course_fee WHERE id = ?', [id]);
    } finally {
      await connection.end();
    }
  }
}

module.exports = SaasCustCourseFee;