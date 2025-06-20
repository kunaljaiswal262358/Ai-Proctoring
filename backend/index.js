const express = require("express");
const cors = require('cors')
const connectToDB = require("./db/db.js");
const authRoutes = require("./routes/auth.js");
const adminRoutes = require('./routes/admin.js')
const examRoutes = require('./routes/exam.js')
const questionRoutes = require("./routes/question.js")
const userReportRoutes = require("./routes/userReport.js")

const app = express();

connectToDB();

app.use(express.json())
app.use(cors({
  origin: ["http://localhost:3000","http://localhost:3001"],
  exposedHeaders: ["x-auth-token"]
}))
app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/exams", examRoutes);
app.use("/questions", questionRoutes);
app.use("/userReports", userReportRoutes);

app.use((err, req, res, next) => {
  res.status(500).send({ Error: err.message });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`App is running on ${port}`);
});
