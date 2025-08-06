
import { Button } from '@mui/material';
import { useState } from 'react';
import { Padding } from '@mui/icons-material';
import { Box, Typography } from '@mui/material'
import { Link } from 'react-router-dom';
import SlideShow from '../HomePage/SlideShow';

import { useEffect } from 'react';




function PaymentFailed() {

    useEffect(() => {
        const getPaymentStatus = async () => {
          const urlParams = new URLSearchParams(window.location.search);
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
              console.log("Payment status:", paymentStatus);
      
              // Handle based on the real status
              if (paymentStatus === "succeeded") {
                console.log("Payment successful:", paymentIntentId);
              } else {
                console.log("Payment failed or incomplete:", paymentStatus);
              }
      
              // Send the status to the backend 
              await fetch(`${process.env.REACT_APP_API_URL}/payment-status`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  paymentIntentId: paymentIntentId,
                  status: paymentStatus,
                }),
              });
            } catch (error) {
              console.error("Error checking payment status:", error.message);
            }
          }
        };
      
        getPaymentStatus();
      }, []);       

  return (
    <div>
      There was an error processing your payment, try again later, or contact thorntoncj@gmail.com for direct payments.
    </div>

  );
}

export default PaymentFailed;
