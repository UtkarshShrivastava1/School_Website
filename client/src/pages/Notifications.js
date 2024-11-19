import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";
import axios from "axios";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/notifications");
        setNotifications(res.data);
      } catch (error) {
        console.error("Error fetching notifications", error);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Notifications
      </Typography>
      <List>
        {notifications.map((notification) => (
          <ListItem key={notification._id} divider>
            <ListItemText
              primary={notification.title}
              secondary={notification.message}
            />
            {notification.filePath && (
              <a
                href={`http://localhost:5000${notification.filePath}`}
                target="_blank"
                rel="noopener noreferrer"
                download
              >
                <Button variant="outlined">Download PDF</Button>
              </a>
            )}
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Notifications;
