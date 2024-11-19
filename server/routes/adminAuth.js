// routes/adminAuth.js
const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { createAdmin, loginAdmin } = require("../controllers/adminController");

// Create an admin using: POST "/api/admin/auth/createadmin" [NO LOGIN REQUIRED]
router.post(
  "/createadmin",
  [
    body("name").trim().isLength({ min: 1 }).withMessage("Name is required"),
    body("adminID")
      .isLength({ min: 5 })
      .withMessage("Admin ID must be at least 5 characters long"),
    body("password")
      .isLength({ min: 5 })
      .withMessage("Password must be at least 5 characters long"),
  ],
  createAdmin
);

// Authenticate an admin using: POST "/api/admin/auth/login" [NO LOGIN REQUIRED]
router.post(
  "/login",
  [
    body("adminID")
      .isLength({ min: 5 })
      .withMessage("Admin ID must be at least 5 characters long"),
    body("password").exists().withMessage("Password is required"),
  ],
  loginAdmin
);

module.exports = router;
