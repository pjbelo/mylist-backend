const mysql = require("mysql2");

module.exports = {
  con: mysql.createConnection({
    host: "localhost",
    user: "mylist",
    password: process.env.DBPASS,
    database: "mylist",
  }),
};
