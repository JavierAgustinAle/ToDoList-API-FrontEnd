const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
    host: 'bszgp8zmp3dgdntvlyaz-mysql.services.clever-cloud.com',
    user: 'uclkjybhxl8cqxef',
    password: '9buhhgj6oZrZ2ShsnCoW',
    database: 'bszgp8zmp3dgdntvlyaz',
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
