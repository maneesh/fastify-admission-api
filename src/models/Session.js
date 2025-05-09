const mysql = require('mysql2/promise');
const config = require('../../postgrator-config');

class Session {
  constructor(id, academic_year, admission_type, start, end) {
    this.id = id;
    this.academic_year = academic_year;
    this.admission_type = admission_type;
    this.start = start;
    this.end = end;
  }

  static async getAll() {
    const connection = await mysql.createConnection(config.connectionString);
    try {
      const [rows] = await connection.execute('SELECT * FROM session');
      return rows.map(row => new Session(row.id, row.academic_year, row.admission_type, row.start, row.end));
    } finally {
      await connection.end();
    }
  }

  static async getById(id) {
    const connection = await mysql.createConnection(config.connectionString);
    try {
      const [rows] = await connection.execute('SELECT * FROM session WHERE id = ?', [id]);
      if (rows.length === 0) {
        return null;
      }
      const row = rows[0];
      return new Session(row.id, row.academic_year, row.admission_type, row.start, row.end);
    } finally {
      await connection.end();
    }
  }

  static async create(academic_year, admission_type, start, end) {
    const connection = await mysql.createConnection(config.connectionString);
    try {
      const [result] = await connection.execute('INSERT INTO session (academic_year, admission_type, start, end) VALUES (?, ?, ?, ?)', [academic_year, admission_type, start, end]);
      const id = result[0].insertId;
      return new Session(id, academic_year, admission_type, start, end);
    } finally {
      await connection.end();
    }
  }

  static async update(id, academic_year, admission_type, start, end) {
    const connection = await mysql.createConnection(config.connectionString);
    try {
      await connection.execute('UPDATE session SET academic_year = ?, admission_type = ?, start = ?, end = ? WHERE id = ?', [academic_year, admission_type, start, end, id]);
      return new Session(id, academic_year, admission_type, start, end);
    } finally {
      await connection.end();
    }
  }

  static async delete(id) {
    const connection = await mysql.createConnection(config.connectionString);
    try {
      await connection.execute('DELETE FROM session WHERE id = ?', [id]);
    } finally {
      await connection.end();
    }
  }
}

module.exports = Session;