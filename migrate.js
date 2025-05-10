// const mysql = require('mysql2/promise');
// const fs = require('fs/promises');
// const path = require('path');
// const config = require('./postgrator-config');

// async function migrate() {
//   let connection;
//   try {
//     connection = await mysql.createConnection(config.connectionString);

//     // Filter out undo files
//     const migrationFiles = (await fs.readdir(path.resolve(__dirname, 'migrations')))
//       .filter(file => file.endsWith('.sql') && !file.includes('.undo'))
//       .sort();
//       console.log('migfile',migrationFiles)

//     for (const file of migrationFiles) {
//       const migrationName = path.basename(file, '.sql');
//       console.log(`Running migration: ${file}`);
//       const sql = await fs.readFile(path.resolve(__dirname, 'migrations', file), 'utf8');
//       await connection.execute(sql);
//       console.log(`Migration ${file} completed successfully`);
//     }

//   } catch (error) {
//     console.error('Error running migrations:', error);
//   } finally {
//     if (connection) await connection.end();
//   }
// }

// migrate();

const mysql = require('mysql2/promise');
const fs = require('fs/promises');
const path = require('path');
const config = require('./config/config.js')['development'];

async function migrate() {
  let connection;
  try {
    connection = await mysql.createConnection({
      host: config.host,
      user: config.username,
      password: config.password,
      database: config.database
    });

    const migrationFiles = (await fs.readdir(path.resolve(__dirname, 'migrations')))
      .filter(file => file.endsWith('.sql') && !file.includes('.undo'))
      .sort();

    console.log('migfile', migrationFiles);

    for (const file of migrationFiles) {
      const filePath = path.resolve(__dirname, 'migrations', file);
      let sql = await fs.readFile(filePath, 'utf8');

      // Inject IF NOT EXISTS into CREATE TABLE statements
      sql = sql.replace(/CREATE\s+TABLE\s+(?!IF\s+NOT\s+EXISTS)/gi, 'CREATE TABLE IF NOT EXISTS ');

      console.log(`Running migration: ${file}`);
      await connection.query(sql);
      console.log(`Migration ${file} completed successfully`);
    }

  } catch (error) {
    console.error('Error running migrations:', error);
  } finally {
    if (connection) await connection.end();
  }
}

migrate();
