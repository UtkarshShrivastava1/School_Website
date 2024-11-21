import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import axios from "axios";

const PhotoGallery = () => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/photos");
        setPhotos(res.data);
      } catch (error) {
        console.error("Error fetching photos:", error);
      }
    };

    fetchPhotos();
  }, []);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Photo Gallery
      </Typography>
      <Grid container spacing={3}>
        {photos.map((photo) => (
          <Grid item xs={12} sm={6} md={4} key={photo._id}>
            <Card>
              {photo.filePath && (
                <CardMedia
                  component="img"
                  image={`http://localhost:5000${photo.filePath}`}
                  alt={photo.title}
                  height="200"
                />
              )}
              <CardContent>
                <Typography variant="h6">{photo.title}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {photo.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PhotoGallery;
