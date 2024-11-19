// middleware/fetchadmin.js
const jwt = require("jsonwebtoken");
const Admin = require("../models/AdminModel"); // Updated model import
const JWT_SECRET = "5a8f621a5e8c2b035e8d9d8c2c4fda6c";

const fetchadmin = async (req, res, next) => {
  // Get the token from the request header
  const token = req.header("auth-token");

  if (!token) {
    return res.status(401).json({ error: "Please authenticate" });
  }

  try {
    // Verify the token and extract the admin ID
    const decoded = jwt.verify(token, JWT_SECRET);
    const adminId = decoded.adminId;

    // Fetch the admin details from the database
    const admin = await Admin.findById(adminId).select("-password");

    if (!admin) {
      return res.status(404).json({ error: "Admin not found" });
    }

    // Attach admin details to the req object
    req.user = { adminId: admin._id, name: admin.name };
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token expired" });
    }
    console.error("Error decoding token:", error);
    return res
      .status(401)
      .json({ error: "Invalid token", detail: error.message });
  }
};

module.exports = fetchadmin;
