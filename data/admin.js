const pool = require("./db");

async function getAdmin(name) {
  const data = await pool.query('SELECT * FROM "Admin" WHERE user_name = $1', [
    name,
  ]);
  return data.rows[0];
}

module.exports = {
    getAdmin
}
