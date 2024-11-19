import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CarouselComponent from "../components/CarouselComponent"; // Ensure the path is correct
import { Box, Typography } from "@mui/material";
import axios from "axios"; // Import axios for API call

const Home = () => {
  const [currentNotification, setCurrentNotification] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecentNotification = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/notifications"); // API call to fetch notifications
        if (res.data && res.data.length > 0) {
          const latestNotification = res.data[0]; // Assuming the latest notification is the first item
          setCurrentNotification(latestNotification.message);
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchRecentNotification(); // Fetch recent notification on component mount
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      {/* Main Content */}
      <div style={{ flex: 3, paddingRight: "20px" }}>
        <CarouselComponent />
        <h1>Welcome to Our School</h1>
        <p>Explore our achievements, events, and more!</p>
      </div>

      {/* Notification Box */}
      <Box
        sx={{
          flex: 1,
          backgroundColor: "#f9f9f9",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          padding: "16px",
          cursor: "pointer",
          animation: "flash 1.5s infinite", // Flashing effect
        }}
        onClick={() => navigate("/notifications")}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            color: "#007bff",
            textAlign: "center",
          }}
        >
          Recent Notification
        </Typography>
        <Typography
          variant="body1"
          sx={{
            marginTop: "8px",
            textAlign: "center",
            color: "#555",
            fontStyle: "italic",
          }}
        >
          {currentNotification || "No notifications available"}{" "}
          {/* Display notification or fallback text */}
        </Typography>
      </Box>

      {/* Flashing animation */}
      <style>
        {`
          @keyframes flash {
            0% { background-color: #f9f9f9; }
            50% { background-color: #d1e7fd; }
            100% { background-color: #f9f9f9; }
          }
        `}
      </style>
    </div>
  );
};

export default Home;
