const fs = require("fs");
const path = require("path");
const Photo = require("../models/PhotoModel"); // Assuming you will create a PhotoModel

// Add a new photo
exports.addPhoto = async (req, res) => {
  try {
    // Check if title and description are provided
    const { title, description } = req.body;
    if (!title || !description) {
      return res
        .status(400)
        .json({ error: "Title and description are required" });
    }

    // Check if file is uploaded
    if (!req.file) {
      return res.status(400).json({ error: "File upload is required" });
    }

    const filePath = `/uploads/${req.file.filename}`; // Path to store the file

    // Create a new photo document in the database
    const newPhoto = new Photo({
      title,
      description,
      filePath, // Store the file path in the model
    });

    // Save the photo to the database
    await newPhoto.save();

    // Respond with success and the new photo data
    res.status(201).json({
      success: true,
      message: "Photo uploaded successfully",
      photo: newPhoto,
    });
  } catch (error) {
    console.error("Error uploading photo:", error);
    res.status(500).json({ error: "Failed to upload photo" });
  }
};

// Get all photos
exports.getPhotos = async (req, res) => {
  try {
    const photos = await Photo.find().sort({ createdAt: -1 });

    // Verify that the file paths exist on the server
    const photosWithValidFiles = photos.map((photo) => {
      if (photo.filePath) {
        const fullPath = path.join(__dirname, "..", photo.filePath);
        // Check if file exists at the path
        if (!fs.existsSync(fullPath)) {
          console.warn(`File not found: ${fullPath}`);
          photo.filePath = null; // If file not found, set the filePath to null
        }
      }
      return photo;
    });

    // Send the list of photos (with valid file paths)
    res.status(200).json(photosWithValidFiles);
  } catch (error) {
    console.error("Error retrieving photos:", error);
    res.status(500).json({ error: "Failed to retrieve photos" });
  }
};
