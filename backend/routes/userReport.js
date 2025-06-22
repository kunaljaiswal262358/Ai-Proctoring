const express = require("express");
const {
  validateUserReport,
  UserReport,
  validateGivenExam,
} = require("../model/userReport");
const { User } = require("../model/user");
const authenticate = require("../middleware/authenticate");

const router = express();

router.put("/:reportId", authenticate, async (req, res) => {
  let report = req.body;
  const errors = validateUserReport(report);
  if (errors) return res.status(400).send(errors);

  const reportId = req.params.reportId;
  report = await UserReport.findByIdAndUpdate(reportId, report, { new: true });
  if (!report) return res.status(400).send("Report id is invalid");

  res.send(report);
});

router.put("/givenExam/:userId", authenticate, async (req, res) => {
  let exam = req.body;

  const errors = validateGivenExam(exam);
  if (errors) return res.status(400).send(errors);

  const userId = req.params.userId;
  const user = await User.findById(userId);
  if (!user) return res.status(400).send("User id is invalid");

  let report = await UserReport.findById(user.report);
  if(!report) return res.status(500).send("Report might be deleted.");

  const index = report.givenExams.findIndex(item => item.exam.toString() === exam.exam)
  console.log(index)

  if(index !== -1) report.givenExams[index] = exam;
  else report.givenExams.push(exam)

  await report.save();

  res.send(report);
});

module.exports = router;
