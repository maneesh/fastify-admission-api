const xlsx = require('xlsx');
const mysql = require('mysql2/promise');
const config = require('../../config/config.js')['development'];
const { validateRow } = require('../utils/validators.js'); 

exports.createExcelUpload = async (req, reply) => {
  const cust_id = req?.user?.user_id;

  let connection;
  try {
    const file = await req.file();
    const buffer = await file.toBuffer();

    const workbook = xlsx.read(buffer, { type: 'buffer' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = xlsx.utils.sheet_to_json(sheet);

    if (!jsonData.length) {
      return reply.code(400).send({ success: false, message: 'Excel file is empty' });
    }

    // Validate all rows using external validator
    for (let [i, row] of jsonData.entries()) {
      const error = validateRow(row, i);
      if (error) {
        return reply.code(400).send({ success: false, message: error });
      }
    }

    // Get DB connection with correct user key
    connection = await mysql.createConnection({
      host: config.host,
      user: config.username,  
      password: config.password,
      database: config.database
    });

    // Check for duplicates in DB
    const registrationNos = jsonData.map(r => r.registration_no);
    const [existingRows] = await connection.execute(
      `SELECT registration_no FROM bed_registration WHERE registration_no IN (${registrationNos.map(() => '?').join(',')})`,
      registrationNos
    );

    if (existingRows.length > 0) {
      return reply.code(400).send({
        success: false,
        message: `Duplicate registration_no(s) found in DB: ${existingRows.map(r => r.registration_no).join(', ')}`,
      });
    }

    // Begin transaction
    await connection.beginTransaction();

    const insertQuery = 
      `INSERT INTO bed_registration 
      (registration_no, year, session_id, cust_id, full_name, fathers_name, dob, mobile, created_by, updated_by)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    for (let row of jsonData) {
      await connection.execute(insertQuery, [
        row.registration_no,
        parseInt(row.year, 10),    
        row.session_id,
        cust_id,
        row.full_name.trim(),
        row.fathers_name.trim(),
        row.dob,
        row.mobile.toString().trim(),
        cust_id,
        cust_id
      ]);
    }

    await connection.commit();
    return reply.send({ success: true, message: 'All records uploaded successfully' });

  } catch (err) {
    if (connection) await connection.rollback();
    return reply.code(500).send({ success: false, message: 'Upload failed', error: err.message });
  } finally {
    if (connection) await connection.end();
  }
};
