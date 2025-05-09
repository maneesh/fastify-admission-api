const mysql = require('mysql2/promise');
const fs = require('fs/promises');
const path = require('path');
const config = require('./postgrator-config');

async function migrate() {
  let connection;
  try {
    connection = await mysql.createConnection(config.connectionString);

    // Filter out undo files
    const migrationFiles = (await fs.readdir(path.resolve(__dirname, 'migrations')))
      .filter(file => file.endsWith('.sql') && !file.includes('.undo'))
      .sort();

    for (const file of migrationFiles) {
      const migrationName = path.basename(file, '.sql');
      console.log(`Running migration: ${file}`);
      const sql = await fs.readFile(path.resolve(__dirname, 'migrations', file), 'utf8');
      await connection.execute(sql);
      console.log(`Migration ${file} completed successfully`);
    }

  } catch (error) {
    console.error('Error running migrations:', error);
  } finally {
    if (connection) await connection.end();
  }
}

migrate();