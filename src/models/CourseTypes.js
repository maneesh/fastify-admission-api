const mysql = require('mysql2/promise');
const config = require('../../config/config.js')['development'];

class CourseTypes {
  constructor(id, name, short_name) {
    this.id = id;
    this.name = name;
    this.short_name = short_name;
  }

  static async getAll() {
    const connection = await mysql.createConnection({
      host: config.host,
      user: config.username,
      password: config.password,
      database: config.database
    });
    try {
      const [rows] = await connection.execute('SELECT * FROM course_types');
      return rows.map(row => new CourseTypes(row.id, row.name, row.short_name));
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
      const [rows] = await connection.execute('SELECT * FROM course_types WHERE id = ?', [id]);
      if (rows.length === 0) {
        return null;
      }
      const row = rows[0];
      return new CourseTypes(row.id, row.name, row.short_name);
    } finally {
      await connection.end();
    }
  }

  static async create(name, short_name, request) {
    const connection = await mysql.createConnection({
      host: config.host,
      user: config.username,
      password: config.password,
      database: config.database,
      multipleStatements: true
    });
    try {
      const [result] = await connection.execute('INSERT INTO course_types (name, short_name, created_by) VALUES (?, ?, ?); SELECT LAST_INSERT_ID();', [name, short_name, request.user.id]);
      const id = result[0].insertId;
      return new CourseTypes(id, name, short_name);
    } finally {
      await connection.end();
    }
  }

  static async update(id, name, short_name, request) {
    const connection = await mysql.createConnection({
      host: config.host,
      user: config.username,
      password: config.password,
      database: config.database
    });
    try {
      await connection.execute('UPDATE course_types SET name = ?, short_name = ?, updated_by = ? WHERE id = ?', [name, short_name, request.user.id, id]);
      return new CourseTypes(id, name, short_name);
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
      await connection.execute('DELETE FROM course_types WHERE id = ?', [id]);
    } finally {
      await connection.end();
    }
  }
}

module.exports = CourseTypes;