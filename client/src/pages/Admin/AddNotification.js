import React, { useState } from "react";
import { Box, TextField, Button, Typography, Alert } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const AddNotification = () => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null); // For file upload
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize navigate

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("message", message);
    if (file) formData.append("file", file);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/notifications/add",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      if (res.data.success) {
        setSuccess("Notification added successfully!");
        setError("");
        setTitle("");
        setMessage("");
        setFile(null);

        setTimeout(() => {
          navigate("/admin/dashboard"); // Redirect to Admin Dashboard after showing message
        }, 2000); // Delay for user to see success message
      }
    } catch (err) {
      setError(err.response?.data?.error || "Error adding notification");
      setSuccess("");
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Add Notification
      </Typography>
      {success && <Alert severity="success">{success}</Alert>}
      {error && <Alert severity="error">{error}</Alert>}
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
          label="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          fullWidth
          margin="normal"
          required
          multiline
          rows={4}
        />
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          accept=".pdf"
          style={{ marginTop: "10px" }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default AddNotification;
