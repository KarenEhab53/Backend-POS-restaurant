const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(400).json({ msg: "Token is required" });
    const token = authHeader.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT_SK);

    req.user = payload;

    next();
  } catch (error) {
    return res.status(401).json({ msg: "token invalid" });
  }
};

const isAdmin = (req, res, next) => {

  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({ msg: "sorry this only for admin" });
  }
};

module.exports = { authMiddleware, isAdmin };




