const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  filePath: {
    type: String, // Store the file path as a string
    required: false, // Not all notifications might have a PDF
  },
});

module.exports = mongoose.model("Notification", NotificationSchema);
