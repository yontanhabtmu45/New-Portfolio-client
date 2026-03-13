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
        py: 6,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Contact Information */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Contact Me
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Email sx={{ mr: 1 }} />
              <Typography variant="body2">
                your.email@example.com
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Phone sx={{ mr: 1 }} />
              <Typography variant="body2">
                +1 (555) 123-4567
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <LocationOn sx={{ mr: 1 }} />
              <Typography variant="body2">
                Your City, Country
              </Typography>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Link href="/" color="inherit" sx={{ display: 'block', mb: 1, textDecoration: 'none' }}>
              Home
            </Link>
            <Link href="/about" color="inherit" sx={{ display: 'block', mb: 1, textDecoration: 'none' }}>
              About
            </Link>
            <Link href="/services" color="inherit" sx={{ display: 'block', mb: 1, textDecoration: 'none' }}>
              Services
            </Link>
            <Link href="/portfolio" color="inherit" sx={{ display: 'block', mb: 1, textDecoration: 'none' }}>
              Portfolio
            </Link>
            <Link href="/contact" color="inherit" sx={{ display: 'block', textDecoration: 'none' }}>
              Contact
            </Link>
          </Grid>

          {/* Social Media */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Follow Me
            </Typography>
            <Box>
              <IconButton
                color="inherit"
                href="https://linkedin.com/in/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ mr: 1 }}
              >
                <LinkedIn />
              </IconButton>
              <IconButton
                color="inherit"
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ mr: 1 }}
              >
                <GitHub />
              </IconButton>
              <IconButton
                color="inherit"
                href="https://twitter.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        {/* Copyright */}
        <Box sx={{ borderTop: 1, borderColor: 'rgba(255, 255, 255, 0.2)', mt: 4, pt: 2 }}>
          <Typography variant="body2" align="center">
            © {new Date().getFullYear()} Your Name. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;