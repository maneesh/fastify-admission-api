const mysql = require("mysql2/promise");
const config = require("../../config/config.js")["development"];

class CourseSession {
  constructor(id, saas_cust_course_id, session_id, enabled_yr_sem) {
    this.id = id;
    this.saas_cust_course_id = saas_cust_course_id;
    this.session_id = session_id;
    this.enabled_yr_sem = enabled_yr_sem;
  }

  static async getAll() {
    const connection = await mysql.createConnection({
      host: config.host,
      user: config.username,
      password: config.password,
      database: config.database,
    });

    try {
      const [rows] = await connection.execute(`
        SELECT 
          sccs.id,
          sccs.saas_cust_course_id,
          sccs.session_id,
          sccs.enabled_yr_sem,
          sess.academic_year,
          c.course_name
        FROM saas_cust_course_session sccs
        JOIN session sess ON sccs.session_id = sess.id
        JOIN saas_cust_course scc ON sccs.saas_cust_course_id = scc.id
        JOIN courses c ON scc.course_id = c.id
      `);

      return rows.map((row) => ({
        id: row.id,
        saas_cust_course_id: row.saas_cust_course_id,
        session_id: row.session_id,
        enabled_yr_sem: row.enabled_yr_sem,
        academic_year: row.academic_year,
        course_name: row.course_name,
      }));
    } finally {
      await connection.end();
    }
  }
  static async create(
    saas_cust_course_id,
    session_id,
    enabled_yr_sem,
    request
  ) {
    const connection = await mysql.createConnection({
      host: config.host,
      user: config.username,
      password: config.password,
      database: config.database,
      multipleStatements: true,
    });
  
    try {
      const created_by = request?.user?.user_id; 
  
      const [result] = await connection.execute(
        `INSERT INTO saas_cust_course_session 
          (saas_cust_course_id, session_id, enabled_yr_sem, created_by) 
         VALUES (?, ?, ?, ?)`,
        [saas_cust_course_id, session_id, enabled_yr_sem, created_by]
      );
  
      const id = result?.insertId;
  
      return new CourseSession(
        id,
        saas_cust_course_id,
        session_id,
        enabled_yr_sem
      );
    } finally {
      await connection.end();
    }
  }

  static async update(id, saas_cust_course_id, session_id, enabled_yr_sem, request) {
    const connection = await mysql.createConnection({
      host: config.host,
      user: config.username,
      password: config.password,
      database: config.database
    });
  
    try {
      const updated_by = request?.user?.user_id;
  
      await connection.execute(
        `UPDATE saas_cust_course_session 
         SET saas_cust_course_id = ?, session_id = ?, enabled_yr_sem = ?, updated_by = ?
         WHERE id = ?`,
        [saas_cust_course_id, session_id, enabled_yr_sem, updated_by, id]
      );
  
      return {
        id,
        saas_cust_course_id,
        session_id,
        enabled_yr_sem
      };
    } finally {
      await connection.end();
    }
  }
  
}

module.exports = CourseSession;
