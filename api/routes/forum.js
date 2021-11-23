const express = require("express");
const {
  getForum,
  getForumList,
  addForum
} = require("../../data/forum");
const authRoutes = require("../middlewares/authRoutes");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await getForumList();
    res.json(result);
  } catch (err) {
    res.sendStatus(500);
    console.error(err);
  }
});
router.get("/:id", async (req, res) => {
  try {
    const {id } = req.params;
    console.log(id);
    const forum_info = await getForum(id);
    res.json(forum_info);
  } catch (err) {
    res.sendStatus(500);
    console.error(err);
  }
});
router.post("/", authRoutes("student"), async (req, res) => {
  try {
    console.log(addForum);
    const result = await addForum(req.body);
  } catch (err) {
    res.sendStatus(400).json(err);
    console.error(err);
  }
});

module.exports = router;
