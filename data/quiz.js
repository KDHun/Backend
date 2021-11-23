const pool = require("./db");

async function getQuizList() {
  try {
    const data = await pool.query(
      'SELECT * FROM "Quiz"'
    );
    return data.rows;
  } catch (err) {
    throw err;
  }
}
async function getQuiz(quiz_id) {
  try {
    const data = await pool.query(
      'SELECT * FROM "Quiz" WHERE quiz_id = $1;',
      [quiz_id]
    );
    return data.rows[0];
  } catch (err) {
    throw err;
  }
}

async function addQuiz(data) {
  const {quiz_id,start_time,end_time,duration,deadline,plateform,link,total_mark,description,date } = data;
  try {
    const newQuiz = await pool.query(
      'INSERT INTO "Quiz" VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [quiz_id,start_time,end_time,duration,deadline,plateform,link,total_mark,description,date ]
    );
    return newQuiz.rows[0];
  } catch (err) {
    throw err;
  }
}
module.exports = {
  getQuizList,
  addQuiz,
  getQuiz
};
