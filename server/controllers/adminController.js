const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const Admin = require("../models/AdminModel");
const JWT_SECRET = process.env.SECRET_KEY; // Ensure you have this in your .env file

// Hardcoded universal admin credentials
const UNIVERSAL_ADMIN = {
  name: "admin",
  adminID: "AD001",
  password: "admin123", // Plaintext only for initialization
};

// Create an admin
exports.createAdmin = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, adminID, password } = req.body;

    // Prevent creating the universal admin through API
    if (adminID === UNIVERSAL_ADMIN.adminID) {
      return res.status(400).json({ error: "Cannot use reserved Admin ID" });
    }

    // Check if the adminID already exists
    const existingAdmin = await Admin.findOne({ adminID });
    if (existingAdmin) {
      return res.status(400).json({ error: "Admin ID already exists" });
    }

    // Hash the password before saving it
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new admin
    const newAdmin = new Admin({
      name,
      adminID,
      password: hashedPassword,
    });

    await newAdmin.save();

    // Create a JWT token
    const token = jwt.sign({ adminId: newAdmin._id }, JWT_SECRET, {
      expiresIn: "24h",
    });

    res.json({ success: true, token });
  } catch (error) {
    console.error("Error creating admin:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Login an admin
exports.loginAdmin = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { adminID, password } = req.body;

  try {
    // Universal Admin logic
    if (adminID === UNIVERSAL_ADMIN.adminID) {
      const isPasswordValid = password === UNIVERSAL_ADMIN.password;
      if (!isPasswordValid) {
        return res.status(400).json({ error: "Invalid credentials" });
      }

      const token = jwt.sign(
        { adminId: UNIVERSAL_ADMIN.adminID, role: "universal" },
        JWT_SECRET,
        { expiresIn: "24h" }
      );

      return res.json({ success: true, token, name: UNIVERSAL_ADMIN.name });
    }

    // Check in database for other admins
    const admin = await Admin.findOne({ adminID });

    if (!admin) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ adminId: admin._id }, JWT_SECRET, {
      expiresIn: "24h",
    });

    res.json({ success: true, token, name: admin.name });
  } catch (error) {
    console.error("Error logging in admin:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
