import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import { Padding } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import SlideShow from "../HomePage/SlideShow";

function Gallery() {
  const [galleryItems, setGalleryItems] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/gallery.json`)
      .then((response) => response.json())
      .then((data) => setGalleryItems(data))
      .catch((error) => console.error("Error fetching gallery items", error));
  }, []);

  return (
    <div>
      <SlideShow>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 2,
            textAlign: "center",
            width: "100%",
            color: "white",
            textShadow: "2px 2px 8px rgba(0,0,0,0.7)",
          }}
        >
          <Typography variant="h2">Shop Dawg Woodworking</Typography>
          <Typography variant="h5" sx={{ mt: 2 }}>
            Gallery
          </Typography>
          <Button
            component={Link}
            to="/shop"
            variant="contained"
            color="primary"
            sx={{
              mt: 4,
              px: 4,
              py: 1,
              backgroundColor: "#5D4037",
              fontWeight: "bold",
            }}
          >
            Shop
          </Button>
          <Button
            component={Link}
            to="/contact"
            variant="contained"
            color="primary"
            sx={{
              mt: 4,
              px: 4,
              py: 1,
              ml: 5,
              backgroundColor: "#5D4037",
              fontWeight: "bold",
            }}
          >
            Contact For Custom Builds
          </Button>
        </Box>
      </SlideShow>
      <Typography
        textAlign="center"
        variant="h2"
        color="#5D4037"
        fontWeight="bold"
        sx={{ mt: 4 }}
      >
        The Gallery
      </Typography>
      <Typography
        textAlign="center"
        variant="body1"
        color="#5D4037"
        sx={{ mt: 0 }}
      >
        If you like any of these items and want them made, contact
        thorntoncj@gmail.com for custom builds
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: 2,
          padding: 4,
          backgroundColor: "#f5f5f5",
        }}
      >
        {galleryItems.map((item, index) => (
          <Box
            key={index}
            sx={{
              backgroundColor: "#5D4037",
              borderRadius: 2,
              boxShadow: 5,
              textAlign: "center",
              padding: 2,
            }}
          >
            <img
              src={item.image}
              alt={item.title}
              style={{ width: "100%", height: "auto", borderRadius: "8px" }}
            />
            <Typography
              variant="h6"
              sx={{ mt: 2, fontWeight: "bold", color: "#e0d1cc" }}
            >
              {item.title}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "gray", mt: 1, color: "#e0d1cc" }}
            >
              {item.description}
            </Typography>
          </Box>
        ))}
      </Box>
    </div>
  );
}

export default Gallery;
