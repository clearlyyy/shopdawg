
import { Button } from '@mui/material';
import { useState, useEffect } from 'react';
import { Padding } from '@mui/icons-material';
import { Box, Typography, Grid } from '@mui/material'
import { useLocation } from 'react-router-dom';

import SlideShow from '../HomePage/SlideShow';
import { Link } from 'react-router-dom';

import ProductCard from "./Product.js"
import ProductModal from './ProductModal.js';




function Shop({itemsInCart, setItemsInCart}) {


    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const category = queryParams.get('category') || 'All';

    useEffect(() => {
      fetch(`${process.env.REACT_APP_API_URL}/api/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error Fetching Products", err));
    }, [])

    const handleOpenModal = (product) => {
      setSelectedProduct(product);
      setModalOpen(true);
    }

    const handleCloseModal = () => {
      setModalOpen(false);
      setSelectedProduct(null);
    }

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
          <Typography variant="h5" sx={{ mt: 2 }}>{category}</Typography>
          <Button 
            component={Link}
            to="/contact"
            variant="contained" 
            color="primary" 
            sx={{ mt: 4, px: 4, py: 1, backgroundColor: "#5D4037",fontWeight: "bold" }}
          >
            Contact
          </Button>
        </Box>
      </SlideShow>
      <Box sx={{
        maxWidth: '1260px',
        margin: '0 auto',
        marginTop: '50px',
        padding: '20px',
      }}>
      {products.length > 0 ? (
      <Grid container spacing={5}>
      {products.map((product, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                <ProductCard product={product} onClick={handleOpenModal} setItemsInCart={setItemsInCart}/>
          </Grid>
      ))}
      </Grid>
      ) : (
            <Typography variant="h5" align="center" sx={{ mt: 5 }}>
            Error occured while loading products. 
            <Typography variant="h5" align="center" sx={{ mt: 5 }}>
            Please Refresh the Page, or try again later.
            
          </Typography>
          </Typography>
          
      )}
      <ProductModal open={modalOpen} product={selectedProduct} onClose={handleCloseModal} setItemsInCart={setItemsInCart}/>
      </Box>
      
      
    </div>

  );
}

export default Shop;
