import React from 'react';
import { Box, Container, Grid, Typography, Link, IconButton } from '@mui/material';
import { Email, Phone, LocationOn, LinkedIn, GitHub, Twitter } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'primary.main',
        color: 'primary.contrastText',
      }}
    >
      <Container maxWidth="lg">

        {/* Copyright */}
        <Box sx={{ borderColor: 'rgba(255, 255, 255, 0.2)', p: 2 }}>
          <Typography variant="body2" align="center">
            © {new Date().getFullYear()} Yonatan Habtamu. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;