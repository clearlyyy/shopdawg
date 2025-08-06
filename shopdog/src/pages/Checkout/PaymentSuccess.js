
import { useState } from 'react';
import { Padding } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import SlideShow from '../HomePage/SlideShow';
import { Box, Typography, Card, CardContent, Button, Grid } from '@mui/material';

import Cookies from 'js-cookie';



function PaymentSuccess({}) {

    const navigate = useNavigate();

    useEffect(() => {
        const getPaymentStatus = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const shippingAddress = {
                name: urlParams.get('name'),
                email: urlParams.get('email'),
                phone: urlParams.get('phone'),
                address: urlParams.get('shipping_address'),
                city: urlParams.get('shipping_city'),
                state: urlParams.get('shipping_state'),
                postal_code: urlParams.get('shipping_postal_code'),
                country: urlParams.get('shipping_country'),
              };
            const paymentIntentId = urlParams.get('payment_intent');

            if (paymentIntentId) {
                try {
                    // Fetch payment status from backend
                    const response = await fetch(`${process.env.REACT_APP_API_URL}/payment-status/${paymentIntentId}`);
                    const data = await response.json();

                    if (!response.ok) {
                        throw new Error(data.error || "Failed to fetch payment status");
                    }

                    const paymentStatus = data.status; // Extract the actual status

                    //Get items in cart from cookies, and send it to the server
                    const storedCart = Cookies.get('cartItems');

                    if (paymentStatus === "succeeded") {
                        console.log("SHipping add: " + JSON.stringify(shippingAddress));
                        // Send both payment status and shipping address to the backend
                        await fetch(`${process.env.REACT_APP_API_URL}/payment-status`, {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                paymentIntentId: paymentIntentId,
                                status: paymentStatus,
                                shippingAddress: shippingAddress,
                                cartItems: storedCart

                            }),
                        });
                    } else {
                        console.log("Payment Failed.");
                        navigate("/paymentfailed");
                    }
                } catch (error) {
                    console.log("ERROR: " + error);
                }
            }
        };

        getPaymentStatus();
    }, []);

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f4f4f4' }}>
          <Card sx={{ width: '100%', maxWidth: 600, boxShadow: 3 }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="#5D4037" sx={{ marginBottom: 2 }}>
                Payment Successful!
              </Typography>
              <Typography variant="h6" color="textSecondary" sx={{ marginBottom: 3 }}>
                Thank you for your purchase. Your order has been processed successfully.
              </Typography>
              
              <Typography variant="body1" color="textSecondary" sx={{ marginBottom: 3 }}>
                We’ve received your payment, and we are preparing your order.
                For any questions, contact thorntoncj@gmail.com

              </Typography>
    
              <Grid container spacing={2} justifyContent="center">
                
                <Grid item>
                  <Link to="/" style={{ textDecoration: 'none' }}>
                    <Button variant="contained" sx={{ width: 200, backgroundColor: "#5D4037"}}>
                      Back to Home
                    </Button>
                  </Link>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Box>
      );
  }
  
  export default PaymentSuccess;