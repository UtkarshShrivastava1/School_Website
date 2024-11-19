const fs = require("fs");
const path = require("path");
const Notification = require("../models/NotificationModel");

// Add a new notification
exports.addNotification = async (req, res) => {
  try {
    const { title, message, date } = req.body;
    const filePath = req.file ? `/uploads/${req.file.filename}` : null; // Store file path if a file is uploaded

    const newNotification = new Notification({
      title,
      message,
      date,
      filePath, // Add file path to the notification model
    });

    await newNotification.save();
    res.status(201).json({
      message: "Notification added successfully",
      notification: newNotification,
    });
  } catch (error) {
    console.error("Error adding notification:", error);
    res.status(500).json({ error: "Failed to add notification" });
  }
};

// Get all notifications
exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ date: -1 });

    // Verify file paths and check if they exist
    const notificationsWithValidFiles = notifications.map((notification) => {
      if (notification.filePath) {
        const fullPath = path.join(__dirname, "..", notification.filePath);
        if (!fs.existsSync(fullPath)) {
          notification.filePath = null; // Mark the file as missing
        }
      }
      return notification;
    });

    res.json(notificationsWithValidFiles);
  } catch (error) {
    console.error("Error retrieving notifications:", error);
    res.status(500).json({ error: "Failed to retrieve notifications" });
  }
};
