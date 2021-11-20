const express = require("express");
const {
  getClass,
  getClassList,
  addClass,
  getMyClassList,
  getClassMaterial,
  getClassQuiz,
  getClassAssignment,
  addAssignment,
  addQuiz,
  addMaterial,
} = require("../../data/class");
const authRoutes = require("../middlewares/authRoutes");
const router = express.Router();

router.get("/my", authRoutes("student"), async (req, res) => {
  try {
    const data = await getMyClassList(req.user.name);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});
router.post("/my/assignment", authRoutes("instructor"), async (req, res) => {
    try {
        const { class_id, assignment } = req.body;
        const result = await addAssignment(class_id, assignment);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.sendStatus(400);
    }
})
router.post("/my/material", authRoutes("instructor"), async (req, res) => {
    try {
        const { class_id, material } = req.body;
        const result = await addMaterial(class_id, material);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.sendStatus(400);
    }
})
router.post("/quiz", authRoutes("instructor"), async (req, res) => {
    try {
        const { quiz } = req.body;
        const result = await addAssignment(quiz);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.sendStatus(400);
    }
})
router.get("/my/:id", authRoutes("student"), async (req, res) => {
    try {
        const { id } = req.params;
        const data = await getClass(id);
        const material = await getClassMaterial(id);
        const assignment = await getClassAssignment(req.user.name, id);
        const quiz = await getClassQuiz(req.user.name, id);
        console.log(material);
        res.json({...data, material, assignment, quiz});
    } catch (error) {
       console.error(error); 
       res.sendStatus(500);
    }
})
router.get("/", async (req, res) => {
  try {
    const result = await getClassList();
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
    const cours_info = await getClass(id);
    res.json(cours_info);
  } catch (err) {
    res.sendStatus(500);
    console.error(err);
  }
});
router.post("/", authRoutes("admin"), async (req, res) => {
  try {
    console.log(addStudent);
    const result = await addClass(req.body);
  } catch (err) {
    res.sendStatus(400).json(err);
    console.error(err);
  }
});

module.exports = router;
