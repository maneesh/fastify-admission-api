const mysql = require('mysql2/promise');
const config = require('../../config/config.js')['development'];

class StudentDetails {
  constructor(
    student_id,
    course_id,
    year_id,
    name,
    father_name,
    mother_name,
    mobile_number,
    dob,
    email,
    category,
    ews,
    nationality,
    religion,
    residence_type,
    parent_annual_income,
    permanent_address,
    pincode,
    country,
    state,
    district,
    aadhar_number,
    guardian_mobile_number,

  ) {
    this.student_id = student_id;
    this.course_id = course_id;
    this.year_id = year_id;
    this.name = name;
    this.father_name = father_name;
    this.mother_name = mother_name;
    this.mobile_number = mobile_number;
    this.dob = dob;
    this.email = email;
    this.category = category;
    this.ews = ews;
    this.nationality = nationality;
    this.religion = religion;
    this.residence_type = residence_type;
    this.parent_annual_income = parent_annual_income;
    this.permanent_address = permanent_address;
    this.pincode = pincode;
    this.country = country;
    this.state = state;
    this.district = district;
    this.aadhar_number = aadhar_number;
    this.guardian_mobile_number = guardian_mobile_number;
  }

  static async getAll(studentId) {
    const connection = await mysql.createConnection({
      host: config.host,
      user: config.username,
      password: config.password,
      database: config.database
    });

    try {
        const [rows] = await connection.execute(
            'SELECT * FROM saas_student_detail WHERE student_id = ?',
            [studentId]
        )
      return rows.map(row => new StudentDetails(
        row.student_id,
        row.course_id,
        row.year_id,
        row.name,
        row.father_name,
        row.mother_name,
        row.mobile_number,
        row.dob,
        row.email,
        row.category,
        row.ews,
        row.nationality,
        row.religion,
        row.residence_type,
        row.parent_annual_income,
        row.permanent_address,
        row.pincode,
        row.country,
        row.state,
        row.district,
        row.aadhar_number,
        row.guardian_mobile_number,
      ));
    } finally {
      await connection.end();
    }
  }

  static async create(student_id, course_id, year_id, name, father_name, mother_name, mobile_number, dob, email, category, ews, nationality, religion, residence_type, parent_annual_income, permanent_address, pincode, country, state, district, aadhar_number, guardian_mobile_number, request) {
    const connection = await mysql.createConnection({
      host: config.host,
      user: config.username,
      password: config.password,
      database: config.database,
      multipleStatements: true
    });
    try {
      const [result] = await connection.execute(
        'INSERT INTO saas_student_detail (student_id, course_id, year_id, name, father_name, mother_name, mobile_number, dob, email, category, ews, nationality, religion, residence_type, parent_annual_income, permanent_address, pincode, country, state, district, aadhar_number, guardian_mobile_number, created_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?); SELECT LAST_INSERT_ID();',
        [student_id, course_id, year_id, name, father_name, mother_name, mobile_number, dob, email, category, ews, nationality, religion, residence_type, parent_annual_income, permanent_address, pincode, country, state, district, aadhar_number, guardian_mobile_number, request.user.id]
      );
      const id = result[0].insertId;
      return new StudentDetails(student_id, course_id, year_id, name, father_name, mother_name, mobile_number, dob, email, category, ews, nationality, religion, residence_type, parent_annual_income, permanent_address, pincode, country, state, district, aadhar_number, guardian_mobile_number);
    } finally {
      await connection.end();
    }
  }

  static async update(student_id, course_id, year_id, name, father_name, mother_name, mobile_number, dob, email, category, ews, nationality, religion, residence_type, parent_annual_income, permanent_address, pincode, country, state, district, aadhar_number, guardian_mobile_number, request) {
    const connection = await mysql.createConnection({
      host: config.host,
      user: config.username,
      password: config.password,
      database: config.database
    });
    try {
      await connection.execute(
        'UPDATE saas_student_detail SET course_id = ?, year_id = ?, name = ?, father_name = ?, mother_name = ?, mobile_number = ?, dob = ?, email = ?, category = ?, ews = ?, nationality = ?, religion = ?, residence_type = ?, parent_annual_income = ?, permanent_address = ?, pincode = ?, country = ?, state = ?, district = ?, aadhar_number = ?, guardian_mobile_number = ?, updated_by = ? WHERE student_id = ?',
        [course_id, year_id, name, father_name, mother_name, mobile_number, dob, email, category, ews, nationality, religion, residence_type, parent_annual_income, permanent_address, pincode, country, state, district, aadhar_number, guardian_mobile_number, request.user.id, student_id]
      );
      return new StudentDetails(student_id, course_id, year_id, name, father_name, mother_name, mobile_number, dob, email, category, ews, nationality, religion, residence_type, parent_annual_income, permanent_address, pincode, country, state, district, aadhar_number, guardian_mobile_number);
    } finally {
      await connection.end();
    }
  }
}

module.exports = StudentDetails;
