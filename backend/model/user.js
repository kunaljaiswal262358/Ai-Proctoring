const mongoose = require("mongoose");
const Joi = require('joi');
const { UserReport } = require("./userReport");

const userSchema = new mongoose.Schema({
  name: { type: String, maxLength: 30, required: true },
  email: { type: String, maxLength: 50, required: true, unique: true },
  password: { type: String, minLength: 8, required: true },
  report: {type: mongoose.Schema.Types.ObjectId, ref: 'UserReport', required: true}
});

const userValidationSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "Name is requied",
    "string.empty": "Name can not be empty",
  }),
  email: Joi.string().email().required().messages({
    "any.required": "Email is required",
    "string.email": "Email must be valid",
  }),
  password: Joi.string()
    .min(8)
    .max(30)
    .pattern(
      new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@#$!%*?&])[A-Za-z\\d@#$!%*?&]{8,}$"
      )
    )
    .required()
    .messages({
      "string.pattern.base":
        "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character.",
      "string.min": "Password must be at least 8 characters long.",
      "string.max": "Password must not exceed 30 characters.",
      "any.required": "Password is required.",
    }),
}).required();

const validateUser = (user) => {
    let {error: response} = userValidationSchema.validate(user,{abortEarly: false});
    if(!response) return undefined;

    let error = {};
    response.details.forEach(entry => {
      error[entry.path[0]] = entry.message;
    })
    return error;
};

const User = mongoose.model('User', userSchema);

module.exports = {User, validateUser};

