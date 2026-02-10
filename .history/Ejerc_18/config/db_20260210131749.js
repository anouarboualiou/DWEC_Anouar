const mysql = require('mysql2');

const pool = mysql.createPool({
  host: ,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: 'Bibliteca'
});

module.exports = pool.promise();