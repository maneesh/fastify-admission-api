const mysql = require('mysql2/promise');
const { formatDateToDDMMYYYY } = require('../utils/index.js');
const config = require('../../config/config.js')['development'];

class SaasStudentRegister {
  constructor(id, cust_id, course_id, year_sem_id, register_session, full_name, email, mobile, date_of_birth, father_name, mother_name, registration_num) {
    this.id = id;
    this.cust_id = cust_id;
    this.course_id = course_id;
    this.year_sem_id = year_sem_id;
    this.register_session = register_session;
    this.full_name = full_name;
    this.email = email;
    this.mobile = mobile;
    this.date_of_birth = formatDateToDDMMYYYY(date_of_birth);
    this.father_name = father_name;
    this.mother_name = mother_name;
    this.registration_num = registration_num;
  }

  static async getAll(cust_id) {
    const connection = await mysql.createConnection({
      host: config.host,
      user: config.username,
      password: config.password,
      database: config.database
    });
    try {
      const [rows] = await connection.execute(
        'SELECT * FROM saas_student_register WHERE cust_id = ?',
        [cust_id]
      );      
      return rows.map(row => new SaasStudentRegister(row.id, row.cust_id, row.course_id, row.year_sem_id, row.register_session, row.full_name, row.email, row.mobile, row.date_of_birth, row.father_name, row.mother_name, row.registration_num));
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
      const [rows] = await connection.execute('SELECT * FROM saas_student_register WHERE id = ?', [id]);
      if (rows.length === 0) {
        return null;
      }
      const row = rows[0];
      return new SaasStudentRegister(row.id, row.cust_id, row.course_id, row.year_sem_id, row.register_session, row.full_name, row.email, row.mobile, row.date_of_birth, row.father_name, row.mother_name, row.registration_num);
    } finally {
      await connection.end();
    }
  }

    static async create(cust_id, course_id, year_sem_id, register_session, full_name, email, mobile, date_of_birth, father_name, mother_name, registration_num, request) {
    const connection = await mysql.createConnection({
      host: config.host,
      user: config.username,
      password: config.password,
      database: config.database,
      multipleStatements: true
    });
    try {
      const [result] = await connection.execute(
        'INSERT INTO saas_student_register (cust_id, course_id, year_sem_id, register_session, full_name, email, mobile, date_of_birth, father_name, mother_name, registration_num, created_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?); SELECT LAST_INSERT_ID();',
        [cust_id, course_id, year_sem_id, register_session, full_name, email, mobile, date_of_birth, father_name, mother_name, registration_num, request.user.id]
      );
      const id = result[0].insertId;
      return new SaasStudentRegister(id, cust_id, course_id, year_sem_id, register_session, full_name, email, mobile, date_of_birth, father_name, mother_name, registration_num);
    } finally {
      await connection.end();
    }
  }

  static async update(id, cust_id, course_id, year_sem_id, register_session, full_name, email, mobile, date_of_birth, father_name, mother_name, registration_num, request) {
    const connection = await mysql.createConnection({
      host: config.host,
      user: config.username,
      password: config.password,
      database: config.database
    });
    try {
      await connection.execute(
        'UPDATE saas_student_register SET cust_id = ?, course_id = ?, year_sem_id = ?, register_session = ?, full_name = ?, email = ?, mobile = ?, date_of_birth = ?, father_name = ?, mother_name = ?, registration_num = ?, updated_by = ? WHERE id = ?',
        [cust_id, course_id, year_sem_id, register_session, full_name, email, mobile, date_of_birth, father_name, mother_name, registration_num, request.user.id, id]
      );
    return new SaasStudentRegister(id, cust_id, course_id, year_sem_id, register_session, full_name, email, mobile, date_of_birth, father_name, mother_name, registration_num);
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
      await connection.execute('DELETE FROM saas_student_register WHERE id = ?', [id]);
    } finally {
      await connection.end();
    }
  }
}

module.exports = SaasStudentRegister;