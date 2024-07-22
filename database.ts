import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'jonel09077400897',
    database: 'taskmanagerdb'
});

export default pool;