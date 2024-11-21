import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import axios from "axios";

const AddPhotos = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (file) formData.append("file", file);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/photos/add",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      if (res.data.success) {
        setSuccess("Photo uploaded successfully!");
        setError("");
        setTitle("");
        setDescription("");
        setFile(null);
      }
    } catch (err) {
      setError(err.response?.data?.error || "Error uploading photo");
      setSuccess("");
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Add Photo
      </Typography>
      {success && <Typography color="green">{success}</Typography>}
      {error && <Typography color="red">{error}</Typography>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          margin="normal"
          multiline
          rows={3}
        />
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          accept="image/*"
          style={{ marginTop: "10px" }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Upload Photo
        </Button>
      </form>
    </Box>
  );
};

export default AddPhotos;
