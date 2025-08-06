import { Button } from '@mui/material';
import { useState } from 'react';
import { Box, Typography, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import emailjs from 'emailjs-com';

import SlideShow from '../HomePage/SlideShow';

function Contact() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    // Combine the fields into one message
    const combinedMessage = `
      Name: ${name}
      Email: ${email}
      
      Message:
      ${message}
    `;
  
    // Send the combined message using EmailJS
    emailjs
      .send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID, 
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID, 
        {
          user_name: name,
          user_email: email,
          message: combinedMessage,
        },
        process.env.REACT_APP_EMAILJS_USER_ID
      )
      .then(
        (result) => {
          setIsSubmitting(false);
          setStatus('Email sent successfully!');
          setName('');
          setEmail('');
          setMessage('');
        },
        (error) => {
          setIsSubmitting(false);
          setStatus('Error sending email, please try again later or email me at thorntoncj@gmail.com');
        }
      );
  };

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
          <Typography variant="h5" fontWeight="bold" sx={{ mt: 2 }}>Contact Me</Typography>
          <Button 
            component={Link}
            to="/shop"
            variant="contained" 
            sx={{ mt: 4, px: 4, py: 1, backgroundColor: "#5D4037", fontWeight: "bold" }}
          >
            Shop Now
          </Button>
        </Box>
      </SlideShow>
      {/* Contact Form */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '500px',
          backgroundColor: '#fff',
          padding: '20px',
          zIndex: 1,
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            backgroundColor: '#F5F5F5',
            padding: '20px',
            borderRadius: '8px',
            width: '100%',
            maxWidth: '500px',
            boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Typography variant="h4" textAlign="center" sx={{ mb: 0, color: '#5D4037', fontWeight: "bold" }}>
            Get in Touch
          </Typography>
          <Typography variant="body2" textAlign="center" sx={{ mb: 1, color: '#8B6B61', fontWeight: "bold" }}>
            Or send me an email at thorntoncj@gmail.com
          </Typography>

          <TextField
            label="Your Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            color='#5D4037'
            name="user_name"
          />

          <TextField
            label="Your Email"
            type="email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            color='#5D4037'
            name="user_email"  
          />

          <TextField
            label="Your Message"
            variant="outlined"
            fullWidth
            margin="normal"
            multiline
            rows={8}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            color='#5D4037'
            name="message" 
          />

          {status && (
            <Typography variant="body1" color={status.includes('Error') ? 'red' : 'green'} sx={{ mt: 2 }}>
              {status}
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 3,
              backgroundColor: '#5D4037',
              '&:hover': {
                backgroundColor: '#3E2723',
              },
            }}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </Button>
        </Box>
      </Box>
      <footer style={{color: "#3E2723", padding: 10, fontSize: 12}}>Shop Dawg Woodworking @ 2025</footer>
    </div>
  );
}

export default Contact;
