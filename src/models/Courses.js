const mysql = require('mysql2/promise');
const config = require('../../config/config.js')['development'];

class Courses {
  constructor(id, course_type, course_name, years, semesters) {
    this.id = id;
    this.course_type = course_type;
    this.course_name = course_name;
    this.years = years;
    this.semesters = semesters;
  }

  static async getAll() {
    const connection = await mysql.createConnection({
      host: config.host,
      user: config.username,
      password: config.password,
      database: config.database
    });
  
    try {
      const [rows] = await connection.execute(`
        SELECT 
          c.id,
          ct.name AS course_type, -- replacing ID with name
          c.course_name,
          c.years,
          c.semesters
        FROM courses c
        JOIN course_types ct ON c.course_type = ct.id
      `);
  
      return rows.map(row => 
        new Courses(row.id, row.course_type, row.course_name, row.years, row.semesters)
      );
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
      const [rows] = await connection.execute('SELECT * FROM courses WHERE id = ?', [id]);
      if (rows.length === 0) {
        return null;
      }
      const row = rows[0];
      return new Courses(row.id, row.course_type, row.course_name, row.years, row.semesters);
    } finally {
      await connection.end();
    }
  }

  static async create(course_type, course_name, years, semesters) {
    const connection = await mysql.createConnection({
      host: config.host,
      user: config.username,
      password: config.password,
      database: config.database
    });
    try {
      const [result] = await connection.execute('INSERT INTO courses (course_type, course_name, years, semesters) VALUES (?, ?, ?, ?)', [course_type, course_name, years, semesters]);
      const id = result[0].insertId;
      return new Courses(id, course_type, course_name, years, semesters);
    } finally {
      await connection.end();
    }
  }

  static async update(id, course_type, course_name, years, semesters) {
    const connection = await mysql.createConnection({
      host: config.host,
      user: config.username,
      password: config.password,
      database: config.database
    });
    try {
      await connection.execute('UPDATE courses SET course_type = ?, course_name = ?, years = ?, semesters = ? WHERE id = ?', [course_type, course_name, years, semesters, id]);
      return new Courses(id, course_type, course_name, years, semesters);
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
      await connection.execute('DELETE FROM courses WHERE id = ?', [id]);
    } finally {
      await connection.end();
    }
  }
}

module.exports = Courses;