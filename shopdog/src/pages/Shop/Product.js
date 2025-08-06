import React, { useState } from 'react';
import { 
  Card, 
  CardMedia, 
  CardContent, 
  Typography, 
  Button, 
  Box, 
  Rating, 
  Chip,
  ThemeProvider,
  createTheme,
  Snackbar,
  Alert,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';


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

const ProductCard = ({
  product,
  onClick,
  setItemsInCart
}) => {

  const handleAddToCart = () => {
    setItemsInCart((prevItems) => [...prevItems, product]); 
  };

 

  
  const discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;

  return (
    <ThemeProvider theme={theme}>
      <Card 
        onClick={() => onClick(product)}
        sx={{ 
          maxWidth: 320,
          boxShadow: '0 4px 12px rgba(93, 64, 55, 0.15)',
          transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 12px 20px rgba(93, 64, 55, 0.2)',
          },
          position: 'relative',
          overflow: 'visible',
          cursor: "pointer"
        }}
      >
        {discount > 0 && (
          <Chip
            label={`${discount}% OFF`}
            color="primary"
            size="small"
            sx={{
              position: 'absolute',
              top: 12,
              left: 12,
              zIndex: 1,
              fontWeight: 'bold',
            }}
          />
        )}
        
        
        
        <CardMedia
          component="img"
          height="180"
          image={product.imageSrc}
          alt={product.productName}
          sx={{ 
            borderBottom: '3px solid #5D4037',
            objectFit: 'cover',
            cursor: 'pointer'
          }}
        />
        
        <CardContent sx={{ p: 2 }}>
          <Typography variant="h6" component="div" sx={{ mb: 0.5, color: theme.palette.primary.dark }}>
            {product.productName}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ 
            height: 60,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            mb: 1.5
          }}>
            {product.description}
          </Typography>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {product.originalPrice && (
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      textDecoration: 'line-through', 
                      color: 'text.secondary',
                      mr: 1 
                    }}
                  >
                    ${product.originalPrice.toFixed(2)}
                  </Typography>
                )}
                <Typography variant="h6" color="primary.dark" sx={{ fontWeight: 'bold' }}>
                  ${product.price.toFixed(2)}
                </Typography>
              </Box>
              <Chip 
                label={product.inStock ? "In Stock" : "Out of Stock"} 
                size="small"
                sx={{ 
                  height: 20, 
                  fontSize: '0.7rem',
                  bgcolor: product.inStock ? 'rgba(93, 64, 55, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                  color: product.inStock ? theme.palette.primary.main : 'text.secondary',
                  borderRadius: 1,
                  mt: 0.5
                }}
              />
            </Box>
            
            <Button 
              variant="contained" 
              color="primary" 
              startIcon={<ShoppingCartIcon />}
              disabled={!product.inStock}
              sx={{ 
                borderRadius: theme.shape.borderRadius,
                textTransform: 'none',
                boxShadow: 2,
                '&:hover': {
                  boxShadow: 4,
                  bgcolor: theme.palette.primary.dark
                }
              }}
            >
              Add
            </Button>
          </Box>
        </CardContent>
      </Card>
      
    </ThemeProvider>
  );
};

export default ProductCard;