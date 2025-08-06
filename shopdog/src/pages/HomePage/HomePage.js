
import { Button } from '@mui/material';
import { useState } from 'react';
import { Margin, Padding } from '@mui/icons-material';
import { Box, Typography, Stack } from '@mui/material'
import SlideShow from './SlideShow';
import ResponsiveCard from './ResponsiveCard';

import "../../styles/common.css"

import { Link } from 'react-router-dom';
import ResponsiveImageGrid from './ResponsiveImageGrid';
import MiniShop from './MiniShop';
import CustomContact from './CustomContact';

function HomePage({itemsInCart, setItemsInCart}) {
  
  return (
    <div>
      <SlideShow>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 2, 
            textAlign: 'center',
            width: '100%',
            color: 'white',
            textShadow: '2px 2px 8px rgba(0,0,0,0.7)'
          }}
        >
          <Typography variant="h2" fontWeight="bold">Shop Dawg Woodworking</Typography>
          <Typography variant="h5" fontWeight="bold" sx={{ mt: 2 }}>Timeless quality built to last generations</Typography>
          <Button 
            component={Link}
            to="/shop"
            variant="contained" 
            sx={{ mt: 4, px: 4, py: 1, backgroundColor: "#5D4037",fontWeight: "bold" }}
          >
            Shop Now
          </Button>
          <Button 
            component={Link}
            to="/contact"
            variant="contained"
            
            sx={{ mt: 4, px: 4, py: 1, marginLeft: 5, backgroundColor: "#8B6B61", fontWeight: "bold"}}
          >
            Contact
          </Button>
        </Box>
      </SlideShow>
      <div style={{padding: 10, position: "relative"}}>
        
        <ResponsiveCard/>
        </div>

          <ResponsiveImageGrid/>
        

        <div style={{width: "100%", height: 580}}>
          <MiniShop itemsInCart={itemsInCart} setItemsInCart={setItemsInCart}/>
        </div>

        <CustomContact/>

        <footer style={{backgroundColor: "#5D4037", color: "#e0d1cc", padding: 10, fontSize: 12}}>Shop Dawg Woodworking @ 2025</footer>
      
    </div>

  );
}

export default HomePage;
