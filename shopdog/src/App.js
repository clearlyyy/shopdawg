import logo from './logo.svg';
import { Button } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';
import Navbar from './UI/Navbar';

import Cookies from 'js-cookie';

import { Box } from '@mui/material';

import HomePage from './pages/HomePage/HomePage.js'
import Gallery from './pages/Gallery/Gallery.js';
import About from './pages/About/About.js';
import Contact from './pages/Contact/Contact.js';
import Shop from './pages/Shop/Shop.js'
import Checkout from './pages/Checkout/CheckoutScreen.js';
import CheckoutScreen from './pages/Checkout/CheckoutScreen.js';
import Payment from './pages/Checkout/Payment.js';
import PaymentSuccess from './pages/Checkout/PaymentSuccess.js';
import PaymentFailed from './pages/Checkout/PaymentFailed.js';


const theme = createTheme({
  palette: {
    primary: {
      main: '#d69a2b', // Customize your primary color
    },
    secondary: {
      main: '#f50057', // Customize your secondary color
    },
  },
});


function App() {

  const [itemsInCart, setItemsInCart] = useState(() => {
    const savedCart = Cookies.get('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [shippingAddress, setShippingAddress] = useState({
      name: '', email: '', phone: '', address: '', city: '', postalCode: '', state: '', country: '',
    });

  useEffect(() => {
    if (itemsInCart.length > 0) {
      Cookies.set('cartItems', JSON.stringify(itemsInCart), { expires: 7 }); // Expires in 7 days
    }
  }, [itemsInCart]);

  const theme = createTheme({
    palette: {
      primary: {
        main: '#3f51b5', 
      },
      secondary: {
        main: '#f50057', 
      },
      background: {
        default: '#cc241d', 
        paper: '#ffffff', 
      }
    },
  });

  return (
    <ThemeProvider theme={theme}>  
    <Router>
      <Navbar itemsInCart={itemsInCart}/>
        <Box sx={{ marginTop: '80px' }}> 
          <Routes>
            <Route path="/" element={<HomePage itemsInCart={setItemsInCart} setItemsInCart={setItemsInCart}/>}/>
            <Route path="/shop" element={<Shop setItemsInCart={setItemsInCart}/>}/>
            <Route path="/gallery" element={<Gallery />}/>
            <Route path="/about" element={<About />}/>
            <Route path="/contact" element={<Contact />}/>
            <Route path="/checkout" element={<CheckoutScreen cartItems={itemsInCart} setItemsInCart={setItemsInCart}/>}/>
            <Route path="/payment" element={<Payment cartItems={itemsInCart} setItemsInCart={setItemsInCart} shippingAddress={shippingAddress} setShippingAddress={setShippingAddress}/>}/>
            <Route path="/paymentsuccess" element={<PaymentSuccess shippingAddress={shippingAddress}/>}/>
            <Route path="/paymentfailed" element={<PaymentFailed />}/>
          </Routes>
        </Box>
    </Router>
    </ThemeProvider>
  );
}

export default App;
