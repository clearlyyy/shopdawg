import React from "react";
import { Card, Box, Grid, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const CustomContact = () => {
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "#5D4037",
        position: "relative",
        overflow: "hidden",
        minHeight: "auto",
        paddingBottom: "50px",
      }}
    >
      <Card
        sx={{
          borderRadius: 0,
          boxShadow: 0,
          maxWidth: "1260px",
          padding: "50px",
          margin: "0 auto",
          position: "relative",
          zIndex: 0,
          backgroundColor: "#5D4037",
        }}
      >
        <Grid container direction={{ xs: "column", md: "row" }} spacing={4}>
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
                variant="h2"
                fontWeight="bold"
                color="#e0d1cc"
                sx={{ pb: 3 }}
              >
                Want To Go Custom?
              </Typography>
              <Typography variant="body1" color="#e0d1cc">
                Contact me below, or send me an email at thorntoncj@gmail.com
              </Typography>
              <Link to="/contact" style={{ textDecoration: "none" }}>
                <Button
                  variant="contained"
                  sx={{
                    mt: 4,
                    backgroundColor: "#3E2723",
                    "&:hover": {
                      backgroundColor: "#5D4037",
                    },
                  }}
                >
                  Contact Me
                </Button>
              </Link>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box padding={2}>
              <img
                src={`${process.env.PUBLIC_URL}/assets/images/IMG_6961.JPEG`}
                alt="Me"
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "10px",
                  zIndex: 2,
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};

export default CustomContact;
