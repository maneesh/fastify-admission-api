const bcrypt = require('bcryptjs');
const mysql = require('mysql2/promise');
const config = require('../../config/config.js')['development'];

class User {
  constructor(id, fullname, email, password, mobile, role_id) {
    this.id = id;
    this.fullname = fullname;
    this.email = email;
    this.password = password;
    this.mobile = mobile;
    this.role_id = role_id;
  }

  static async getAll() {
    const connection = await mysql.createConnection({
      host: config.host,
      user: config.username,
      password: config.password,
      database: config.database
    });
    try {
      const [rows] = await connection.execute('SELECT * FROM user');
      return rows.map(row => new User(row.id, row.fullname, row.email, row.password, row.mobile, row.role_id));
    } finally {
      await connection.end();
    }
  }

  static async create({ fullname, email, password, mobile, role_id }, request) {
    let connection;
    try {
      connection = await mysql.createConnection({
        host: config.host,
        user: config.username,
        password: config.password,
        database: config.database,
        multipleStatements: true
      });
      const existing = await this.findByEmail(email);
      if (existing) {
        throw new Error('Email already exists');
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const [result] = await connection.execute(
        'INSERT INTO user (fullname, email, password, mobile, role_id, created_by) VALUES (?, ?, ?, ?, ?, ?); SELECT LAST_INSERT_ID();',
        [fullname, email, hashedPassword, mobile, role_id, request.user.id]
      );
      const myId = result[0].insertId;

      return {
       id: myId,
        fullname,
        email,
        mobile,
        role_id
      };
    } finally {
      if (connection) await connection.end();
    }
  }

  static async findById(id) {
  const connection = await mysql.createConnection({
    host: config.host,
    user: config.username,
    password: config.password,
    database: config.database
  });
  try {
    const [rows] = await connection.execute('SELECT * FROM user WHERE id = ?', [id]);
    if (rows.length === 0) return null;

    const row = rows[0];
    return new User(row.id, row.fullname, row.email, row.password, row.mobile, row.role_id);
  } finally {
    await connection.end();
  }
}

static async update({ id, fullname, email, mobile, password }, request) {
  let connection;
  try {
    connection = await mysql.createConnection({
      host: config.host,
      user: config.username,
      password: config.password,
      database: config.database,
    });

    let query = `UPDATE user SET fullname = ?, email = ?, mobile = ?`;
    let values = [fullname, email, mobile];

    if (password && password.trim() !== "") {
      const hashedPassword = await bcrypt.hash(password, 10);
      query += `, password = ?`;
      values.push(hashedPassword);
    }

    query += `, updated_by = ? WHERE id = ?`;
    values.push(request?.user?.user_id ?? 0, id);  

    await connection.execute(query, values);

    return {
      id,
      fullname,
      email,
      mobile,
      password
    };
  } finally {
    if (connection) await connection.end();
  }
}




  static async findByEmail(email) {
    const connection = await mysql.createConnection({
      host: config.host,
      user: config.username,
      password: config.password,
      database: config.database
    });
    try {
      const [rows] = await connection.execute('SELECT * FROM user WHERE email = ?', [email]);
      if (rows.length === 0) return null;

      const row = rows[0];
      return new User(row.id, row.fullname, row.email, row.password, row.mobile, row.role_id);
    } finally {
      await connection.end();
    }
  }
}

module.exports = User;
