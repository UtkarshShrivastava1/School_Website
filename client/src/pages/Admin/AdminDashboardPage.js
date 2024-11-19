import React from "react";
import {
  Box,
  CssBaseline,
  Toolbar,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./AdminDashboardPage.css"; // Import the CSS file

const AdminDashboardPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Box className="dashboard-container">
      <CssBaseline />
      <Toolbar />
      <Box component="main" className="dashboard-main">
        <Typography variant="h4" className="dashboard-title" gutterBottom>
          Admin Dashboard
        </Typography>
        <Grid
          container
          spacing={4}
          justifyContent="center"
          className="dashboard-grid"
        >
          {/* Register Admin Card */}
          <Grid item xs={12} sm={6} md={4}>
            <Card className="dashboard-card">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Register Admin
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Add a new admin to the system.
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  className="dashboard-button"
                  onClick={() => navigate("/admin-dashboard/register-admin")}
                >
                  Register Admin
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Upload Photos Card */}
          <Grid item xs={12} sm={6} md={4}>
            <Card className="dashboard-card">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Upload Photos
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Upload photos for the gallery or notifications.
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  className="dashboard-button"
                  onClick={() => navigate("/admin-dashboard/upload-photos")}
                >
                  Upload Photos
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Add Notification Card */}
          <Grid item xs={12} sm={6} md={4}>
            <Card className="dashboard-card">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Add Notification
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Post a new notification for all users to see.
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  className="dashboard-button"
                  onClick={() => navigate("/admin-dashboard/add-notification")}
                >
                  Add Notification
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Logout Button */}
        <Button
          variant="outlined"
          color="error"
          className="logout-button"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
};

export default AdminDashboardPage;
