const connection = require('../db/connection');

class Session {
  constructor(id, academic_year, admission_type, start, end) {
    this.id = id;
    this.academic_year = academic_year;
    this.admission_type = admission_type;
    this.start = start;
    this.end = end;
  }

  static async getAll() {
    const [rows] = await connection.query('SELECT * FROM session');
    return rows.map(row => new Session(row.id, row.academic_year, row.admission_type, row.start, row.end));
  }

  static async getById(id) {
    const [rows] = await connection.query('SELECT * FROM session WHERE id = ?', [id]);
    if (rows.length === 0) {
      return null;
    }
    const row = rows[0];
    return new Session(row.id, row.academic_year, row.admission_type, row.start, row.end);
  }

  static async create(academic_year, admission_type, start, end) {
    const [result] = await connection.query('INSERT INTO session (academic_year, admission_type, start, end) VALUES (?, ?, ?, ?)', [academic_year, admission_type, start, end]);
    const id = result.insertId;
    return new Session(id, academic_year, admission_type, start, end);
  }

  static async update(id, academic_year, admission_type, start, end) {
    await connection.query('UPDATE session SET academic_year = ?, admission_type = ?, start = ?, end = ? WHERE id = ?', [academic_year, admission_type, start, end, id]);
    return new Session(id, academic_year, admission_type, start, end);
  }

  static async delete(id) {
    await connection.query('DELETE FROM session WHERE id = ?', [id]);
  }
}

module.exports = Session;