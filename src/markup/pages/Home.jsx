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
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
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
            Hi, I'm Your Name
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 4 }}>
            Full Stack Developer & UI/UX Designer
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

      {/* About Preview Section */}
      {/* <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h3" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
              About Me
            </Typography>
            <Typography variant="body1" paragraph>
              I'm a passionate full-stack developer with over 5 years of experience creating
              digital solutions that make a difference. I specialize in modern web technologies
              and love turning complex problems into simple, beautiful designs.
            </Typography>
            <Typography variant="body1" paragraph>
              When I'm not coding, you can find me exploring new technologies, contributing to
              open-source projects, or sharing knowledge with the developer community.
            </Typography>
            <Button
              variant="outlined"
              component={Link}
              to="/about"
              endIcon={<ArrowForward />}
              sx={{ mt: 2 }}
            >
              Learn More About Me
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                height: 300,
                backgroundColor: '#f5f5f5',
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Typography variant="h6" color="text.secondary">
                Profile Image Placeholder
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container> */}

      <Divider />

      {/* Skills Preview Section */}
      {/* <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" component="h2" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
          My Skills
        </Typography>
        <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 6 }}>
          Technologies and tools I work with
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {skills.map((skill, index) => (
            <Grid item key={index}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  p: 3,
                  borderRadius: 2,
                  boxShadow: 2,
                  '&:hover': { transform: 'translateY(-4px)', transition: '0.3s' }
                }}
              >
                <Avatar sx={{ bgcolor: skill.color, width: 60, height: 60, mb: 2 }}>
                  {skill.icon}
                </Avatar>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  {skill.name}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button
            variant="outlined"
            component={Link}
            to="/services"
            endIcon={<ArrowForward />}
          >
            View All Skills & Services
          </Button>
        </Box>
      </Container> */}

      <Divider />

      {/* Featured Projects Section */}
      {/* <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" component="h2" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
          Featured Projects
        </Typography>
        <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 6 }}>
          Some of my recent work
        </Typography>
        <Grid container spacing={4}>
          {featuredProjects.map((project, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  '&:hover': { boxShadow: 6, transition: '0.3s' }
                }}
              >
                <Box
                  sx={{
                    height: 200,
                    backgroundColor: '#f5f5f5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    Project Image
                  </Typography>
                </Box>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                    {project.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {project.description}
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {project.technologies.map((tech, techIndex) => (
                      <Chip
                        key={techIndex}
                        label={tech}
                        size="small"
                        variant="outlined"
                      />
                    ))}
                  </Box>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary">
                    View Details
                  </Button>
                  <Button size="small" color="primary">
                    Live Demo
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button
            variant="contained"
            component={Link}
            to="/portfolio"
            endIcon={<ArrowForward />}
          >
            View All Projects
          </Button>
        </Box>
      </Container> */}

      {/* Call to Action Section */}
      {/* <Box
        sx={{
          backgroundColor: '#f8f9fa',
          py: 8,
          textAlign: 'center'
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h3" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
            Let's Work Together
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
            I'm always interested in new opportunities and exciting projects.
          </Typography>
          <Button
            variant="contained"
            size="large"
            component={Link}
            to="/contact"
            sx={{
              px: 4,
              py: 1.5,
              fontSize: '1.1rem'
            }}
          >
            Get In Touch
          </Button>
        </Container>
      </Box> */}

      {/* <Footer /> */}
    </div>
  );
};

export default Home;