const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { addPhoto, getPhotos } = require("../controllers/photoController");

const router = express.Router();

// Ensure the 'uploads' folder exists, otherwise create it
const uploadFolder = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder, { recursive: true });
}

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadFolder); // Save uploaded files to "uploads" folder
  },
  filename: (req, file, cb) => {
    // Save file with timestamp to avoid name conflicts
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Add file validation (only allow image files)
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true); // Accept the file
  } else {
    cb(new Error("Invalid file type. Only image files are allowed."), false); // Reject the file
  }
};

// Set up multer with storage configuration and file filter
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
  fileFilter,
});

// Route to upload a photo
router.post("/add", upload.single("file"), addPhoto);

// Route to get all photos
router.get("/", getPhotos);

module.exports = router;
