const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'developer',
    database: 'todolist',
    multipleStatements: true
});

mysqlConnection.connect(function (err) {
    if (err) {
        console.error(err);
        return;
    } else {
        console.log('Conexion succesful');
    }
});

module.exports = mysqlConnection;
