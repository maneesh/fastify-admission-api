const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Admin@123',
  database: 'manage_admission'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database: ' + err.stack);
    return;
  }

  console.log('Connected to database as id ' + connection.threadId);
});

module.exports = connection.promise();