const express = require("express");
const checkAuth = require("../middlewares/authRoutes")
const {
  getCommitteeList,
  addCommittee,
  getCommittee,
  getMyCommittee
} = require("../../data/committee");
const authRoutes = require("../middlewares/authRoutes");
const router = express.Router();

router.get('/my',authRoutes('student'), async (req, res) => {
    try {
        const data = await getMyCommittee(req.user.name);
        res.json(data);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
})


router.get("/", async (req, res) => {
    try{
        const result = await getCommitteeList();
        res.json(result);
    } catch(err) {
        res.sendStatus(500);
        console.error(err);
    }
});
router.get("/:name", async (req, res) => {
    try{
        const { name } = req.params;
        const committee_info = await getCommittee(name);
        res.json(committee_info);
    } catch(err) {
        res.sendStatus(500);
        console.error(err);
    }
})
router.post('/', async (req, res) => {
    try{
        console.log(addStudent);
        const result = await addCommittee(req.body);
        res.json(result);
    }catch(err) {
        res.sendStatus(400);
        console.error(err);
    }
});
module.exports = router;
