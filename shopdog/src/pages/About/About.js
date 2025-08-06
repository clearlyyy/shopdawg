import { Button } from '@mui/material';
import { useState } from 'react';
import { Padding } from '@mui/icons-material';
import { Box, Typography, Container, Grid, Paper, Card, CardMedia, CardContent, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import SlideShow from '../HomePage/SlideShow';

function About() {
  return (
    <div>
      <SlideShow>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 2, // Higher than the slideshow elements
            textAlign: 'center',
            width: '100%',
            color: 'white',
            textShadow: '2px 2px 8px rgba(0,0,0,0.7)'
          }}
        >
          <Typography variant="h2">Shop Dawg Woodworking</Typography>
          <Typography variant="h5" sx={{ mt: 2 }}>About</Typography>
          <Button
            component={Link}
            to="/shop"
            variant="contained"
            color="primary"
            sx={{ mt: 4, px: 4, py: 1, backgroundColor: "#5D4037", fontWeight: "bold" }}
          >
            Shop
          </Button>
        </Box>
      </SlideShow>

      {/* About Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        {/* Our Story Section */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h3" component="h2" align="center" gutterBottom sx={{ fontWeight: 'bold', color: '#5D4037' }}>
            Our Story
          </Typography>
          <Divider sx={{ mb: 4, borderColor: '#5D4037', width: '10%', mx: 'auto', borderWidth: 2 }} />
          
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box component="img" 
                src="/assets/images/selfie.jpg" 
                alt="Master craftsman working on a wooden piece" 
                sx={{ 
                  width: '100%', 
                  height: 'auto', 
                  borderRadius: 2,
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
                Shop Dawg Woodworking was born from a simple passion: creating beautiful, functional pieces from nature's most versatile material. What started as a weekend hobby in a small garage has grown into a thriving workshop dedicated to the timeless craft of woodworking.
              </Typography>
              <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
                Founded in 2015 by master craftsman John Dawkins, our small team of artisans combines traditional techniques with modern design sensibilities to create pieces that stand the test of time.
              </Typography>
            </Grid>
          </Grid>
        </Box>

        {/* Our Craft Section */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h3" component="h2" align="center" gutterBottom sx={{ fontWeight: 'bold', color: '#5D4037' }}>
            Our Craft
          </Typography>
          <Divider sx={{ mb: 4, borderColor: '#5D4037', width: '10%', mx: 'auto', borderWidth: 2 }} />
          
          <Typography variant="body1" paragraph align="center" sx={{ fontSize: '1.1rem', lineHeight: 1.8, mb: 6, maxWidth: '800px', mx: 'auto' }}>
            Every piece that leaves our workshop represents the perfect balance between form and function. We believe in creating furniture and accessories that not only look beautiful but serve a purpose in your daily life.
          </Typography>
          
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%', boxShadow: '0 5px 15px rgba(0,0,0,0.08)', transition: 'transform 0.3s ease', '&:hover': { transform: 'translateY(-5px)' } }}>
                <CardMedia
                  component="img"
                  height="200"
                  image="/assets/images/lumber.jpeg"
                  alt="Sustainable materials"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div" sx={{ color: '#5D4037' }}>
                    Sustainable Materials
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    We source our wood from sustainable forests and salvage operations, ensuring that our environmental footprint remains minimal while providing you with the highest quality materials.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%', boxShadow: '0 5px 15px rgba(0,0,0,0.08)', transition: 'transform 0.3s ease', '&:hover': { transform: 'translateY(-5px)' } }}>
                <CardMedia
                  component="img"
                  height="200"
                  image="/assets/images/IMG_5235.JPEG"
                  alt="Handcrafted quality"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div" sx={{ color: '#5D4037' }}>
                    Handcrafted Quality
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Each piece is meticulously handcrafted in our workshop. From joinery to finishing, every step is performed with attention to detail that mass production simply cannot match.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%', boxShadow: '0 5px 15px rgba(0,0,0,0.08)', transition: 'transform 0.3s ease', '&:hover': { transform: 'translateY(-5px)' } }}>
                <CardMedia
                  component="img"
                  height="200"
                  image="/assets/images/IMG_6959.JPEG"
                  alt="Custom designs"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div" sx={{ color: '#5D4037' }}>
                    Custom Designs
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Beyond our standard collection, we work closely with clients to create bespoke pieces that perfectly suit their needs, spaces, and aesthetic preferences.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>

        {/* Workshop Section */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h3" component="h2" align="center" gutterBottom sx={{ fontWeight: 'bold', color: '#5D4037' }}>
            The Workshop
          </Typography>
          <Divider sx={{ mb: 4, borderColor: '#5D4037', width: '10%', mx: 'auto', borderWidth: 2 }} />
          
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
                Located in Kamloops, BC, This is where all of my projects are made.
              </Typography>
              <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
              At Shop Dawg Woodworking, every product is hand-crafted with care and precision. Using traditional techniques, we create each piece with attention to detail, ensuring every item is unique and of the highest quality. From the first cut to the final finish, we take pride in crafting functional, beautiful pieces that will be cherished for years to come. Our workshop is where passion and craftsmanship come together to create timeless, handmade creations.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box component="img" 
                src="/assets/images/woodshop.jpg" 
                alt="Our workshop space" 
                sx={{ 
                  width: '100%', 
                  height: 'auto', 
                  borderRadius: 2,
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                }}
              />
            </Grid>
          </Grid>
        </Box>

        {/* CTA Section */}
        <Box sx={{ textAlign: 'center', backgroundColor: '#f5f5f5', py: 6, px: 4, borderRadius: 2 }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ color: '#5D4037', fontWeight: 'bold' }}>
            Ready to bring your vision to life?
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, maxWidth: '800px', mx: 'auto' }}>
            Whether you're looking for a signature piece from our collection or dreaming of a custom creation, we're here to help.
          </Typography>
          <Button
            component={Link}
            to="/contact"
            variant="contained"
            color="primary"
            size="large"
            sx={{ mr: 2, backgroundColor: "#5D4037", fontWeight: "bold" }}
          >
            Contact Us
          </Button>
          <Button
            component={Link}
            to="/shop"
            variant="outlined"
            color="primary"
            size="large"
            sx={{ borderColor: "#5D4037", color: "#5D4037", fontWeight: "bold" }}
          >
            Shop Collection
          </Button>
        </Box>
      </Container>
    </div>
  );
}

export default About;