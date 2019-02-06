var mysql = require("mysql");
require("dotenv").config();

var connection;

if (process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
  connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: process.env.password,
    database: "notetaker_db"
  });
}

connection.connect(function(err) {
  if (err) {
    console.log("error connecting")
    console.log(err);
    return
  }
  console.log("Connected!")
})

module.exports = connection;