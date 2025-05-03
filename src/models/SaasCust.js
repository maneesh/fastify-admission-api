const connection = require('../db/connection');

class SaasCust {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }

  static async getAll() {
    const [rows] = await connection.query('SELECT * FROM saas_cust');
    return rows.map(row => new SaasCust(row.id, row.name));
  }

  static async getById(id) {
    const [rows] = await connection.query('SELECT * FROM saas_cust WHERE id = ?', [id]);
    if (rows.length === 0) {
      return null;
    }
    const row = rows[0];
    return new SaasCust(row.id, row.name);
  }

  static async create(name) {
    const [result] = await connection.query('INSERT INTO saas_cust (name) VALUES (?)', [name]);
    const id = result.insertId;
    return new SaasCust(id, name);
  }

  static async update(id, name) {
    await connection.query('UPDATE saas_cust SET name = ? WHERE id = ?', [name, id]);
    return new SaasCust(id, name);
  }

  static async delete(id) {
    await connection.query('DELETE FROM saas_cust WHERE id = ?', [id]);
  }
}

module.exports = SaasCust;