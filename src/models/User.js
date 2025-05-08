const bcrypt = require('bcryptjs');
const connection = require('../db/connection'); 
const { Sequelize } = require('sequelize');

class User {
  constructor(id, full_name, email, password, mobile, role_id) {
    this.id = id;
    this.full_name = full_name;
    this.email = email;
    this.password = password;
    this.mobile = mobile;
    this.role_id = role_id;
  }

  static async getAll() {
    try {
      const [rows] = await connection.query('SELECT * FROM user');
      return rows.map(
        (row) =>
          new User(
            row.id,
            row.full_name,
            row.email,
            row.password,
            row.mobile,
            row.role_id
          )
      );
    } catch (err) {
      console.error('Error fetching users:', err.message);
      throw err;
    }
  }

  static async findByEmail(email) {
    try {
      const rows = await connection.query(
        'SELECT * FROM user WHERE email = ?',
        {
          replacements: [email],
          type: Sequelize.QueryTypes.SELECT,
        }
      );
      if (rows.length === 0) return null;

      const row = rows[0];
      return new User(
        row.id,
        row.full_name,
        row.email,
        row.password,
        row.mobile,
        row.role_id
      );
    } catch (err) {
      console.error('Error finding user by email:', err.message);
      throw err;
    }
  }

  static async create({ full_name, email, password, mobile, role_id }) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const query = `
        INSERT INTO user (full_name, email, password, mobile, role_id, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
      `;
      const values = [full_name, email, hashedPassword, mobile, role_id];
  
      // Execute the query
      const [insertId] = await connection.query(query, { replacements: values });
  
      // Debugging log
      console.log("Insert ID (from MySQL):", insertId);
  
      // If insertId is a number, use it directly
      if (typeof insertId !== "number") {
        throw new Error("User creation failed");
      }
  
      return {
        id: insertId,
        full_name,
        email,
        mobile,
        role_id,
      };
    } catch (err) {
      console.error("Error creating user:", err.message);
      throw err;
    }
  }
  
  
  
}

module.exports = User;
