const express = require("express");
const {
  getStudent,
  getStudentList,
  addStudent,
} = require("../../data/student");
const authRoutes = require('../middlewares/authRoutes');
const router = express.Router();

router.get("/", async (req, res) => {
    try{
        const result = await getStudentList();
        res.json(result);
    } catch(err) {
        res.sendStatus(500);
        console.error(err);
    }
});
router.get("/:id", async (req, res) => {
    try{
        
        const {id} = req.params;
        console.log(id);
        const student_info = await getStudent(id);
        if(student_info)
        res.json(student_info);
        else
        res.sendStatus(404);
    } catch(err) {
        res.sendStatus(500);
        console.error(err);
    }
})
router.post('/', authRoutes("admin"), async (req, res) => {
    try{
        console.log(addStudent);
        const result = await addStudent(req.body);
    }catch(err) {
        res.sendStatus(400).json(err);
        console.error(err);
    }
});

module.exports = router;
