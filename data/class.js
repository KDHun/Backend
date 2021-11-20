const pool = require("./db");

async function getClassList() {
  try {
    const data = await pool.query(
      'SELECT class_id, course_code, start_date, instructor_id FROM "Class"'
    );
    return data.rows;
  } catch (err) {
    throw err;
  }
}
async function getClass(class_id) {
  try {
    const data = await pool.query('SELECT * FROM "Class" WHERE class_id = $1;', [
      class_id,
    ]);
    return data.rows[0];
  } catch (err) {
    throw err;
  }
}
async function getClassQuiz(roll_number, class_id) {
  try {
    const data = await pool.query(
      `SELECT class_id, "Attempt".quiz_id, mark, time, total_mark, description, date
        from "Attempt" JOIN "Quiz"
        ON "Attempt".quiz_id = "Quiz".quiz_id
        WHERE (roll_number, class_id) = ($1, $2)`,
      [Number(roll_number), Number(class_id)]
    );
  } catch (err) {
    throw err;
  }
}
async function getClassAssignment(roll_number, class_id) {
    try {
        const data = await pool.query(
            `SELECT class_id, "Assign".assignment_id, mark, time, total_mark, description, date
            from "Assign" JOIN "Assignment"
            ON "Assign".assignment_id = "Assignment".assignment_id
            WHERE (roll_number, class_id) = ($1, $2);`,
        [Number(roll_number), Number(class_id)]
        )        
    } catch (error) {
       console.error(error); 
    }
}
async function getClassMaterial(class_id) {
    const data = await pool.query(
        `SELECT date, type, link, description
        FROM "Material" 
        WHERE class_id = $1`,
        [Number(class_id)]
    )
}
async function getMyClassList(roll_number) {
  try {
    const data = await pool.query(
      `SELECT "Study".class_id, course_code, start_date, instructor_id, description
      FROM "Class" JOIN "Study"
      ON "Class".class_id = "Study".class_id
      WHERE roll_number = $1;`,
      [Number(roll_number)]
    );
    return data.rows;
  } catch (err) {
    throw err;
  }
}
async function addClass(data) {
  const { class_id, course_code, start_date, instructor_id, description } =
    data;
  try {
    const newStudent = await pool.query(
      'INSERT INTO "Class" VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [class_id, course_code, start_date, instructor_id, description]
    );
    return newStudent.rows[0];
  } catch (err) {
    throw err;
  }
}
module.exports = {
  getClassList,
  addClass,
  getClass,
  getMyClassList,
  getClassMaterial,
  getClassQuiz,
  getClassAssignment
};

