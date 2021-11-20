const pool = require("./db");

async function getCourseList() {
  try {
    const data = await pool.query(
      'SELECT course_code, name, credit, type, lab, lecture FROM "Course"'
    );
    return data.rows;
  } catch (err) {
    throw err;
  }
}
async function getCourse(course_code) {
  try {
    const data = await pool.query(
      'SELECT * FROM "Course" WHERE course_code = $1;',
      [course_code]
    );
    return data.rows[0];
  } catch (err) {
    throw err;
  }
}
async function getMyCourseList(roll_number) {
  try {
    const data = await pool.query(
      `SELECT "Enroll".course_code, grade, date, name, credit, type
      FROM "Enroll" JOIN "Course"
      ON "Enroll".course_code = "Course".course_code
      WHERE roll_number = $1`,
      [Number(roll_number)]
    );
    return data.rows;
  } catch (err) {
    throw err;
  }
}
async function addCourse(data) {
  const { course_code, name, credit, type, lab, lecture, description } = data;
  try {
    const newStudent = await pool.query(
      'INSERT INTO "Course" VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [course_code, name, credit, type, lab, lecture, description]
    );
    return newStudent.rows[0];
  } catch (err) {
    throw err;
  }
}
module.exports = {
  getCourseList,
  addCourse,
  getCourse,
  getMyCourseList
};
