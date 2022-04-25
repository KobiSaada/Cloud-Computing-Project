var mysql = require('mysql2');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "kobisaada054",
  database: "CallCenter"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected to MySqldb!");
  //con.query("DROP DATABASE CallCenter ")

        var sql = "CREATE TABLE customersData (name VARCHAR(255),id VARCHAR(255),Dateofbirth VARCHAR(255), address VARCHAR(255),gender VARCHAR(255),listOfProduct VARCHAR(255))";
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Table created");
  });
});
