const mysql = require('mysql2/promise');
const config = require('../../config/config.js')['development'];

class SaasStudentPaymentTransaction {
  constructor(id, register_student_id, start_date_time, gateway_transaction_id, status, amount, fee_id) {
    this.id = id;
    this.register_student_id = register_student_id;
    this.start_date_time = start_date_time;
    this.gateway_transaction_id = gateway_transaction_id;
    this.status = status;
    this.amount = amount;
    this.fee_id = fee_id;
  }

  static async getAll() {
    const connection = await mysql.createConnection({
      host: config.host,
      user: config.username,
      password: config.password,
      database: config.database
    });
    try {
      const [rows] = await connection.execute('SELECT * FROM saas_student_payment_transaction');
      return rows.map(row => new SaasStudentPaymentTransaction(row.id, row.register_student_id, row.start_date_time, row.gateway_transaction_id, row.status, row.amount, row.fee_id));
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
      const [rows] = await connection.execute('SELECT * FROM saas_student_payment_transaction WHERE id = ?', [id]);
      if (rows.length === 0) {
        return null;
      }
      const row = rows[0];
      return new SaasStudentPaymentTransaction(row.id, row.register_student_id, row.start_date_time, row.gateway_transaction_id, row.status, row.amount, row.fee_id);
    } finally {
      await connection.end();
    }
  }

  static async create(register_student_id, start_date_time, gateway_transaction_id, status, amount, fee_id) {
    const connection = await mysql.createConnection({
      host: config.host,
      user: config.username,
      password: config.password,
      database: config.database
    });
    try {
      const [result] = await connection.execute('INSERT INTO saas_student_payment_transaction (register_student_id, start_date_time, gateway_transaction_id, status, amount, fee_id) VALUES (?, ?, ?, ?, ?, ?)', [register_student_id, start_date_time, gateway_transaction_id, status, amount, fee_id]);
      const id = result[0].insertId;
      return new SaasStudentPaymentTransaction(id, register_student_id, start_date_time, gateway_transaction_id, status, amount, fee_id);
    } finally {
      await connection.end();
    }
  }

  static async update(id, register_student_id, start_date_time, gateway_transaction_id, status, amount, fee_id) {
    const connection = await mysql.createConnection({
      host: config.host,
      user: config.username,
      password: config.password,
      database: config.database
    });
    try {
      await connection.execute('UPDATE saas_student_payment_transaction SET register_student_id = ?, start_date_time = ?, gateway_transaction_id = ?, status = ?, amount = ?, fee_id = ? WHERE id = ?', [register_student_id, start_date_time, gateway_transaction_id, status, amount, fee_id, id]);
      return new SaasStudentPaymentTransaction(id, register_student_id, start_date_time, gateway_transaction_id, status, amount, fee_id);
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
      await connection.execute('DELETE FROM saas_student_payment_transaction WHERE id = ?', [id]);
    } finally {
      await connection.end();
    }
  }
}

module.exports = SaasStudentPaymentTransaction;