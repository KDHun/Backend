const pool = require("./db");

async function getExamList() {
  try {
    const data = await pool.query(
      'SELECT class_id, venue_id,roll_number, date, time, obtain_mark FROM "Exam"'
    );
    return data.rows;
  } catch (err) {
    throw err;
  }
}
async function getExam(class_id, venue_id,roll_number, date, time) {
  try {
    const data = await pool.query(
      'SELECT * FROM "Exam" WHERE class_id = $1 AND venue_id = $2 AND roll_number = $3 AND date = $4 AND time = $5',
      [class_id, venue_id,roll_number, date, time]
    );
    return data.rows[0];
  } catch (err) {
    throw err;
  }
}
async function getExaminfo() {
    try {
      const data = await pool.query(
        'SELECT * FROM "Exam"'
      );
      return data.rows;
    } catch (err) {
      throw err;
    }
  }
  
async function getMyExamList(roll_number) {
  try {
    const data = await pool.query(
      `SELECT * FROM "Exam" WHERE roll_number = $1`,
      [Number(roll_number)]
    );
    return data.rows;
  } catch (err) {
    throw err;
  }
}
async function addExam(data) {
  const { class_id, venue_id,roll_number, date, time, obtain_mark } = data;
  try {
    const newExam = await pool.query(
      'INSERT INTO "Exam" VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [class_id, venue_id,roll_number, date, time, obtain_mark]
    );
    return newExam.rows[0];
  } catch (err) {
    throw err;
  }
}
module.exports = {
  getExamList,
  addExam,
  getExam,
  getMyExamList,
  getExaminfo
};
