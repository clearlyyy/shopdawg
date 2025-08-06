import React from 'react';
import { Box, Card, CardContent, Typography, Button, Grid, Divider, List, ListItem, ListItemText, IconButton } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Cookies from 'js-cookie'; 
import CloseIcon from '@mui/icons-material/Close'; 

import { Link } from 'react-router-dom';

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

// group items by productName and additionalInfo
const groupItems = (items) => {
  const grouped = items.reduce((acc, item) => {
    const normalizedAdditionalInfo = item.additionalInfo ? item.additionalInfo.trim() : '';
    const key = `${item.productName}|${normalizedAdditionalInfo}`;

    if (!acc[key]) {
      acc[key] = { ...item, quantity: 1 };
    } else {
      acc[key].quantity++;
    }

    return acc;
  }, {});

  return Object.values(grouped);
};

const CheckoutScreen = ({ cartItems, setItemsInCart }) => {
  const groupedItems = groupItems(cartItems);

  const subtotal = groupedItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;

  // remove item from cart
  const handleRemoveItem = (itemToRemove) => {
    const updatedCart = cartItems.filter(item => {
      return !(item.productName === itemToRemove.productName && item.additionalInfo === itemToRemove.additionalInfo);
    });
    
    // Update the state and cookies
    setItemsInCart(updatedCart);
    Cookies.set('cartItems', JSON.stringify(updatedCart), { expires: 7 });
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', p: 3 }}>
        <Grid container spacing={3} justifyContent="center">
          
          {/* Cart Items (Left Section) */}
          <Grid item xs={12} md={7}>
            <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Items in Your Cart
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <List>
                  {groupedItems.length > 0 ? (
                    groupedItems.map((item, index) => (
                      <ListItem key={index} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                          <ListItemText
                            primary={`${item.productName} ${item.quantity > 1 ? `x${item.quantity}` : ''}`}
                            secondary={"$" + item.price}
                          />
                          {item.additionalInfo && (
                            <Typography variant="body2" color="text.secondary">
                              {"Additional Info: " + item.additionalInfo}
                            </Typography>
                          )}
                        </div>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Typography variant="body2">${(item.price * item.quantity).toFixed(2)}</Typography>
                          <IconButton 
                            edge="end" 
                            onClick={() => handleRemoveItem(item)} 
                            sx={{ ml: 2 }}
                          >
                            <CloseIcon color="error" />
                          </IconButton>
                        </Box>
                      </ListItem>
                    ))
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      Your cart is empty.
                    </Typography>
                  )}
                </List>
              </CardContent>
            </Card>
          </Grid>

          {/* Cost Breakdown (Right Section) */}
          <Grid item xs={12} md={4}>
            <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Order Summary
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Subtotal:</Typography>
                  <Typography variant="body2">${subtotal.toFixed(2)}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Estimated Tax (10%):</Typography>
                  <Typography variant="body2">${tax.toFixed(2)}</Typography>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6">Total:</Typography>
                  <Typography variant="h6">${total.toFixed(2)}</Typography>
                </Box>
                <Button 
                  variant="contained" 
                  color="primary" 
                  fullWidth 
                  disabled={cartItems.length === 0}
                  component={Link}
                  to="/payment"

                >
                  Proceed to Checkout
                </Button>
              </CardContent>
            </Card>
          </Grid>

        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default CheckoutScreen;
