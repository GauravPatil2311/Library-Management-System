const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables from .env

// MySQL connection configuration
const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.DB_PORT
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to the database');
});

module.exports = connection;
