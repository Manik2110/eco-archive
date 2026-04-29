const fs = require('fs');
const mysql = require('mysql2/promise');
require('dotenv').config();

async function init() {
  const conn = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    multipleStatements: true,
  });
  const sql = fs.readFileSync(__dirname + '/database.sql', 'utf8');
  await conn.query(sql);
  console.log('Database initialized successfully.');
  await conn.end();
}

init().catch(err => { console.error(err); process.exit(1); });
