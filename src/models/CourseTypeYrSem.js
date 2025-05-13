const mysql = require('mysql2/promise');
const config = require('../../config/config.js')['development'];

class CourseTypeYrSem {
  constructor(id, yr_sem_type, yr_sem, display_name) {
    this.id = id;
    this.yr_sem_type = yr_sem_type;
    this.yr_sem = yr_sem;
    this.display_name = display_name;
  }

  static async getAll() {
    const connection = await mysql.createConnection({
      host: config.host,
      user: config.username,
      password: config.password,
      database: config.database
    });
    try {
      const [rows] = await connection.execute('SELECT * FROM course_type_yr_sem');
      return rows.map(row => new CourseTypeYrSem(row.id, row.yr_sem_type, row.yr_sem, row.display_name));
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
      const [rows] = await connection.execute('SELECT * FROM course_type_yr_sem WHERE id = ?', [id]);
      if (rows.length === 0) {
        return null;
      }
      const row = rows[0];
      return new CourseTypeYrSem(row.id, row.yr_sem_type, row.yr_sem, row.display_name);
    } finally {
      await connection.end();
    }
  }

  static async create(yr_sem_type, yr_sem, display_name, request) {
    const connection = await mysql.createConnection({
      host: config.host,
      user: config.username,
      password: config.password,
      database: config.database,
      multipleStatements: true
    });
    try {
      const [result] = await connection.execute('INSERT INTO course_type_yr_sem (yr_sem_type, yr_sem, display_name, created_by) VALUES (?, ?, ?, ?); SELECT LAST_INSERT_ID();', [yr_sem_type, yr_sem, display_name, request.user.id]);
      const id = result[0].insertId;
      return new CourseTypeYrSem(id, yr_sem_type, yr_sem, display_name);
    } finally {
      await connection.end();
    }
  }

  static async update(id, yr_sem_type, yr_sem, display_name, request) {
    const connection = await mysql.createConnection({
      host: config.host,
      user: config.username,
      password: config.password,
      database: config.database
    });
    try {
      await connection.execute('UPDATE course_type_yr_sem SET yr_sem_type = ?, yr_sem = ?, display_name = ?, updated_by = ? WHERE id = ?', [yr_sem_type, yr_sem, display_name, request.user.id, id]);
      return new CourseTypeYrSem(id, yr_sem_type, yr_sem, display_name);
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
      await connection.execute('DELETE FROM course_type_yr_sem WHERE id = ?', [id]);
    } finally {
      await connection.end();
    }
  }
}

module.exports = CourseTypeYrSem;