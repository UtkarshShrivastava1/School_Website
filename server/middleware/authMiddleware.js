// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.SECRET_KEY;

const authenticateAdmin = (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ error: "No token provided, access denied" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.admin = decoded.adminId; // Attach admin ID to request
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
};

module.exports = authenticateAdmin;
