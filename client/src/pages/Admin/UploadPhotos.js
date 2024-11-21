import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";

const UploadPhotos = () => {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setMessage("");
    setError("");

    if (!title || !file) {
      setError("Please provide a title and select a file.");
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/photos/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessage(response.data.message);
      setTitle("");
      setFile(null);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Failed to upload photo.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: "600px",
        margin: "auto",
        marginTop: "20px",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography variant="h5" gutterBottom>
        Upload Photo
      </Typography>
      <form onSubmit={handleUpload}>
        <TextField
          fullWidth
          label="Photo Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="normal"
          required
        />
        <Button
          variant="outlined"
          component="label"
          sx={{ marginBottom: "16px" }}
        >
          Select File
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={handleFileChange}
          />
        </Button>
        {file && <Typography>Selected File: {file.name}</Typography>}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: "16px" }}
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress size={24} /> : "Upload"}
        </Button>
      </form>
      {message && (
        <Alert severity="success" sx={{ marginTop: "16px" }}>
          {message}
        </Alert>
      )}
      {error && (
        <Alert severity="error" sx={{ marginTop: "16px" }}>
          {error}
        </Alert>
      )}
    </Box>
  );
};

export default UploadPhotos;
