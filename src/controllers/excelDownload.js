import path, { dirname } from "path";
import { fileURLToPath } from "url";
import ExcelJS from "exceljs";
import mysql from "mysql2/promise";
import config from "../../config/config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const excelDownloadRoute = async (request, reply) => {
  let connection;

  try {
    const cust_id = request?.user?.user_id;

    // DB connection
    connection = await mysql.createConnection({
      host: config.development.host,
      user: config.development.username,
      password: config.development.password,
      database: config.development.database,
    });

    const [rows] = await connection.execute(
      `SELECT registration_no, year, full_name, fathers_name, dob, mobile 
       FROM bed_registration WHERE cust_id = ?`,
      [cust_id]
    );

    if (!rows.length) {
      return reply.code(404).send({ message: "No data found for this customer." });
    }

    const templatePath = path.resolve(__dirname, "../../excelTemplate/excelTemplate.xlsx");
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(templatePath);
    const worksheet = workbook.getWorksheet(1);

    rows.forEach((row, index) => {
      const excelRowIndex = index + 2; 
      const excelRow = worksheet.getRow(excelRowIndex);

      excelRow.getCell(1).value = row.registration_no;
      excelRow.getCell(2).value = row.year;
      excelRow.getCell(3).value = row.full_name;
      excelRow.getCell(4).value = row.fathers_name;
      excelRow.getCell(5).value = row.dob ? new Date(row.dob) : null;
      excelRow.getCell(5).numFmt = "dd/mm/yyyy";
      excelRow.getCell(6).value = row.mobile;

      excelRow.commit();
    });

    // Set response headers for download
    reply
      .header("Content-Disposition", 'attachment; filename="filled_template.xlsx"')
      .type(
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );

    await workbook.xlsx.write(reply.raw);

    reply.raw.end();

  } catch (error) {
    console.error("Download error:", error.message);
    if (!reply.raw.headersSent) {
      return reply.code(500).send({ message: "Internal server error" });
    }
  } finally {
    if (connection) await connection.end();
  }
};
