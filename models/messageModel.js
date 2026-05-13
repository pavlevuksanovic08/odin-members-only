const pool = require('../db/pool');

exports.addNewMessage = async (data) => {
    await pool.query(`
            INSERT INTO messages (title, message, userid)
            VALUES ($1, $2, $3);
        `, [data.title, data.message, data.userid])
}

exports.getAllMessages = async () => {
    const {rows} = await pool.query(`
            select title, message
            from messages;
        `)
    return rows;
}

exports.getAllMessagesWAuthor = async () => {
    const { rows } = await pool.query(`
            select m.id, title, message, datetime, username, isadmin, membership_status
            from messages m
            join users u
            on u.id = m.userid;
        `)
    return rows;
}

exports.deleteMessage = async (id) => {
    await pool.query(`
            delete from messages
            where id = $1;
        `, [id]);
}