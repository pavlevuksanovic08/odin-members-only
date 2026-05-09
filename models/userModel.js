const pool = require('../db/pool');

exports.addUser = async (data, password) => {
    await pool.query(`
            INSERT INTO users (first, last, username, password)
            VALUES ($1, $2, $3, $4);
        `, [data.first, data.last, data.username, data.password]);
}

exports.getUserByUsername = async (username) => {
    const {rows} = await pool.query(`
            SELECT * FROM users
            WHERE username = $1;
        `, [username])
    return rows[0];
}