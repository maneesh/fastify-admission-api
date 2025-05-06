const connection = require('../db/connection');

class CourseTypes {
  constructor(id, name, short_name) {
    this.id = id;
    this.name = name;
    this.short_name = short_name;
  }

  static async getAll() {
    const [rows] = await connection.query('SELECT * FROM course_types');
    return rows.map(row => new CourseTypes(row.id, row.name, row.short_name));
  }

  static async getById(id) {
    const [rows] = await connection.query('SELECT * FROM course_types WHERE id = ?', [id]);
    if (rows.length === 0) {
      return null;
    }
    const row = rows[0];
    return new CourseTypes(row.id, row.name, row.short_name);
  }

  static async create(name, short_name) {
    const [result] = await connection.query('INSERT INTO course_types (name, short_name) VALUES (?, ?)', [name, short_name]);
    const id = result.insertId;
    return new CourseTypes(id, name, short_name);
  }

  static async update(id, name, short_name) {
    await connection.query('UPDATE course_types SET name = ?, short_name = ? WHERE id = ?', [name, short_name, id]);
    return new CourseTypes(id, name, short_name);
  }

  static async delete(id) {
    await connection.query('DELETE FROM course_types WHERE id = ?', [id]);
  }
}

module.exports = CourseTypes;