import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  Chip,
  Avatar,
  Divider
} from '@mui/material';
import { Code, DesignServices, Storage, ArrowForward } from '@mui/icons-material';
import Header from '../components/Header/header';
import Footer from '../components/Footer/Footer';

const Home = () => {
  const skills = [
    { name: 'React', icon: <Code />, color: '#61dafb' },
    { name: 'Node.js', icon: <Storage />, color: '#68a063' },
    { name: 'UI/UX Design', icon: <DesignServices />, color: '#ff6b6b' },
  ];

  const featuredProjects = [
    {
      title: 'E-commerce Platform',
      description: 'A full-stack e-commerce solution with modern UI and secure payments.',
      technologies: ['React', 'Node.js', 'MongoDB'],
      image: '/api/placeholder/300/200'
    },
    {
      title: 'Task Management App',
      description: 'Collaborative project management tool with real-time updates.',
      technologies: ['React', 'Express', 'Socket.io'],
      image: '/api/placeholder/300/200'
    },
    {
      title: 'Portfolio Website',
      description: 'Responsive portfolio website showcasing projects and skills.',
      technologies: ['React', 'Material-UI', 'Vite'],
      image: '/api/placeholder/300/200'
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Header />

      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: 12,
          textAlign: 'center'
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            Hi, I'm Yonatan Habtamu
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 4 }}>
            Full Stack Developer 
          </Typography>
          <Typography variant="body1" sx={{ mb: 6, fontSize: '1.2rem' }}>
            I create beautiful, functional web applications that solve real-world problems.
            Passionate about clean code, user experience, and innovative solutions.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              size="large"
              component={Link}
              to="/portfolio"
              sx={{
                backgroundColor: 'white',
                color: '#667eea',
                '&:hover': { backgroundColor: '#f5f5f5' }
              }}
            >
              View My Work
            </Button>
            <Button
              variant="outlined"
              size="large"
              component={Link}
              to="/contact"
              sx={{
                borderColor: 'white',
                color: 'white',
                '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }
              }}
            >
              Get In Touch
            </Button>
          </Box>
        </Container>
      </Box>

      

     
        <Footer />

      
    </div>
  );
};

export default Home;