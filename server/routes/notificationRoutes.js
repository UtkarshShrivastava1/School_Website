const express = require("express");
const multer = require("multer");
const path = require("path");
const {
  addNotification,
  getNotifications,
} = require("../controllers/notificationController");

const router = express.Router();

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, "../uploads/");
    cb(null, uploadDir); // Ensure the uploads folder exists
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const sanitizedFilename = file.originalname.replace(/\s+/g, "-"); // Sanitize file name
    cb(null, `${timestamp}-${sanitizedFilename}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    // Only accept PDF files
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are allowed"), false);
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 }, // Set file size limit to 5MB
});

// Route to add a notification with optional file upload
router.post(
  "/add",
  upload.single("file"),
  (req, res, next) => {
    // Custom error handler for Multer
    if (req.fileValidationError) {
      return res.status(400).json({ error: req.fileValidationError });
    }
    next();
  },
  addNotification
);

// Route to get all notifications
router.get("/", getNotifications);

module.exports = router;
