const pool = require("./db");

async function getStudentList() {
  try {
    const data = await pool.query(
      'SELECT name, roll_number, "DOB", email FROM "Student"'
    );
    return data.rows;
  } catch (err) {
    throw err;
  }
}
async function getStudent(roll_number) {
  try {
    const data = await pool.query(
      'SELECT * FROM "Student" WHERE roll_number = $1;',
      [Number(roll_number)]
    );
    const spi = await pool.query(
      'SELECT semester, value FROM "SPI" WHERE roll_number = $1',
      [Number(roll_number)]
    );
    if(data.rows.length >= 1)
      data.rows[0].spi = spi.rows;
    return data.rows[0];
  } catch (err) {
    throw err;
  }
}
async function addStudent(data) {
  const {
    roll_number,
    name,
    DOB,
    phon_number,
    email,
    address,
    gender,
    CPI,
    height,
    weight,
    health_condition,
    batch,
    joining_date,
  } = data;
  try {
    const newStudent = await pool.query(
      'INSERT INTO "Student" VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *',
      [
        roll_number,
        name,
        DOB,
        phon_number,
        email,
        address,
        gender,
        CPI,
        height,
        weight,
        health_condition,
        batch,
        joining_date,
      ]
    );
    return newStudent.rows[0];
  } catch (err) {
    throw err;
  }
}
module.exports = {
  getStudentList,
  addStudent,
  getStudent,
};
