import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// Importing Pages
import Home from "./pages/Home";
import Achievements from "./pages/Achievements";
import Notifications from "./pages/Notifications";
import Events from "./pages/Events";
import Curriculum from "./pages/Curriculum"; // Added for Academics
import AdminLogin from "./pages/Admin/AdminLogin"; // Admin Login
import AdminDashboard from "./pages/Admin/AdminDashboardPage"; // Admin Dashboard
import RegisterAdmin from "./pages/Admin/RegisterAdmin"; // Admin feature
import UploadPhotos from "./pages/Admin/UploadPhotos"; // Admin feature
import AddNotification from "./pages/Admin/AddNotification"; // Admin feature
import NotFound from "./pages/NotFound";

// Importing Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Material UI Components
import { Container, CssBaseline } from "@mui/material";

function App() {
  return (
    <Router>
      <CssBaseline /> {/* Normalize CSS across browsers */}
      <Navbar />
      <Container sx={{ paddingTop: 2 }}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/events" element={<Events />} />
          <Route path="/curriculum" element={<Curriculum />} />

          {/* Admin Routes */}
          <Route path="/login" element={<AdminLogin />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route
            path="/admin-dashboard/register-admin"
            element={<RegisterAdmin />}
          />
          <Route
            path="/admin-dashboard/upload-photos"
            element={<UploadPhotos />}
          />
          <Route
            path="/admin-dashboard/add-notification"
            element={<AddNotification />}
          />

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;
