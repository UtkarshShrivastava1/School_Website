const fs = require("fs");
const path = require("path");
const Notification = require("../models/NotificationModel");

// Add a new notification
exports.addNotification = async (req, res) => {
  try {
    const { title, message, date } = req.body;
    const filePath = req.file ? `/uploads/${req.file.filename}` : null; // Get file path if uploaded

    // Create new notification
    const newNotification = new Notification({
      title,
      message,
      date,
      filePath, // Include the file path in the notification model
    });

    // Save the notification to the database
    await newNotification.save();

    res.status(201).json({
      success: true,
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

    // Verify file paths and ensure they exist on the server
    const notificationsWithValidFiles = notifications.map((notification) => {
      if (notification.filePath) {
        const fullPath = path.join(__dirname, "..", notification.filePath);
        if (!fs.existsSync(fullPath)) {
          console.warn(`File not found: ${fullPath}`);
          notification.filePath = null; // Mark the file as missing
        }
      }
      return notification;
    });

    res.status(200).json(notificationsWithValidFiles);
  } catch (error) {
    console.error("Error retrieving notifications:", error);
    res.status(500).json({ error: "Failed to retrieve notifications" });
  }
};
