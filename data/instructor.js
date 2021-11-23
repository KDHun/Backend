const pool = require("./db");

async function getInstructorList() {
  try {
    const data = await pool.query(
      'SELECT name, id, "DOB", email FROM "Instructor"'
    );
    return data.rows;
  } catch (err) {
    throw err;
  }
}
async function getInstructor(id) {
  try {
    const data = await pool.query('SELECT * FROM "Instructor" WHERE id = $1;', [
      Number(id),
    ]);
    return data.rows[0];
  } catch (err) {
    throw err;
  }
}
async function addInstructor(data) {
  const {
    id,
    name,
    DOB,
    phone_number,
    email,
    address,
    gender,
    height,
    weight,
    health_condition,
    joining_date,
  } = data;
  try {
    const newStudent = await pool.query(
      'INSERT INTO "Instructor" VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *',
      [
        id,
        name,
        DOB,
        phone_number,
        email,
        address,
        gender,
        height,
        weight,
        health_condition,
        joining_date,
      ]
    );
    return newStudent.rows[0];
  } catch (err) {
    throw err;
  }
}
module.exports = {
  getInstructorList,
  addInstructor,
  getInstructor,
};
