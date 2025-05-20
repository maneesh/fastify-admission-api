const mysql = require('mysql2/promise');
const config = require('../../config/config.js')['development'];

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
    const connection = await mysql.createConnection({
      host: config.host,
      user: config.username,
      password: config.password,
      database: config.database
    });
    try {
      const [rows] = await connection.execute('SELECT * FROM saas_cust_course');
      return rows.map(row => new SaasCustCourse(row.id, row.saas_cust_id, row.course_id, row.course_display, row.year_sem_type, row.reg_enabled));
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
  static async create(saas_cust_id, course_id, course_display, year_sem_type, reg_enabled, request) {
    const connection = await mysql.createConnection({
      host: config.host,
      user: config.username,
      password: config.password,
      database: config.database,
      multipleStatements: true
    });
  
    try {
      // Check if course_display already exists for the customer
      const [existing] = await connection.execute(`
        SELECT id FROM saas_cust_course WHERE saas_cust_id = ? AND course_display = ?
      `, [saas_cust_id, course_display]);
  
      if (existing.length > 0) {
        throw new Error('Course name already exists.');
      }
  
      const [result] = await connection.execute(`
        INSERT INTO saas_cust_course (saas_cust_id, course_id, course_display, year_sem_type, reg_enabled, created_by)
        VALUES (?, ?, ?, ?, ?, ?)`,
        [saas_cust_id, course_id, course_display, year_sem_type, reg_enabled, request?.user?.user_id]
      );
  
      const id = result?.insertId;
  
      const [rows] = await connection.execute(`
        SELECT 
          scc.id AS saas_cust_course_id,
          scc.course_id,
          c.course_name,
          ct.id AS course_type_id,
          ct.name AS course_type,
          scc.course_display,
          scc.year_sem_type,
          scc.reg_enabled
        FROM saas_cust_course scc
        JOIN courses c ON c.id = scc.course_id
        JOIN course_types ct ON ct.id = c.course_type
        WHERE scc.id = ?
      `, [id]);
  
      return rows[0];
    } finally {
      await connection.end();
    }
  }
  



  static async update(id, saas_cust_id, course_id, course_display, year_sem_type, request) {
    const connection = await mysql.createConnection({
      host: config.host,
      user: config.username,
      password: config.password,
      database: config.database
    });
  
    try {
      // Check for duplicate course_display (excluding current record)
      const [existing] = await connection.execute(`
        SELECT id FROM saas_cust_course 
        WHERE saas_cust_id = ? AND course_display = ? AND id != ?
      `, [saas_cust_id, course_display, id]);
  
      if (existing.length > 0) {
        throw new Error('Course name already exists.');
      }
  
      await connection.execute(
        `UPDATE saas_cust_course
         SET saas_cust_id = ?, course_id = ?, course_display = ?, year_sem_type = ?, updated_by = ?
         WHERE id = ?`,
        [saas_cust_id, course_id, course_display, year_sem_type, request?.user?.user_id, id]
      );
  
      return {
        id,
        saas_cust_id,
        course_id,
        course_display,
        year_sem_type,
      };
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
      await connection.execute('DELETE FROM saas_cust_course WHERE id = ?', [id]);
    } finally {
      await connection.end();
    }
  }
}

module.exports = SaasCustCourse;