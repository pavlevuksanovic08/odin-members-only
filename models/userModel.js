const pool = require('../db/pool');

exports.addUser = async (data, password) => {
    await pool.query(`
            INSERT INTO users (first, last, username, password)
            VALUES ($1, $2, $3, $4);
        `, [data.first, data.last, data.username, data.password]);
}