import React, { useState } from 'react';
import { Modal, Card, CardMedia, CardContent, Typography, Button, Box, Chip, IconButton, Snackbar, Alert, TextField } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CloseIcon from '@mui/icons-material/Close';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';

const theme = createTheme({
  palette: {
    primary: {
      main: '#5D4037', 
      light: '#8B6B61',
      dark: '#321911',
    },
    background: {
      default: '#FAF8F6',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#333333',
      secondary: '#666666',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h6: {
      fontWeight: 600,
    },
    body2: {
      fontSize: '0.9rem',
    },
  },
  shape: {
    borderRadius: 8,
  },
});

const ProductModal = ({ product, open, onClose, setItemsInCart }) => {
  const [addedToCart, setAddedToCart] = useState(false);  
  const [addedToCartCount, setAddedToCartCount] = useState(0);
  const [additionalInfo, setAdditionalInfo] = useState("");
  if (!product) return null;

  const handleCloseSnackbar = () => {
    setAddedToCart(false);  
  };

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      setAddedToCartCount(0);
      handleCloseSnackbar();
      onClose();
    }
  };

  const handleAddToCart = () => {
    const newProduct = { ...product, additionalInfo: additionalInfo };
    setItemsInCart((prevItems) => [...prevItems, newProduct]);
    setAddedToCart(true);  
    setAddedToCartCount((prevCount) => prevCount + 1);
    setAdditionalInfo("");
  };

  return (
    <ThemeProvider theme={theme}>
      <Modal open={open} onClose={onClose}>
        <Box
          onClick={handleBackdropClick}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            bgcolor: 'rgba(0, 0, 0, 0.4)',
          }}
        >
          <Card
            sx={{
              maxWidth: 500,
              width: '90%',
              boxShadow: 6,
              p: 2,
              position: 'relative',
              bgcolor: 'background.paper',
              borderRadius: 2,
              maxHeight: '80vh',  // Ensure the modal is not too tall
              overflowY: 'auto',  // Enable scrolling if content overflows
            }}
          >
            <IconButton
              onClick={onClose}
              sx={{ position: 'absolute', top: 8, right: 8 }}
            >
              <CloseIcon />
            </IconButton>
            {discount > 0 && (
              <Chip
                label={`${discount}% OFF`}
                color="primary"
                size="small"
                sx={{
                  position: 'absolute',
                  top: 12,
                  left: 12,
                  fontWeight: 'bold',
                }}
              />
            )}
            <CardMedia
              component="img"
              height="250"
              image={product.imageSrc}
              alt={product.productName}
              sx={{ objectFit: 'cover', borderBottom: '3px solid #5D4037', pt: 4, borderRadius: 1 }}
            />
            <CardContent>
              <Typography variant="h6" sx={{ color: theme.palette.primary.dark, mb: 1 }}>
                {product.productName}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {product.description}
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  {product.originalPrice && (
                    <Typography
                      variant="body2"
                      sx={{ textDecoration: 'line-through', color: 'text.secondary', mr: 1 }}
                    >
                      ${product.originalPrice.toFixed(2)}
                    </Typography>
                  )}
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: theme.palette.primary.dark }}>
                    ${product.price.toFixed(2)}
                  </Typography>
                </Box>
                <Chip
                  label={product.inStock ? 'In Stock' : 'Out of Stock'}
                  size="small"
                  sx={{
                    bgcolor: product.inStock ? 'rgba(93, 64, 55, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                    color: product.inStock ? theme.palette.primary.main : 'text.secondary',
                    borderRadius: 1,
                  }}
                />
              </Box>
              {product.custom == true && (
                <div>
                  <Typography variant="body2">
                    For more information, send an email to thorntoncj@gmail.com. Get in contact with me, and we can work out designs
                  </Typography>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Additional Information"
                    multiline
                    rows={4}
                    value={additionalInfo}
                    onChange={(e) => setAdditionalInfo(e.target.value)}
                    sx={{
                      mt: 0,
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 1,
                      },
                      '& .MuiInputLabel-root': {
                        fontSize: '0.9rem',
                      },
                      '& .MuiInputBase-input': {
                        fontSize: '0.9rem',
                      },
                    }}
                  />
                </div>
              )}
              <Button
                fullWidth
                variant="contained"
                color="primary"
                startIcon={<ShoppingCartIcon />}
                disabled={!product.inStock}
                onClick={handleAddToCart}
                sx={{ mt: 2, borderRadius: theme.shape.borderRadius }}
                component={motion.button}  
                whileTap={{ scale: 0.95 }}  
                transition={{ type: "spring", stiffness: 400, damping: 10 }}  
              >
                Add to Cart
              </Button>

              {addedToCart && (
                <Alert severity="success" onClose={handleCloseSnackbar} sx={{ width: '90%', margin: "0 auto", marginTop: 2, textAlign: 'center', }}>
                  {product.productName} added to cart! x{addedToCartCount} | <a href="/checkout">View Cart?</a>
                </Alert>
              )}
            </CardContent>
          </Card>
        </Box>
      </Modal>
    </ThemeProvider>
  );
};

export default ProductModal;
