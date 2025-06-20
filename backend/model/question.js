const mongoose = require("mongoose");
const Joi = require("joi");

const questionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  category: { type: String },
  difficulty: {
    type: String,
    enum: ["Easy", "Medium", "Hard"],
    required: true,
  },
  options: {
    type: [{ type: String, isCorrect: Boolean }],
    required: true,
    min: 2,
    max: 4,
  },
  correctAnswer: { type: Number, required: true, min: 0, max: 3 },
  createdAt: { type: Date, default: Date.now() },
});

const questionValidationSchema = Joi.object({
  text: Joi.string().required().messages({
    "string.empty": "Question Text is required",
    "any.required": "Question Text is required",
  }),
  category: Joi.string(),
  difficulty: Joi.string().required().valid("Easy", "Medium", "Hard").messages({
    "any.only": "Difficulty must be one of: Easy, Medium, Hard",
    "any.required": "Difficulty is required",
    "string.base": "Difficulty must be a string",
  }),
  correctAnswer: Joi.number().required().min(0).max(3).messages({
    "any.required": "Correct answer index is required",
    "number.min" : "Minimum index is 0",
    "number.max" : "Maximum index is 3"
  }),
  options: Joi.array().min(4).max(4).required().messages({
    "array.base": "Must be an array",
    "array.min": "Must be 4 items",
    "array.max": "Must be 4 items",
    "any.required": "Option array is required",
  }),
});

const validateQuestion = (question) => {
  let { error: response } = questionValidationSchema.validate(question, {
    abortEarly: false,
  });
  if (!response) return undefined;

  let error = {};
  response.details.forEach((entry) => {
    error[entry.path[0]] = entry.message;
  });
  return error;
};

const Question = mongoose.model("Question", questionSchema);

module.exports = { Question, validateQuestion };
