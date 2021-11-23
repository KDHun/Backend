const express = require("express");
const {
  getCourse,
  getCourseList,
  addCourse,
  getMyCourseList,
} = require("../../data/course");
const authRoutes = require("../middlewares/authRoutes");
const router = express.Router();

router.get("/my",  async (req, res) => {
  try {
    const data = await getMyCourseList(req.user.name);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

router.get("/", async (req, res) => {
  try {
    const result = await getCourseList();
    res.json(result);
  } catch (err) {
    res.sendStatus(500);
    console.error(err);
  }
});
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const cours_info = await getCourse(id);
    res.json(cours_info);
  } catch (err) {
    res.sendStatus(500);
    console.error(err);
  }
});
router.post("/", authRoutes("admin"), async (req, res) => {
  try {
<<<<<<< HEAD
    console.log(addquiz);
=======
>>>>>>> d45d2ab0df9cbb198f578cdad818145a219e03ad
    const result = await addCourse(req.body);
  } catch (err) {
    res.sendStatus(400);
    console.error(err);
  }
});

module.exports = router;
