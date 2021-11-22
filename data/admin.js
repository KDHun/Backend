const pool = require("./db");

async function getAdmin(name) {
  const data = await pool.query('SELECT * FROM "Admin" WHERE user_name = $1', [
    name,
  ]);
  return data.rows[0];
}
async function getAdminList() {
  const data = await pool.query('SELECT * FROM "Admin"');
  return data.rows;
}
async function addAdmin(data) {
  const {
    user_name,
    name,
    DOB,
    phon_number,
    email,
    address,
    gender,
    height,
    weight,
    health_condition,
    joining_date,
  } = data;
  try {
    const newAdmin = await pool.query(
      'INSERT INTO "Admin" VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *',
      [
        user_name,
        name,
        DOB,
        phon_number,
        email,
        address,
        gender,
        height,
        weight,
        health_condition,
        joining_date,
      ]
    );
    return newAdmin.rows[0];
  } catch (err) {
    throw err;
  }
}

module.exports = {
    getAdmin,
    getAdminList,
    addAdmin
}
