const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/login", async (req, res) => {
  let { email, password } = req.body;
  if (!email) return res.status(400).send({ email: "Email is not provided." });
  if (!password)
    return res.status(400).send({ password: "Password is not provided." });

  const isMatched = process.env.ADMIN_ID === email && process.env.ADMIN_PASSWORD === password;
  if (!isMatched) return res.status(400).send("Either Email or Password is Invalid.");

  const token = generateToken({email});
  res.send(token);
});

const generateToken = (user) => {
  delete user.password
  const secretKey = process.env.SECRET_KEY
  const token = jwt.sign(user,secretKey)
  return token;
}

module.exports = router;
