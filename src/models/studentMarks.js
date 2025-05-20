const mysql = require('mysql2/promise');
const config = require('../../config/config.js')['development'];

class StudentMark {
  constructor(
    id,
    standard,
    student_id,
    board_name,
    roll_no,
    passing_year,
    subject_name,
    max_marks,
    marks_obtained,
    percentage
  ) {
    this.id = id;
    this.standard = standard;
    this.student_id = student_id;
    this.board_name = board_name;
    this.roll_no = roll_no;
    this.passing_year = passing_year;
    this.subject_name = subject_name;
    this.max_marks = max_marks;
    this.marks_obtained = marks_obtained;
    this.percentage = percentage;
  }

  static async getAll(studentId) {
    const connection = await mysql.createConnection({
      host: config.host,
      user: config.username,
      password: config.password,
      database: config.database,
    });

    try {
      const [rows] = await connection.execute('SELECT * FROM student_mark WHERE student_id = ?',
        [studentId]
      );
      return rows.map(
        (row) =>
          new StudentMark(
            row.id,
            row.standard,
            row.student_id,
            row.board_name,
            row.roll_no,
            row.passing_year,
            row.subject_name,
            row.max_marks,
            row.marks_obtained,
            row.percentage
          )
      );
    } finally {
      await connection.end();
    }
  }

  static async getById(id) {
    const connection = await mysql.createConnection({
      host: config.host,
      user: config.username,
      password: config.password,
      database: config.database,
    });

    try {
      const [rows] = await connection.execute(
        'SELECT * FROM student_mark WHERE id = ?',
        [id]
      );
      if (rows.length === 0) {
        return null;
      }
      const row = rows[0];
      return new StudentMark(
        row.id,
        row.standard,
        row.student_id,
        row.board_name,
        row.roll_no,
        row.passing_year,
        row.subject_name,
        row.max_marks,
        row.marks_obtained,
        row.percentage
      );
    } finally {
      await connection.end();
    }
  }
}

module.exports = StudentMark;
