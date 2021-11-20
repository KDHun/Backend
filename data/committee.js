const pool = require("./db");

async function getCommitteeList() {
  try {
    const data = await pool.query(
      'SELECT email, name, link, description FROM "Committee"'
    );
    return data.rows;
  } catch (err) {
    throw err;
  }
}
async function getCommittee(name) {
  try {
    const data = await pool.query(
      'SELECT * FROM "Committee" WHERE name = $1;',
      [name]
    );
    return data.rows[0];
  } catch (err) {
    throw err;
  }
}
async function getMyCommittee(roll_number) {
  try {
    const data = await pool.query(
      `SELECT name, email,role, joining_date, address, link
      FROM "Participate" JOIN "Committee"
      ON "Participate".committee_name = "Committee".name
      WHERE roll_number = $1`,
      [Number(roll_number)]
    );
    return data.rows;
  } catch (err) {
    throw err;
  }
}
async function addCommittee(data) {
  const { name, email, address, link, description, start_date } = data;
  try {
    const newStudent = await pool.query(
      'INSERT INTO "Course" VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [name, email, address, link, description, start_date ]
    );
    return newStudent.rows[0];
  } catch (err) {
    throw err;
  }
}
module.exports = {
  getCommitteeList,
  addCommittee,
  getCommittee,
  getMyCommittee
};
