const bcrypt = require('bcryptjs');
const connection = require('../db/connection');

class User {
  constructor(id, school_name, email, password, mobile, role_id) {
    this.id = id;
    this.school_name = school_name;
    this.email = email;
    this.password = password;
    this.mobile = mobile;
    this.role_id = role_id;
  }

  static async getAll() {
    const [rows] = await connection.query('SELECT * FROM user');
    return rows.map(row => new User(row.id, row.school_name, row.email, row.password, row.mobile, row.role_id));
  }

  static async create({ school_name, email, mobile }) {
    const existing = await this.findByEmail(email);
    if (existing) {
      throw new Error('Email already exists');
    }

    const defaultPassword = 'Ravi@555';
    const hashedPassword = await bcrypt.hash(defaultPassword, 10);
    const role_id = 1;

    const [result] = await connection.query(
      'INSERT INTO user (school_name, email, password, mobile, role_id) VALUES (?, ?, ?, ?, ?)',
      [school_name, email, hashedPassword, mobile, role_id]
    );

    return {
      id: result.insertId,
      school_name,
      email,
      mobile,
      role_id
      // Do NOT return the password here for security
    };
  }

  static async findByEmail(email) {
    const [rows] = await connection.query('SELECT * FROM user WHERE email = ?', [email]);
    if (rows.length === 0) return null;

    const row = rows[0];
    return new User(row.id, row.school_name, row.email, row.password, row.mobile, row.role_id);
  }
}

module.exports = User;
