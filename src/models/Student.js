const mysql = require('mysql2/promise');
const config = require('../../config/config.js')['development'];

class Student {
  constructor(id, cust_id, course_id, year_sem_id, register_session, full_name, email, mobile, date_of_birth, father_name, mother_name, registration_num) {
    this.id = id;
    this.cust_id = cust_id;
    this.course_id = course_id;
    this.year_sem_id = year_sem_id;
    this.register_session = register_session;
    this.full_name = full_name;
    this.email = email;
    this.mobile = mobile;
    this.date_of_birth = date_of_birth;
    this.father_name = father_name;
    this.mother_name = mother_name;
    this.registration_num = registration_num;
  }

  static async getAll() {
    const connection = await mysql.createConnection({
      host: config.host,
      user: config.username,
      password: config.password,
      database: config.database
    });
    try {
      const [rows] = await connection.execute('SELECT * FROM saas_student_register');
      return rows.map(row => new Student(
        row.id,
        row.cust_id,
        row.course_id,
        row.year_sem_id,
        row.register_session,
        row.full_name,
        row.email,
        row.mobile,
        row.date_of_birth,
        row.father_name,
        row.mother_name,
        row.registration_num
      ));
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
      return new Student(
        row.id,
        row.cust_id,
        row.course_id,
        row.year_sem_id,
        row.register_session,
        row.full_name,
        row.email,
        row.mobile,
        row.date_of_birth,
        row.father_name,
        row.mother_name,
        row.registration_num
      );
    } finally {
      await connection.end();
    }
  }
}

module.exports = Student;