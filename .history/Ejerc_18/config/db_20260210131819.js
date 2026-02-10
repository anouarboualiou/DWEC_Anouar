const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'biblioteca.c7fufjlhy1ke.us-east-1.rds.amazonaws.com',
  user: 'anouar',
  password: process.env.DB_PASS,
  database: 'Bibliteca'
});

module.exports = pool.promise();