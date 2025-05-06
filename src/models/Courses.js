const connection = require('../db/connection');

class Courses {
  constructor(id, course_type, course_name, years, semesters) {
    this.id = id;
    this.course_type = course_type;
    this.course_name = course_name;
    this.years = years;
    this.semesters = semesters;
  }

  static async getAll() {
    const [rows] = await connection.query('SELECT * FROM courses');
    return rows.map(row => new Courses(row.id, row.course_type, row.course_name, row.years, row.semesters));
  }

  static async getById(id) {
    const [rows] = await connection.query('SELECT * FROM courses WHERE id = ?', [id]);
    if (rows.length === 0) {
      return null;
    }
    const row = rows[0];
    return new Courses(row.id, row.course_type, row.course_name, row.years, row.semesters);
  }

  static async create(course_type, course_name, years, semesters) {
    const [result] = await connection.query('INSERT INTO courses (course_type, course_name, years, semesters) VALUES (?, ?, ?, ?)', [course_type, course_name, years, semesters]);
    const id = result.insertId;
    return new Courses(id, course_type, course_name, years, semesters);
  }

  static async update(id, course_type, course_name, years, semesters) {
    await connection.query('UPDATE courses SET course_type = ?, course_name = ?, years = ?, semesters = ? WHERE id = ?', [course_type, course_name, years, semesters, id]);
    return new Courses(id, course_type, course_name, years, semesters);
  }

  static async delete(id) {
    await connection.query('DELETE FROM courses WHERE id = ?', [id]);
  }
}

module.exports = Courses;