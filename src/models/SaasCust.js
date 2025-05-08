const connection = require('../db/connection');
const { Sequelize } = require('sequelize');
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

 // Corrected SaasCust.create() method
// Corrected SaasCust create method
static async create(name) {
  try {
    // Create a SaaS customer using Sequelize's `create`
    const saasCust = await connection.query(
      'INSERT INTO saas_cust (name, created_at, updated_at) VALUES (?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)', 
      {
        replacements: [name],
        type: Sequelize.QueryTypes.INSERT
      }
    );

    // Log the inserted data
    console.log('SaaS customer created successfully:', saasCust);
    return saasCust; // Return the result from the query
  } catch (error) {
    console.error('Error executing query:', error.message);
    throw error; // Ensure error is propagated
  }
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