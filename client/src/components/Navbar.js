import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Avatar,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // State for Academics Dropdown
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        background: "linear-gradient(45deg, #007bff, #4caf50)",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Toolbar>
        {/* Logo and School Name */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar
            alt="School Logo"
            src="https://via.placeholder.com/40"
            sx={{ width: 40, height: 40 }}
          />
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              flexGrow: 1,
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 600,
              fontSize: isMobile ? "1.5rem" : "2rem",
              letterSpacing: "2px",
              color: "#fff",
              textDecoration: "none",
              ":hover": {
                color: "#e0e0e0",
              },
            }}
          >
            SchoolWebsite
          </Typography>
        </Box>

        {/* Navigation Links */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: isMobile ? 1 : 2,
            ml: "auto",
          }}
        >
          <Button
            color="inherit"
            component={Link}
            to="/"
            sx={{
              fontSize: isMobile ? "1rem" : "1.2rem",
              fontWeight: 500,
              textTransform: "none",
              ":hover": {
                backgroundColor: "#003366",
                borderRadius: "15px",
              },
            }}
          >
            Home
          </Button>

          {/* Academics Dropdown */}
          <Button
            color="inherit"
            onClick={handleClick}
            sx={{
              fontSize: isMobile ? "1rem" : "1.2rem",
              fontWeight: 500,
              textTransform: "none",
              ":hover": {
                backgroundColor: "#003366",
                borderRadius: "15px",
              },
            }}
          >
            Academics
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{ "aria-labelledby": "basic-button" }}
          >
            <MenuItem onClick={handleClose} component={Link} to="/curriculum">
              Curriculum
            </MenuItem>
            <MenuItem onClick={handleClose} component={Link} to="/syllabus">
              Syllabus
            </MenuItem>
            <MenuItem onClick={handleClose} component={Link} to="/faculty">
              Faculty
            </MenuItem>
            <MenuItem onClick={handleClose} component={Link} to="/resources">
              Learning Resources
            </MenuItem>
          </Menu>

          <Button
            color="inherit"
            component={Link}
            to="/achievements"
            sx={{
              fontSize: isMobile ? "1rem" : "1.2rem",
              fontWeight: 500,
              textTransform: "none",
              ":hover": {
                backgroundColor: "#003366",
                borderRadius: "15px",
              },
            }}
          >
            Achievements
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/notifications"
            sx={{
              fontSize: isMobile ? "1rem" : "1.2rem",
              fontWeight: 500,
              textTransform: "none",
              ":hover": {
                backgroundColor: "#003366",
                borderRadius: "15px",
              },
            }}
          >
            Notifications
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/events"
            sx={{
              fontSize: isMobile ? "1rem" : "1.2rem",
              fontWeight: 500,
              textTransform: "none",
              ":hover": {
                backgroundColor: "#003366",
                borderRadius: "15px",
              },
            }}
          >
            Events
          </Button>
        </Box>

        {/* Photo Gallery Button */}
        <Button
          color="inherit"
          component={Link}
          to="/photo-gallery"
          sx={{
            fontSize: isMobile ? "1rem" : "1.2rem",
            fontWeight: 500,
            textTransform: "none",
            ":hover": {
              backgroundColor: "#003366",
              borderRadius: "15px",
            },
          }}
        >
          Photo Gallery
        </Button>

        {/* Admin Login Button */}
        <Button
          color="inherit"
          variant="outlined"
          component={Link}
          to="/login" // Link to login page
          sx={{
            borderRadius: "20px",
            fontSize: isMobile ? "0.9rem" : "1rem",
            fontWeight: 600,
            borderColor: "#fff",
            color: "#fff",
            ":hover": {
              borderColor: "#4caf50",
              color: "#1d344a",
              backgroundColor: "transparent",
            },
          }}
        >
          Admin Login
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
