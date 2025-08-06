import React, { useState, useEffect } from "react";
import { Box, IconButton } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

const SlideShow = ({
  images = [
    `${process.env.PUBLIC_URL}/assets/images/IMG_5331.JPEG`,
    `${process.env.PUBLIC_URL}/assets/images/IMG_6959.JPEG`,
    `${process.env.PUBLIC_URL}/assets/images/IMG_5387.JPEG`,
    `${process.env.PUBLIC_URL}/assets/images/IMG_5235.JPEG`,
    `${process.env.PUBLIC_URL}/assets/images/IMG_5225.JPEG`,
    `${process.env.PUBLIC_URL}/assets/images/IMG_4687.JPEG`,
    `${process.env.PUBLIC_URL}/assets/images/IMG_4477.JPEG`,
  ],
  height = 400, // Default height in pixels
  autoPlay = true,
  interval = 5000, // Time between slides in milliseconds
  children,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-play functionality
  useEffect(() => {
    let timer;
    if (autoPlay) {
      timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % images.length);
      }, interval);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [autoPlay, images.length, interval]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: `${height}px`,
        overflow: "hidden",
      }}
    >
      {/* Images container */}
      {images.map((img, index) => (
        <Box
          key={index}
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            opacity: index === currentSlide ? 1 : 0,
            transition: "opacity 0.8s ease-in-out",
            zIndex: index === currentSlide ? 1 : 0,
          }}
        >
          <Box
            component="img"
            src={img}
            alt={`Slide ${index + 1}`}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover", // This ensures the image fills the area completely
              objectPosition: "center",
            }}
          />
        </Box>
      ))}

      {/* Navigation buttons */}
      <IconButton
        onClick={prevSlide}
        sx={{
          position: "absolute",
          left: 20,
          top: "50%",
          transform: "translateY(-50%)",
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.8)",
          },
          zIndex: 3,
        }}
      >
        <ArrowBackIos sx={{ transform: "translateX(5px)" }} />
      </IconButton>

      <IconButton
        onClick={nextSlide}
        sx={{
          position: "absolute",
          right: 20,
          top: "50%",
          transform: "translateY(-50%)",
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.8)",
          },
          zIndex: 3,
        }}
      >
        <ArrowForwardIos />
      </IconButton>

      {/* Indicator dots */}
      <Box
        sx={{
          position: "absolute",
          bottom: 20,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 1,
          zIndex: 2,
        }}
      >
        {images.map((_, index) => (
          <Box
            key={index}
            onClick={() => setCurrentSlide(index)}
            sx={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              backgroundColor:
                index === currentSlide ? "white" : "rgba(255, 255, 255, 0.5)",
              cursor: "pointer",
              transition: "background-color 0.3s",
            }}
          />
        ))}
      </Box>
      {children}
    </Box>
  );
};

export default SlideShow;
