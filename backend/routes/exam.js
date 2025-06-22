const express = require("express");
const { Exam, validateExam } = require("../model/exam");
const authenticate = require("../middleware/authenticate");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
  let exam = req.body;
  const errors = validateExam(exam);
  if (errors) return res.status(400).send(errors);

  exam = new Exam(exam);
  await exam.save();

  res.send(exam);
});

router.get("/", async (req, res) => {
  const exams = await Exam.find();
  res.send(exams);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  const exam = await Exam.findById(id).populate("questions");
  console.log(exam);
  if (!exam) return res.status(400).send("Exam with given id is not found");

  res.send(exam);
});

router.put("/:id", authenticate, async (req, res) => {
  let exam = req.body;
  const errors = validateExam(exam);
  if (errors) res.status(400).send(errors);

  exam = await Exam.findByIdAndUpdate(req.params.id, exam, {
    new: true,
  });
  if (!exam) return res.status(400).send("Exam is not found with given id");
  res.send(exam);
});

router.delete("/:id", authenticate, async (req, res) => {
  const id = req.params.id;
  const deletedExam = await Exam.findByIdAndDelete(id);
  if (!deletedExam)
    return res.status(400).send("Exam is not found with given id");

  res.send(deletedExam);
});

module.exports = router;
