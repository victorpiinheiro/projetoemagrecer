const mysql = require('mysql2/promise');


const conn = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});




module.exports = conn;