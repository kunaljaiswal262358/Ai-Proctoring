const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");

const userReportSchema = new mongoose.Schema({
  performance: { type: Number, default: 0, min: 0, max: 100 },
  // totalGivenExams: {type: Number, default: 0},
  givenExams: [
    {
      exam: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Exam",
        required: true,
      },
      correctAnswerSheet: Object,
      userAnswerSheet: Object,
    },
  ],
  timeSpend: { type: Number, default: 0, min: 0 },
});

const userReportValidationSchema = Joi.object({
  performance: Joi.number().min(0).max(100),
  givenExams: Joi.object({
    exam: Joi.objectId().required(),
    correctAnswerSheet: Joi.object().required(),
    userAnswerSheet: Joi.object().required(),
  }),
  timeSpend: Joi.number().min(0),
});

const validateUserReport = (report) => {
  let { error: response } = userReportValidationSchema.validate(report, {
    abortEarly: false,
  });
  if (!response) return undefined;

  let error = {};
  response.details.forEach((entry) => {
    error[entry.path[0]] = entry.message;
  });
  return error;
};

const validateGivenExam = (exam) => {
  const givenExamSchema = Joi.object({
    exam: Joi.objectId().required(),
    correctAnswerSheet: Joi.object().required(),
    userAnswerSheet: Joi.object().required(),
  });

  let { error: response } = givenExamSchema.validate(exam, {
    abortEarly: false,
  });
  if (!response) return undefined;

  let error = {};
  response.details.forEach((entry) => {
    error[entry.path[0]] = entry.message;
  });
  return error;
};

const UserReport = mongoose.model("UserReport", userReportSchema);

module.exports = { UserReport, validateUserReport, validateGivenExam };
