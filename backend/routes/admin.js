const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/login", async (req, res) => {
  let { email, password } = req.body;
  if (!email) return res.status(400).send({ email: "Email is not provided." });
  if (!password)
    return res.status(400).send({ password: "Password is not provided." });

  if(!(process.env.ADMIN_ID === email)) return res.status(400).send({email: "Email is incorrect."});
  if (!(process.env.ADMIN_PASSWORD === password)) return res.status(400).send({password: "Password is incorrecct."});

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
