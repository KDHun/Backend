const express = require("express");
const cors = require("cors");
const studentRoutes = require("./api/routes/student");
const instructorRoute = require("./api/routes/instructor");
const committeeRoute = require("./api/routes/committee");
const authRoutes = require("./api/routes/auth");
const courseRoutes = require("./api/routes/course");
const classRoutes = require("./api/routes/class");
const examRoutes = require("./api/routes/exam");
const adminRoutes = require("./api/routes/admin");
const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use("/student", studentRoutes);
app.use("/instructor", instructorRoute);
app.use("/committee", committeeRoute);
app.use("/course", courseRoutes);
app.use("/class", classRoutes);
app.use("/", authRoutes);
app.use("/exam", examRoutes);
app.use("/admin", adminRoutes);

app.listen(port, () => {
  console.log("Ther server is up and running on " + port);
});
