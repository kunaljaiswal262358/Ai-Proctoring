const jwt = require("jsonwebtoken");
const authenticate = (req, res, next) => {
  try {
    const token = req.headers["x-auth-token"];
    const decoded = jwt.verify(token,process.env.SECRET_KEY);
    req.user = decoded;
    next()
  } catch (err) {
    return res.status(403).json( "Unauthorized or invalid token" );
  }
};

module.exports = authenticate;
