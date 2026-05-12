const pool = require('../db/pool');

exports.addNewMessage = async (data) => {
    await pool.query(`
            INSERT INTO messages (title, message, userid)
            VALUES ($1, $2, $3);
        `, [data.title, data.message, data.userid])
}