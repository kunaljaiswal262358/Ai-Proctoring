const mongoose = require("mongoose");
const Joi = require("joi");

const examSchema = new mongoose.Schema({
  title: { type: String, required: true },
  duration: { type: Number, required: true },
  description: { type: String },
  passingScore: { type: Number, required: true, min: 0, max: 100 },
  questions: { type: [mongoose.Schema.Types.ObjectId], ref: "Question", required: true },
  createdAt: {type: Date, default: Date.now()}
});

const examValidationSchema = Joi.object({
  title: Joi.string().required().messages({
    "string.empty": "Title is required",
    "any.required": "Title is required",
  }),
  duration: Joi.number().min(1).required().messages({
    "number.base": "Duration must be a number",
    "any.required": "Duration is required",
    "number.min": "Minimum duration is 1 minute"
  }),
  description: Joi.string().allow('').optional(),
  passingScore: Joi.number().required().min(0).max(100).messages({
    "number.base": "Passing score must be a number",
    "number.min": "Passing score cannot be less than 0",
    "number.max": "Passing score cannot be more than 100",
    "any.required": "Passing score is required",
  }),
  questions: Joi.array()
    .items(
      Joi.string().length(24).hex().required().messages({
        "string.base": "ID must be a string",
        "string.length": "ID must be exactly 24 characters",
        "string.hex": "ID must only contain hexadecimal characters (0-9, a-f)",
        "any.required": "ID is required",
      })
    )
    .required()
    .min(2)
    .max(100)
    .messages({
      "array.base": "Must be an array",
      "array.min": "At least {#limit} item(s) are required",
      "array.max": "No more than {#limit} items allowed",
      "any.required": "Array is required",
    }),
});

const validateExam = (exam) => {
  let { error: response } = examValidationSchema.validate(exam, {
    abortEarly: false,
  });
  if (!response) return undefined;

  let error = {};
  response.details.forEach((entry) => {
    error[entry.path[0]] = entry.message;
  });
  return error;
};

const Exam = mongoose.model("Exam", examSchema);

module.exports = { Exam, validateExam };
