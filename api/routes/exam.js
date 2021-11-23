const express = require("express");
const {
    getExamList,
  addExam,
  getExam,
  getMyExamList,
  getExaminfo
} = require("../../data/exam");
const authRoutes = require("../middlewares/authRoutes");
const router = express.Router();


router.get("/:id", async (req, res) => {
    try{
        
        const {id} = req.params;
        console.log(id);
        const exam_info = await getMyExamList(id);
        if(exam_info)
        res.json(exam_info);
        else
        res.sendStatus(404);
    } catch(err) {
        res.sendStatus(500);
        console.error(err);
    }
})
router.get('/',  async (req, res) => {
    try{
        const exam_info = await getExaminfo();
        if(exam_info)
        res.json(exam_info);
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
        const result = await addExam(req.body);
    }catch(err) {
        res.sendStatus(400).json(err);
        console.error(err);
    }
});

module.exports = router;