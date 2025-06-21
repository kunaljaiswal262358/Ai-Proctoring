const express = require("express");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User, validateUser } = require("../model/user.js");
const { UserReport } = require("../model/userReport.js")

const router = express.Router();

router.post("/signup", async (req, res) => {
  let user = req.body;

  const isExistUser = await User.findOne({email: user.email})
  if(isExistUser) return res.status(400).send({email: "Email exist already."})

  const error = validateUser(user);
  if (error) return res.status(400).send(error);

  const report = new UserReport({"performance": 0, "givenExams": [], "timeSpend": 0})
  await report.save()
  
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(user.password, saltRounds)
  user = new User({...user,"password": hashedPassword,report: report._id});
  await user.save();
  
  let populatedUser = await User.findById(user._id).populate('report');
  populatedUser = populatedUser.toObject();
  delete populatedUser.password;
  
  const token = generateToken(populatedUser)
  res.setHeader('x-auth-token', token)
  res.status(201).send(populatedUser);
});

router.post("/login", async (req, res) => {
  let {email, password} = req.body;
  if(!email) return res.status(400).send({email: "Email is not provided."})
  if(!password) return res.status(400).send({password: "Password is not provided."})

  let user = await User.findOne({email}).populate("report");
  if(!user) return res.status(400).send({email: "Email is not registered."});

  const isMatched = await bcrypt.compare(password, user.password);
  if(!isMatched) return res.status(400).send({password: "Password mismatched."});

  user = user.toObject()
  delete user.password;
  const token = generateToken(user)
  res.send(token)
})

const generateToken = (user) => {
  delete user.password
  const secretKey = process.env.SECRET_KEY
  const token = jwt.sign(user,secretKey)
  return token;
}

module.exports = router;
