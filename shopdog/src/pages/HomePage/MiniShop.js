import { IconButton, Button } from '@mui/material';
import { useState, useEffect, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import ProductCard from "../Shop/Product.js";
import ProductModal from '../Shop/ProductModal.js';

function MiniShop({ itemsInCart, setItemsInCart }) {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const productContainerRef = useRef(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error Fetching Products", err));
  }, []);

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedProduct(null);
  };

  // Scroll through products by a fixed amount
  const scrollProducts = (direction) => {
    const container = productContainerRef.current;
    if (container) {
      const scrollAmount = direction === "left" ? -300 : 300;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div>
      <Box sx={{
        maxWidth: '1260px',
        margin: '0 auto',
        marginTop: '10px',
        padding: '20px',
        position: 'relative',
      }}>
        <Typography variant="h4" sx={{ mb: 1, textAlign: "center", color: "#5D4037", fontWeight: "bold" }}>Some Products</Typography>

        {/* Left Navigation Button */}
        <IconButton
          onClick={() => scrollProducts('left')}
          sx={{
            color: "white",
            position: 'absolute',
            left: 20,
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: '#5D4037',
            '&:hover': {
              backgroundColor: '#8B6B61',
            },
            zIndex: 3,
          }}
        >
          <ArrowBackIos sx={{ transform: 'translateX(4px)'}} />
        </IconButton>

        {/* Right Navigation Button */}
        <IconButton
          onClick={() => scrollProducts('right')}
          sx={{
            color: "white",
            position: 'absolute',
            right: 20,
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: '#5D4037',
            '&:hover': {
              backgroundColor: '#8B6B61',
            },
            zIndex: 3,
          }}
        >
          <ArrowForwardIos />
        </IconButton>

        {products.length > 0 ? (
          <Box sx={{
            display: 'flex',
            overflowX: 'scroll',
            gap: '20px',
            paddingBottom: '20px',
          }} ref={productContainerRef}>
            {products.slice(0, 7).map((product, index) => (
              <div key={index} style={{ minWidth: '250px' }}>
                <ProductCard product={product} onClick={handleOpenModal} setItemsInCart={setItemsInCart} />
              </div>
            ))}
          </Box>
        ) : (
          <Typography variant="h5" align="center" sx={{ mt: 5 }}>
            Error occurred while loading products. Please Refresh the Page, or try again later.
          </Typography>
        )}

        <Box sx={{ textAlign: 'center', mt: 0 }}>
          <Typography variant="h6" color="#5D4037" sx={{ mb: 0, fontWeight: "bold" }}>
            Want to see more?
          </Typography>
          <Link to="/shop" style={{ textDecoration: 'none' }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#3E2723", 
                "&:hover": {
                  backgroundColor: "#5D4037", 
                },
              }}
            >
              Go to Shop
            </Button>
          </Link>
        </Box>

        <ProductModal open={modalOpen} product={selectedProduct} onClose={handleCloseModal} setItemsInCart={setItemsInCart} />
      </Box>
    </div>
  );
}

export default MiniShop;
