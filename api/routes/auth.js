const router = require("express").Router();
const { getStudent } = require("../../data/student");
const { getInstructor } = require("../../data/instructor");
const { getAdmin } = require("../../data/admin");
const jwt = require('jsonwebtoken');

router.post("/login", async (req, res) => {
  const { name, phone_number } = req.body;
  if (!isNaN(Number(name))) {
    const studentData = await getStudent(name); 
    const instructorData = await getInstructor(name);
    console.log(studentData);
    const pwd = studentData?.phone_number;
    const pwd1 = instructorData?.phone_number;
    console.log(pwd,pwd1,phone_number);
    if (pwd === phone_number) {
      res.status(200).json({
        message: "You are authenticated",
        token: jwt.sign({
          name,
          role: 'student'
        }, process.env.SECRET)
      });
    } else if (pwd1 === phone_number) {
      res.status(200).json({
        message: "You are authenticated",
        token: jwt.sign({
          name,
          role: 'instructor'
        }, process.env.SECRET)
      });
    } else {
      res.sendStatus(401);
    }
  } else {
    const adminData = await getAdmin(name);
    const pwd = adminData?.phone_number;
    if (pwd === phone_number) {
      res.status(200).json({
        message: "You are authenticated",
        token: jwt.sign({
          name,
          role: 'admin'
        }, process.env.SECRET)
      });
    }
    else {
      res.sendStatus(401);
    }
  }
});

module.exports = router;
