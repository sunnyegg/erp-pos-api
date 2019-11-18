// Import
const mysql = require("mysql");

// Connect API to database
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});
connection.connect(err => {
  if (err) console.log(`Error: ${err}`);
  console.log("Connected to database!");
});

module.exports = connection;
