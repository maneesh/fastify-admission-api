const connection = require('../db/connection');

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
    const [rows] = await connection.query('SELECT * FROM saas_student_payment_transaction');
    return rows.map(row => new SaasStudentPaymentTransaction(row.id, row.register_student_id, row.start_date_time, row.gateway_transaction_id, row.status, row.amount, row.fee_id));
  }

  static async getById(id) {
    const [rows] = await connection.query('SELECT * FROM saas_student_payment_transaction WHERE id = ?', [id]);
    if (rows.length === 0) {
      return null;
    }
    const row = rows[0];
    return new SaasStudentPaymentTransaction(row.id, row.register_student_id, row.start_date_time, row.gateway_transaction_id, row.status, row.amount, row.fee_id);
  }

  static async create(register_student_id, start_date_time, gateway_transaction_id, status, amount, fee_id) {
    const [result] = await connection.query('INSERT INTO saas_student_payment_transaction (register_student_id, start_date_time, gateway_transaction_id, status, amount, fee_id) VALUES (?, ?, ?, ?, ?, ?)', [register_student_id, start_date_time, gateway_transaction_id, status, amount, fee_id]);
    const id = result.insertId;
    return new SaasStudentPaymentTransaction(id, register_student_id, start_date_time, gateway_transaction_id, status, amount, fee_id);
  }

  static async update(id, register_student_id, start_date_time, gateway_transaction_id, status, amount, fee_id) {
    await connection.query('UPDATE saas_student_payment_transaction SET register_student_id = ?, start_date_time = ?, gateway_transaction_id = ?, status = ?, amount = ?, fee_id = ? WHERE id = ?', [register_student_id, start_date_time, gateway_transaction_id, status, amount, fee_id, id]);
    return new SaasStudentPaymentTransaction(id, register_student_id, start_date_time, gateway_transaction_id, status, amount, fee_id);
  }

  static async delete(id) {
    await connection.query('DELETE FROM saas_student_payment_transaction WHERE id = ?', [id]);
  }
}

module.exports = SaasStudentPaymentTransaction;