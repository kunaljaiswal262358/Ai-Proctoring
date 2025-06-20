const express = require("express");
const { Question, validateQuestion } = require("../model/question");
const { Exam } = require('../model/exam.js')

const router = express.Router();

router.post("/", async (req, res) => {
  let question = req.body;
  const errors = validateQuestion(question);
  if (errors) return res.status(400).send(errors);

  question = new Question(question);
  await question.save();

  res.send(question);
});

router.get("/", async (req, res) => {
  const category = req.query.category;
  const difficulty = req.query.difficulty;

  const query = {};
  if (category) query.category = category;
  if (difficulty) query.difficulty = difficulty;

  const questions = await Question.find(query);
  res.send(questions);
});

router.put("/:id", async (req, res) => {
  let question = req.body;
  const errors = validateQuestion(question);
  if (errors) res.status(400).send(errors);

  question = await Question.findByIdAndUpdate(req.params.id, question, {
    new: true,
  });
  if (!question) return res.status(400).send("Question not found with given id");
  res.send(question);
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  await Exam.updateMany({}, { $pull: { questions: id } });

  const deletedQuestion = await Question.findByIdAndDelete(id);
  if (!deletedQuestion) return res.status(400).send("Question not found with given id");

  res.send(deletedQuestion);
});

module.exports = router;
