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
    cb(null, "uploads/"); // Set the uploads folder for storing files
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Route to add a notification with optional file upload
router.post("/add", upload.single("file"), addNotification);

// Route to get all notifications
router.get("/", getNotifications);

module.exports = router;
