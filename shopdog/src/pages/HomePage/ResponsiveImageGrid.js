import React from "react";
import { Box, Typography, Button, useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";

const items = [
  {
    name: "Custom Cutting Board",
    description: "Your design laser engraved onto a cutting board.",
    image: `${process.env.PUBLIC_URL}/assets/images/IMG_6959.JPEG`,
  },
  {
    name: "Small Trinkets",
    description: "Small Trinkets for your house",
    image: `${process.env.PUBLIC_URL}/assets/images/IMG_5235.JPEG`,
  },
  {
    name: "Wavy Cutting Board",
    description: "A stylish wavy cutting board.",
    image: `${process.env.PUBLIC_URL}/assets/images/IMG_5387.JPEG`,
  },
];

const IMAGE_HEIGHT = 500; // Set image height
const IMAGE_WIDTH = 380; // Set image width

const ResponsiveImageRow = () => {
  const isSmallScreen = useMediaQuery("(max-width:900px)");
  const isVerySmallScreen = useMediaQuery("(max-width:600px)");

  // Dynamically reduce items on small screens
  const visibleItems = isSmallScreen ? items.slice(0, 2) : items;

  return (
    <Box
      sx={{
        position: "relative", // Ensures the text and button are positioned relative to this container
        display: "flex",
        overflow: "hidden",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: 2,
        maxWidth: "100%",
        p: 2,
        backgroundColor: "#5D4037", // Set background color
      }}
    >
      {/* Text and Button Container */}
      <Box
        sx={{
          position: "absolute",
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          color: "#e0d1cc",
          zIndex: 10,
        }}
      >
        <Typography
          variant="h3"
          fontWeight="bold"
          sx={{
            mb: 2,
            textShadow: "2px 2px 10px rgba(0, 0, 0, 0.8)",
          }}
        >
          Explore Our Collection
        </Typography>
        <Typography
          variant="h6"
          sx={{
            mb: 3,
            textShadow: "1px 1px 3px rgba(0, 0, 0, 0.8)", // Add shadow to text
            fontWeight: "bold",
          }}
        >
          Discover a range of custom-made items that are perfect for your home.
        </Typography>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#3E2723", // Darker button color to complement the background
            "&:hover": {
              backgroundColor: "#3E2723", // Darker on hover
            },
            textShadow: "1px 1px 3px rgba(0, 0, 0, 0.5)", // Add shadow to button text
          }}
          component={Link}
          to="/gallery"
        >
          View Gallery
        </Button>
      </Box>

      {/* Background SVG */}
      <Box
        component="img"
        src={`${process.env.PUBLIC_URL}/assets/images/logo.svg`}
        alt="Background"
        sx={{
          position: "absolute",
          left: "75%",
          bottom: "50%",
          width: 400,
          height: "auto",
          opacity: 0.1,
          zIndex: 0, // Ensure background stays behind everything else
          transform: "rotate(10deg)",
        }}
      />

      {/* Product Images */}
      {visibleItems.map((item, index) => (
        <Box
          key={index}
          sx={{
            width: isVerySmallScreen ? "100%" : IMAGE_WIDTH,
            textAlign: "center",
            position: "relative", // Keep the relative positioning for the individual product boxes
            zIndex: 1, // Ensure images are above the background but below the text
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: IMAGE_HEIGHT,
              overflow: "hidden",
              borderRadius: 2,
              zIndex: 1,
            }}
          >
            <img
              src={item.image}
              alt={item.name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Box>
          <Typography variant="h6" mt={1} color="#e0d1cc" fontWeight="bold">
            {item.name}
          </Typography>
          <Typography variant="body2" color="#c4a89f" fontWeight="bold">
            {item.description}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default ResponsiveImageRow;
