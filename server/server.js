const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
// Initialize dotenv to use environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

// Import routes
const adminAuthRoutes = require("./routes/adminAuth");
const notificationRoutes = require("./routes/notificationRoutes"); // New route for notifications

// Use routes
app.use("/api/admin/auth", adminAuthRoutes);
app.use("/api/notifications", notificationRoutes); // Use notifications route
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// Set the port from environment variables or default to 5000
const port = process.env.PORT || 5000;

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
