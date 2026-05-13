const pool = require('../db/pool');

exports.addUser = async (data, password) => {
    const {rows} = await pool.query(`
            INSERT INTO users (first, last, username, password, isadmin)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *;
        `, [data.first, data.last, data.username, data.password, data.admin]);
    return rows[0];
}

exports.getUserByUsername = async (username) => {
    const {rows} = await pool.query(`
            SELECT * FROM users
            WHERE username = $1;
        `, [username])
    return rows[0];
}

exports.addToClub = async (id) => {
    await pool.query(`
            UPDATE users
            SET membership_status = 'member'
            WHERE id = $1;
        `, [id]);
}