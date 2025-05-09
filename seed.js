const mysql = require('mysql2/promise');
const fs = require('fs/promises');
const path = require('path');
const config = require('./postgrator-config');

async function seed() {
  let connection;
  try {
    connection = await mysql.createConnection(config.connectionString);

    const seederFiles = (await fs.readdir(path.resolve(__dirname, 'seeders')))
      .filter(file => file.endsWith('.sql'))
      .sort();

    for (const file of seederFiles) {
      const seederName = path.basename(file, '.sql');
      console.log(`Running seeder: ${file}`);
      const sql = await fs.readFile(path.resolve(__dirname, 'seeders', file), 'utf8');
      await connection.execute(sql);
      console.log(`Seeder ${file} completed successfully`);
    }

  } catch (error) {
    console.error('Error running seeders:', error);
  } finally {
    if (connection) await connection.end();
  }
}

seed();