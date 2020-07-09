const mysql = require("mysql2");

module.exports = {
  con: mysql.createConnection({
    host: "zpfp07ebhm2zgmrm.chr7pe7iynqr.eu-west-1.rds.amazonaws.com",
    user: "p8x78gjar439uua1",
    password: process.env.DBPASS,
    database: "x9w2k8xsqk7zy02x",
  }),
};
