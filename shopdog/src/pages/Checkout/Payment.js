import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Typography, Button, Grid, Divider, TextField, InputAdornment } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const theme = createTheme({
  palette: {
    primary: { main: '#5D4037', light: '#8B6B61', dark: '#321911' },
    background: { default: '#FAF8F6', paper: '#FFFFFF' },
    text: { primary: '#333333', secondary: '#666666' },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h6: { fontWeight: 600 },
    body2: { fontSize: '0.9rem' },
  },
  shape: { borderRadius: 8 },
});

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



const PaymentForm = ({ cartItems, setItemsInCart, clientSecret, shippingAddress, setShippingAddress }) => {
  const [failedToEnterDetails, setFailedToEnterDetails] = useState(false);
  const groupedItems = groupItems(cartItems);
  const subtotal = groupedItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;


  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress({ ...shippingAddress, [name]: value });
    console.log(JSON.stringify(shippingAddress))
  };

  const handleCheckout = async (event) => {
    event.preventDefault();
    if (!stripe || !elements || !clientSecret) {
      console.log("Stripe.js has not loaded yet.");
      return;
    }

    if (shippingAddress.email == '' || shippingAddress.phone == '' || shippingAddress.address == '' || shippingAddress.city == ''
      || shippingAddress.postalCode == '' || shippingAddress.state == '' || shippingAddress.country == '')
    {
      setFailedToEnterDetails(true);
      return;
    }

    const serializeAddress = (address) => {
      return `name=${encodeURIComponent(address.name)}&` +
             `email=${encodeURIComponent(address.email)}&` +
             `phone=${encodeURIComponent(address.phone)}&` +
             `shipping_address=${encodeURIComponent(address.address)}&` +
             `shipping_city=${encodeURIComponent(address.city)}&` +
             `shipping_state=${encodeURIComponent(address.state)}&` +
             `shipping_postal_code=${encodeURIComponent(address.postalCode)}&` +
             `shipping_country=${encodeURIComponent(address.country)}`;

    };

    // Append the address query string to the return_url
    const returnUrl = `${window.location.origin}/paymentsuccess?${serializeAddress(shippingAddress)}`;

    // Confirm the payment with the clientSecret
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: returnUrl, // This will handle the result after the redirect
      },
    });

    console.log("Error:", error);
    console.log("Payment Intent:", paymentIntent);

    if (error) {
      console.error("Payment failed:", error.message);
      navigate('/paymentfailed'); // Redirect to payment failed page

      await fetch(`${process.env.REACT_APP_API_URL}/payment-status`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          paymentIntentId: paymentIntent ? paymentIntent.id : null,
          status: "failed",
        }),
      });
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      console.log("Payment successful", paymentIntent);
      navigate('/paymentsuccess' ); // Redirect to payment success page

      // Send the payment success status to the server
      await fetch(`${process.env.REACT_APP_API_URL}/payment-status`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paymentIntentId: paymentIntent.id,
          status: "succeeded",
        }),
      });
    }
  };

  const appearance = {
    theme: "stripe",
    variables: {
      colorPrimary: "#0570de",
      colorBackground: "#1a1a1a",
      colorText: "#ffffff",
    },
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', p: 3 }}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={7}>
            <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>Shipping Address</Typography>
                {failedToEnterDetails && (
                  <Typography variant="h7" color="red">Please fill out all entries in the form</Typography>
                )}
                <Divider sx={{ mb: 2 }} />
                <form>
                  <TextField
                    label="Full Name"
                    variant="outlined"
                    fullWidth
                    name="name"
                    value={shippingAddress.name}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    name="email"
                    type="email"
                    value={shippingAddress.email}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    label="Phone Number"
                    variant="outlined"
                    fullWidth
                    name="phone"
                    value={shippingAddress.phone}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                    InputProps={{ startAdornment: <InputAdornment position="start">+1</InputAdornment> }}
                  />
                  <TextField
                    label="Street Address"
                    variant="outlined"
                    fullWidth
                    name="address"
                    value={shippingAddress.address}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    label="City"
                    variant="outlined"
                    fullWidth
                    name="city"
                    value={shippingAddress.city}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    label="Postal Code"
                    variant="outlined"
                    fullWidth
                    name="postalCode"
                    value={shippingAddress.postalCode}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    label="State/Province"
                    variant="outlined"
                    fullWidth
                    name="state"
                    value={shippingAddress.state}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    label="Country"
                    variant="outlined"
                    fullWidth
                    name="country"
                    value={shippingAddress.country}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                  />
                </form>
                <Typography variant='h6'>Payment Details</Typography>
                <PaymentElement options={{ ...paymentElementOptions, appearance }} />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>Order Summary</Typography>
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
                  disabled={cartItems.length === 0 || !stripe || !elements}
                  onClick={handleCheckout}
                >
                  Confirm Purchase
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

const Payment = ({ cartItems, setItemsInCart, shippingAddress, setShippingAddress }) => {
  const [clientSecret, setClientSecret] = useState(null);
  const [stripePromise, setStripePromise] = useState(null);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    const subtotal = cartItems.reduce((total, item) => total + item.price, 0);
    const tax = subtotal * 0.1; // 10% tax
    const total = subtotal + tax;

    console.log("Cart Items:", cartItems);
    console.log("Calculated Total Cost:", total);

    setTotalCost(total);

    if (total <= 0) return; // Prevent request if total is 0

    const fetchClientSecret = async () => {
        try {
            console.log("Fetching client secret with amount:", total);
            const response = await fetch(`${process.env.REACT_APP_API_URL}/create-payment-intent`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount: Math.round(total * 100), cartItems }),
            });

            if (!response.ok) {
                throw new Error('Failed to create PaymentIntent');
            }

            const data = await response.json();
            console.log("Received PaymentIntent:", data);
            setClientSecret(data.clientSecret);
            // THIS IS A TEST KEY, This wouldn't be done in production.
            setStripePromise(loadStripe("pk_test_51R5FP0CyZlPHStJdCuTolKP7kOlg3Z6HRzXVDBzzcIS3EsMkNidMbVY08hhNU8ai70FxROjwEBnQ3aIGgpe6GjKC00fpNzLgyF"));
        } catch (error) {
            console.error("Error fetching client secret:", error);
        }
    };

    fetchClientSecret();
}, [cartItems]);

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      {clientSecret ? (
        <PaymentForm cartItems={cartItems} setItemsInCart={setItemsInCart} clientSecret={clientSecret} shippingAddress={shippingAddress} setShippingAddress={setShippingAddress} />
      ) : (
        <div>Loading...</div>
      )}
    </Elements>
  );
};

export default Payment;
