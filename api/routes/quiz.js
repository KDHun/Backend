const express = require("express");
const {
  getQuiz,
  getQuizList,
  addQuiz
} = require("../../data/quiz");
const authRoutes = require("../middlewares/authRoutes");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await getQuizList();
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
    const cours_info = await getQuiz(id);
    res.json(cours_info);
  } catch (err) {
    res.sendStatus(500);
    console.error(err);
  }
});
router.post("/", authRoutes("instructor"), async (req, res) => {
  try {
    console.log(addQuiz);
    const result = await addQuiz(req.body);
  } catch (err) {
    res.sendStatus(400).json(err);
    console.error(err);
  }
});

module.exports = router;
