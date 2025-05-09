const bcrypt = require('bcryptjs');
const mysql = require('mysql2/promise');
const config = require('../../postgrator-config');

class User {
  constructor(id, fullname, email, password, mobile, role_id) {
    this.id = id;
    this.fullname = fullname;
    this.email = email;
    this.password = password;
    this.mobile = mobile;
    this.role_id = role_id;
  }

  static async getAll() {
    const connection = await mysql.createConnection(config.connectionString);
    try {
      const [rows] = await connection.execute('SELECT * FROM user');
      return rows.map(row => new User(row.id, row.fullname, row.email, row.password, row.mobile, row.role_id));
    } finally {
      await connection.end();
    }
  }

  static async create({ fullname, email, mobile }) {
    let connection;
    try {
      connection = await mysql.createConnection(config.connectionString);
      const existing = await this.findByEmail(email);
      if (existing) {
        throw new Error('Email already exists');
      }

      const defaultPassword = 'Ravi@555';
      const hashedPassword = await bcrypt.hash(defaultPassword, 10);
      const role_id = 1;

      const [result] = await connection.execute(
        'INSERT INTO user (fullname, email, password, mobile, role_id) VALUES (?, ?, ?, ?, ?)',
        [fullname, email, hashedPassword, mobile, role_id]
      );

      return {
        id: result[0].insertId,
        fullname,
        email,
        mobile,
        role_id
        // Do NOT return the password here for security
      };
    } finally {
      if (connection) await connection.end();
    }
  }

  static async findByEmail(email) {
    const connection = await mysql.createConnection(config.connectionString);
    try {
      const [rows] = await connection.execute('SELECT * FROM user WHERE email = ?', [email]);
      if (rows.length === 0) return null;

      const row = rows[0];
      return new User(row.id, row.fullname, row.email, row.password, row.mobile, row.role_id);
    } finally {
      await connection.end();
    }
  }
}

module.exports = User;
