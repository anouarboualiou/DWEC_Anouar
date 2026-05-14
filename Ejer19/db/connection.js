
const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: 'portfolio.c8clwpsat3yg.us-east-1.rds.amazonaws.com',
    user: 'admin',
    password: 'anouaranouar',
    database: 'portfolio'
})


connection.connect((err) => {
    if(err){
        console.error('Error de conexion', err);
        
    }
    else{
        console.log('MySql conectado con exito')
    }
})

module.exports = connection