const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.header.autharization;
    if (!authHeader) return res.status(400).json({ msg: "Token is required" });
    const token = authHeader.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT_SK);

    req.user = payload.id;

    next();
  } catch (error) {
    return res.status(401).json({ msg: "token invalid" });
  }
};

module.exports = authMiddleware;


