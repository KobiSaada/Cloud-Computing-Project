const mysql = require('mysql');

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "kobisaada054",
  database: "CallCenter"
});
connection.connect(err => {
  if (err) throw err;
  console.log('database is connected!');
});

module.exports = connection;

