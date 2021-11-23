const pool = require("./db");

async function getForumList() {
  try {
    const data = await pool.query(
      'SELECT * FROM "Forum"'
    );
    return data.rows;
  } catch (err) {
    throw err;
  }
}
async function getForum(question_id) {
  try {
    const data = await pool.query(
      'SELECT * FROM "Forum" WHERE question_id = $1;',
      [question_id]
    );
    return data.rows[0];
  } catch (err) {
    throw err;
  }
}

async function addForum(data) {
  const {question_id,question,time,date} = data;
  try {
    const newForum = await pool.query(
      'INSERT INTO "Forum" VALUES ($1, $2, $3, $4, ) RETURNING *',
      [question_id,question,time,date ]
    );
    return newForum.rows[0];
  } catch (err) {
    throw err;
  }
}
module.exports = {
  getForumList,
  addForum,
  getForum
};
