const connection = require('../db/connection');

class CourseTypeYrSem {
  constructor(id, yr_sem_type, yr_sem, display_name) {
    this.id = id;
    this.yr_sem_type = yr_sem_type;
    this.yr_sem = yr_sem;
    this.display_name = display_name;
  }

  static async getAll() {
    const [rows] = await connection.query('SELECT * FROM course_type_yr_sem');
    return rows.map(row => new CourseTypeYrSem(row.id, row.yr_sem_type, row.yr_sem, row.display_name));
  }

  static async getById(id) {
    const [rows] = await connection.query('SELECT * FROM course_type_yr_sem WHERE id = ?', [id]);
    if (rows.length === 0) {
      return null;
    }
    const row = rows[0];
    return new CourseTypeYrSem(row.id, row.yr_sem_type, row.yr_sem, row.display_name);
  }

  static async create(yr_sem_type, yr_sem, display_name) {
    const [result] = await connection.query('INSERT INTO course_type_yr_sem (yr_sem_type, yr_sem, display_name) VALUES (?, ?, ?)', [yr_sem_type, yr_sem, display_name]);
    const id = result.insertId;
    return new CourseTypeYrSem(id, yr_sem_type, yr_sem, display_name);
  }

  static async update(id, yr_sem_type, yr_sem, display_name) {
    await connection.query('UPDATE course_type_yr_sem SET yr_sem_type = ?, yr_sem = ?, display_name = ? WHERE id = ?', [yr_sem_type, yr_sem, display_name, id]);
    return new CourseTypeYrSem(id, yr_sem_type, yr_sem, display_name);
  }

  static async delete(id) {
    await connection.query('DELETE FROM course_type_yr_sem WHERE id = ?', [id]);
  }
}

module.exports = CourseTypeYrSem;