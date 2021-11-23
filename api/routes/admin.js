const express = require("express");
const {
    getAdmin,
    getAdminList,
    addAdmin
} = require("../../data/admin");
const authRoutes = require('../middlewares/authRoutes')
const router = express.Router();
router.get("/", authRoutes("admin"), async (req, res) => {
    try{
        const result = await getAdminList();
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
        const admin_info = await getAdmin(id);
        if(admin_info)
            res.json(admin_info);
        else
        res.sendStatus(404);
    } catch(err) {
        res.sendStatus(500);
        console.error(err);
    }
});
router.post('/', authRoutes("admin"), async (req, res) => {
    try{
        console.log(addAdmin);
        const result = await addAdmin(req.body);
        res.json(result);
    }catch(err) {
        res.sendStatus(400).json(err);
        console.error(err);
    }
});

module.exports = router;
