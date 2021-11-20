const express = require("express");
const {
  getInstructorList,
  addInstructor,
  getInstructor,
} = require("../../data/instructor");
const authRoutes = require('../middlewares/authRoutes')
const router = express.Router();

router.get("/", async (req, res) => {
    try{
        const result = await getInstructorList();
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
        const instructor_info = await getInstructor(id);
        res.json(instructor_info);
    } catch(err) {
        res.sendStatus(500);
        console.error(err);
    }
})
router.post('/', authRoutes("admin"), async (req, res) => {
    try{
        console.log(addStudent);
        const result = await addInstructor(req.body);
        res.json(result);
    }catch(err) {
        res.sendStatus(400).json(err);
        console.error(err);
    }
});

module.exports = router;
