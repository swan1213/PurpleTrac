const mysql = require('mysql');
const config = require('./index');

// mysql connect
exports.con = mysql.createConnection({
    host: config.DB_HOSTNAME,
    user: config.DB_USERNAME,
    password: config.DB_PASSWORD,
    database: config.DB_DATABASE
});