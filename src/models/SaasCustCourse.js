const connection = require('../db/connection');

class SaasCustCourse {
  constructor(id, saas_cust_id, course_id, course_display, year_sem_type, reg_enabled) {
    this.id = id;
    this.saas_cust_id = saas_cust_id;
    this.course_id = course_id;
    this.course_display = course_display;
    this.year_sem_type = year_sem_type;
    this.reg_enabled = reg_enabled;
  }

  static async getAll() {
    const [rows] = await connection.query('SELECT * FROM saas_cust_course');
    return rows.map(row => new SaasCustCourse(row.id, row.saas_cust_id, row.course_id, row.course_display, row.year_sem_type, row.reg_enabled));
  }

  static async getById(id) {
    const [rows] = await connection.query('SELECT * FROM saas_cust_course WHERE id = ?', [id]);
    if (rows.length === 0) {
      return null;
    }
    const row = rows[0];
    return new SaasCustCourse(row.id, row.saas_cust_id, row.course_id, row.course_display, row.year_sem_type, row.reg_enabled);
  }

  static async create(saas_cust_id, course_id, course_display, year_sem_type, reg_enabled) {
    const [result] = await connection.query('INSERT INTO saas_cust_course (saas_cust_id, course_id, course_display, year_sem_type, reg_enabled) VALUES (?, ?, ?, ?, ?)', [saas_cust_id, course_id, course_display, year_sem_type, reg_enabled]);
    const id = result.insertId;
    return new SaasCustCourse(id, saas_cust_id, course_id, course_display, year_sem_type, reg_enabled);
  }

  static async update(id, saas_cust_id, course_id, course_display, year_sem_type, reg_enabled) {
    await connection.query('UPDATE saas_cust_course SET saas_cust_id = ?, course_id = ?, course_display = ?, year_sem_type = ?, reg_enabled = ? WHERE id = ?', [saas_cust_id, course_id, course_display, year_sem_type, reg_enabled, id]);
    return new SaasCustCourse(id, saas_cust_id, course_id, course_display, year_sem_type, reg_enabled);
  }

  static async delete(id) {
    await connection.query('DELETE FROM saas_cust_course WHERE id = ?', [id]);
  }
}

module.exports = SaasCustCourse;