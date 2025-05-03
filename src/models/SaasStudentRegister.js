const connection = require('../db/connection');

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
    this.date_of_birth = date_of_birth;
    this.father_name = father_name;
    this.mother_name = mother_name;
    this.registration_num = registration_num;
  }

  static async getAll() {
    const [rows] = await connection.query('SELECT * FROM saas_student_register');
    return rows.map(row => new SaasStudentRegister(row.id, row.cust_id, row.course_id, row.year_sem_id, row.register_session, row.full_name, row.email, row.mobile, row.date_of_birth, row.father_name, row.mother_name, row.registration_num));
  }

  static async getById(id) {
    const [rows] = await connection.query('SELECT * FROM saas_student_register WHERE id = ?', [id]);
    if (rows.length === 0) {
      return null;
    }
    const row = rows[0];
    return new SaasStudentRegister(row.id, row.cust_id, row.course_id, row.year_sem_id, row.register_session, row.full_name, row.email, row.mobile, row.date_of_birth, row.father_name, row.mother_name, row.registration_num);
  }

    static async create(cust_id, course_id, year_sem_id, register_session, full_name, email, mobile, date_of_birth, father_name, mother_name, registration_num) {
    const [result] = await connection.query('INSERT INTO saas_student_register (cust_id, course_id, year_sem_id, register_session, full_name, email, mobile, date_of_birth, father_name, mother_name, registration_num) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [cust_id, course_id, year_sem_id, register_session, full_name, email, mobile, date_of_birth, father_name, mother_name, registration_num]);
    const id = result.insertId;
    return new SaasStudentRegister(id, cust_id, course_id, year_sem_id, register_session, full_name, email, mobile, date_of_birth, father_name, mother_name, registration_num);
  }

  static async update(id, cust_id, course_id, year_sem_id, register_session, full_name, email, mobile, date_of_birth, father_name, mother_name, registration_num) {
    await connection.query('UPDATE saas_student_register SET cust_id = ?, course_id = ?, year_sem_id = ?, register_session = ?, full_name = ?, email = ?, mobile = ?, date_of_birth = ?, father_name = ?, mother_name = ?, registration_num = ? WHERE id = ?', [cust_id, course_id, year_sem_id, register_session, full_name, email, mobile, date_of_birth, father_name, mother_name, registration_num, id]);
    return new SaasStudentRegister(id, cust_id, course_id, year_sem_id, register_session, full_name, email, mobile, date_of_birth, father_name, mother_name, registration_num);
  }

  static async delete(id) {
    await connection.query('DELETE FROM saas_student_register WHERE id = ?', [id]);
  }
}

module.exports = SaasStudentRegister;