const mysql = require('mysql2/promise');
const config = require('../../postgrator-config');

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
    const connection = await mysql.createConnection(config.connectionString);
    try {
      const [rows] = await connection.execute('SELECT * FROM saas_cust_course');
      return rows.map(row => new SaasCustCourse(row.id, row.saas_cust_id, row.course_id, row.course_display, row.year_sem_type, row.reg_enabled));
    } finally {
      await connection.end();
    }
  }

  static async getById(id) {
    const connection = await mysql.createConnection(config.connectionString);
    try {
      const [rows] = await connection.execute('SELECT * FROM saas_cust_course WHERE id = ?', [id]);
      if (rows.length === 0) {
        return null;
      }
      const row = rows[0];
      return new SaasCustCourse(row.id, row.saas_cust_id, row.course_id, row.course_display, row.year_sem_type, row.reg_enabled);
    } finally {
      await connection.end();
    }
  }

  static async create(saas_cust_id, course_id, course_display, year_sem_type, reg_enabled) {
    const connection = await mysql.createConnection(config.connectionString);
    try {
      const [result] = await connection.execute('INSERT INTO saas_cust_course (saas_cust_id, course_id, course_display, year_sem_type, reg_enabled) VALUES (?, ?, ?, ?, ?)', [saas_cust_id, course_id, course_display, year_sem_type, reg_enabled]);
      const id = result[0].insertId;
      return new SaasCustCourse(id, saas_cust_id, course_id, course_display, year_sem_type, reg_enabled);
    } finally {
      await connection.end();
    }
  }

  static async update(id, saas_cust_id, course_id, course_display, year_sem_type, reg_enabled) {
    const connection = await mysql.createConnection(config.connectionString);
    try {
      await connection.execute('UPDATE saas_cust_course SET saas_cust_id = ?, course_id = ?, course_display = ?, year_sem_type = ?, reg_enabled = ? WHERE id = ?', [saas_cust_id, course_id, course_display, year_sem_type, reg_enabled, id]);
      return new SaasCustCourse(id, saas_cust_id, course_id, course_display, year_sem_type, reg_enabled);
    } finally {
      await connection.end();
    }
  }

  static async delete(id) {
    const connection = await mysql.createConnection(config.connectionString);
    try {
      await connection.execute('DELETE FROM saas_cust_course WHERE id = ?', [id]);
    } finally {
      await connection.end();
    }
  }
}

module.exports = SaasCustCourse;