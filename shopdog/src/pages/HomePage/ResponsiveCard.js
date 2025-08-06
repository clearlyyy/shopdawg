import React from "react";
import { Card, Box, Grid, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const ResponsiveCard = () => {
  return (
    <Card
      sx={{
        borderRadius: 0,
        boxShadow: 0,
        maxWidth: "1260px",
        padding: "50px",
        margin: "0 auto",
        position: "relative",
        zIndex: -1,
      }}
    >
      <Grid container direction={{ xs: "column", md: "row", zIndex: 1 }}>
        <Grid item xs={12} md={6}>
          <Box padding={2} position="relative">
            <Box
              component="img"
              src={`${process.env.PUBLIC_URL}/assets/images/logoBlack.svg`}
              alt="Background"
              sx={{
                position: "absolute",
                left: 0,
                bottom: 10,
                width: 400,
                height: "auto",
                opacity: 0.1,
                zIndex: 0,
                transform: "rotate(-10deg)",
              }}
            />
            <Typography
              variant="h4"
              fontWeight="bold"
              color="#5D4037"
              sx={{ pb: 3 }}
            >
              Independent Family Run Business
            </Typography>

            <Typography variant="h4"></Typography>
            <Typography variant="body1" color="#2e2e2e">
              {" "}
              At Shop Dawg Woodworking, we’re passionate about creating custom
              woodwork that blends functionality and beauty. From handcrafted
              furniture and custom cabinetry to unique wood accents for homes
              and businesses, our skilled team brings your ideas to life with
              precision and craftsmanship. We use only the highest-quality
              materials to ensure every project is not only visually stunning
              but built to last for generations.
            </Typography>

            <Typography variant="body1" color="#2e2e2e" sx={{ pt: 3 }}>
              We believe in a personalized approach, working closely with each
              client to understand their vision and needs. Whether it's a single
              custom piece or an entire renovation, we take pride in every
              project, big or small. At Shop Dawg Woodworking, our goal is to
              deliver exceptional results that exceed expectations and create
              lasting impressions.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box padding={2}>
            <img
              src={`${process.env.PUBLIC_URL}/assets/images/IMG_5332.JPEG`}
              alt="Me"
              style={{
                width: "90%",
                height: "auto",
                borderRadius: "10px",
                zIndex: 2,
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
};

export default ResponsiveCard;
