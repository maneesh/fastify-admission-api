const mysql = require('mysql2/promise');
const config = require('../../postgrator-config');

class SaasCust {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }

  static async getAll() {
    const connection = await mysql.createConnection(config.connectionString);
    try {
      const [rows] = await connection.execute('SELECT * FROM saas_cust');
      return rows.map(row => new SaasCust(row.id, row.name));
    } finally {
      await connection.end();
    }
  }

  static async getById(id) {
    const connection = await mysql.createConnection(config.connectionString);
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

  static async create(name) {
    const connection = await mysql.createConnection(config.connectionString);
    try {
      const [result] = await connection.execute('INSERT INTO saas_cust (name) VALUES (?)', [name]);
      const id = result[0].insertId;
      return new SaasCust(id, name);
    } finally {
      await connection.end();
    }
  }

  static async update(id, name) {
    const connection = await mysql.createConnection(config.connectionString);
    try {
      await connection.execute('UPDATE saas_cust SET name = ? WHERE id = ?', [name, id]);
      return new SaasCust(id, name);
    } finally {
      await connection.end();
    }
  }

  static async delete(id) {
    const connection = await mysql.createConnection(config.connectionString);
    try {
      await connection.execute('DELETE FROM saas_cust WHERE id = ?', [id]);
    } finally {
      await connection.end();
    }
  }
}

module.exports = SaasCust;