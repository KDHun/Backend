const express = require("express");
const {
  getAdmin,
} = require("../../data/admin");
const authRoutes = require('../middlewares/authRoutes');
const router = express.Router();

router.get("/:id", authRoutes("admin"),async (req, res) => {
    try{
        const {id} = req.params;
        const admin_info = await getAdmin(id);
        res.json(student_info);
    } catch(err) {
        res.sendStatus(500);
        console.error(err);
    }
})

module.exports = router;
