const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'ejercicio18.cdkmmgm80owy.us-east-1.rds.amazonaws.com',
  user: 'admin',
  password: 'anouaranouar',
  database: 'ejercicio18'
});

module.exports = pool.promise();