const mysql = require('mysql2/promise');
const config = require('../../config/config.js')['development'];

class SaasCust {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }

  static async getAll() {
    const connection = await mysql.createConnection({
      host: config.host,
      user: config.username,
      password: config.password,
      database: config.database
    });
    try {
      const [rows] = await connection.execute('SELECT * FROM saas_cust');
      return rows.map(row => new SaasCust(row.id, row.name));
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
      const [rows] = await connection.execute('SELECT * FROM saas_cust WHERE id = ?', [id]);
      if (rows.length === 0) {
        return null;
      }
      const row = rows[0];
      return new SaasCust(row.id, row.name);
    } finally {
      await connection.end();
    }
  }

  static async create(name, request) {
    const connection = await mysql.createConnection({
      host: config.host,
      user: config.username,
      password: config.password,
      database: config.database,
      multipleStatements: true
    });
    try {
      const [result] = await connection.execute('INSERT INTO saas_cust (name, created_by) VALUES (?, ?); SELECT LAST_INSERT_ID();', [name, request.user.id]);
      const id = result.insertId;
      return new SaasCust(id, name);
    } finally {
      await connection.end();
    }
  }

  static async update(id, name, request) {
    const connection = await mysql.createConnection({
      host: config.host,
      user: config.username,
      password: config.password,
      database: config.database
    });
    try {
      await connection.execute('UPDATE saas_cust SET name = ?, updated_by = ? WHERE id = ?', [name, request.user.id, id]);
      return new SaasCust(id, name);
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
      await connection.execute('DELETE FROM saas_cust WHERE id = ?', [id]);
    } finally {
      await connection.end();
    }
  }
}

module.exports = SaasCust;