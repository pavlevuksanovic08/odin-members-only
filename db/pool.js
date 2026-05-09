const { Pool } = require('pg');

exports.module = new Pool({
    connectionString: process.env.CONNECTION_STRING
});