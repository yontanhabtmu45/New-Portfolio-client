import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Button,
  Chip,
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Divider,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import {
  Close,
  Launch,
  GitHub,
  Code,
  Web,
  Smartphone,
  Cloud,
  ArrowForward,
  FilterList
} from '@mui/icons-material';
import Header from '../components/Header/header';
import Footer from '../components/Footer/Footer';

const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [open, setOpen] = useState(false);

  const categories = [
    { id: 'all', label: 'All Projects', icon: <FilterList /> },
    { id: 'web', label: 'Web Apps', icon: <Web /> },
    { id: 'mobile', label: 'Mobile Apps', icon: <Smartphone /> },
    { id: 'fullstack', label: 'Full Stack', icon: <Code /> },
    { id: 'cloud', label: 'Cloud Solutions', icon: <Cloud /> }
  ];

  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      category: 'fullstack',
      description: 'A comprehensive e-commerce solution with user authentication, payment processing, and admin dashboard.',
      longDescription: 'Built a full-featured e-commerce platform from scratch using the MERN stack. Features include user registration/login, product catalog, shopping cart, secure payment integration with Stripe, order management, and an admin dashboard for inventory and sales analytics.',
      image: '/api/placeholder/400/300',
      technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Stripe API', 'Material-UI'],
      features: [
        'User authentication and authorization',
        'Product catalog with search and filters',
        'Shopping cart and checkout process',
        'Payment processing with Stripe',
        'Order tracking and history',
        'Admin dashboard with analytics',
        'Responsive design for all devices'
      ],
      liveUrl: 'https://example-ecommerce.com',
      githubUrl: 'https://github.com/username/ecommerce-platform',
      completionDate: '2024'
    },
    {
      id: 2,
      title: 'Task Management App',
      category: 'web',
      description: 'A collaborative project management tool with real-time updates and team collaboration features.',
      longDescription: 'Developed a modern task management application with real-time collaboration features. Users can create projects, assign tasks, set deadlines, and track progress. Includes real-time notifications, file sharing, and team communication tools.',
      image: '/api/placeholder/400/300',
      technologies: ['React', 'Socket.io', 'Express', 'PostgreSQL', 'JWT', 'Bootstrap'],
      features: [
        'Real-time task updates',
        'Team collaboration tools',
        'Project timeline and Gantt charts',
        'File attachment and sharing',
        'Email notifications',
        'Role-based permissions',
        'Mobile-responsive design'
      ],
      liveUrl: 'https://example-tasks.com',
      githubUrl: 'https://github.com/username/task-manager',
      completionDate: '2024'
    },
    {
      id: 3,
      title: 'Fitness Tracking Mobile App',
      category: 'mobile',
      description: 'Cross-platform mobile app for fitness tracking with workout plans and progress monitoring.',
      longDescription: 'Created a comprehensive fitness tracking mobile application using React Native. Features include workout planning, exercise tracking, progress charts, social features, and integration with wearable devices.',
      image: '/api/placeholder/400/300',
      technologies: ['React Native', 'Firebase', 'Redux', 'Health Kit', 'Google Fit API'],
      features: [
        'Custom workout plan creation',
        'Exercise tracking with timers',
        'Progress charts and analytics',
        'Social features and challenges',
        'Wearable device integration',
        'Offline workout support',
        'Cross-platform (iOS/Android)'
      ],
      liveUrl: 'https://play.google.com/store/apps/details?id=com.example.fitness',
      githubUrl: 'https://github.com/username/fitness-app',
      completionDate: '2023'
    },
    {
      id: 4,
      title: 'Cloud-Based CRM System',
      category: 'cloud',
      description: 'Scalable customer relationship management system deployed on AWS with microservices architecture.',
      longDescription: 'Designed and implemented a cloud-native CRM system using microservices architecture on AWS. Features include customer management, sales pipeline tracking, automated email campaigns, and comprehensive reporting dashboards.',
      image: '/api/placeholder/400/300',
      technologies: ['React', 'Node.js', 'AWS Lambda', 'DynamoDB', 'API Gateway', 'S3', 'Docker'],
      features: [
        'Customer data management',
        'Sales pipeline visualization',
        'Automated email campaigns',
        'Advanced reporting and analytics',
        'Multi-tenant architecture',
        'RESTful API design',
        'Containerized deployment'
      ],
      liveUrl: 'https://example-crm.com',
      githubUrl: 'https://github.com/username/crm-system',
      completionDate: '2023'
    },
    {
      id: 5,
      title: 'Real Estate Platform',
      category: 'fullstack',
      description: 'Property listing and search platform with advanced filtering and virtual tours.',
      longDescription: 'Built a modern real estate platform with property listings, advanced search filters, virtual tours, and agent management. Includes features for property owners, real estate agents, and potential buyers.',
      image: '/api/placeholder/400/300',
      technologies: ['Vue.js', 'Laravel', 'MySQL', 'Redis', 'Elasticsearch', 'AWS S3'],
      features: [
        'Advanced property search and filters',
        'Virtual property tours',
        'Agent dashboard and management',
        'Property comparison tools',
        'Saved searches and alerts',
        'Mortgage calculator',
        'Multi-language support'
      ],
      liveUrl: 'https://example-realestate.com',
      githubUrl: 'https://github.com/username/real-estate-platform',
      completionDate: '2023'
    },
    {
      id: 6,
      title: 'Weather Analytics Dashboard',
      category: 'web',
      description: 'Interactive weather dashboard with historical data analysis and forecasting visualizations.',
      longDescription: 'Developed an interactive weather analytics dashboard that aggregates data from multiple weather APIs. Features include current conditions, forecasts, historical trends, and customizable data visualizations.',
      image: '/api/placeholder/400/300',
      technologies: ['React', 'D3.js', 'Node.js', 'MongoDB', 'Weather APIs', 'Chart.js'],
      features: [
        'Real-time weather data',
        'Interactive data visualizations',
        'Historical weather trends',
        'Customizable dashboards',
        'Weather alerts and notifications',
        'Multiple location tracking',
        'Data export capabilities'
      ],
      liveUrl: 'https://example-weather.com',
      githubUrl: 'https://github.com/username/weather-dashboard',
      completionDate: '2022'
    }
  ];

  const filteredProjects = selectedCategory === 'all'
    ? projects
    : projects.filter(project => project.category === selectedCategory);

  const handleCategoryChange = (event, newValue) => {
    setSelectedCategory(newValue);
  };

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedProject(null);
  };

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
            My Portfolio
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 4 }}>
            Showcasing My Best Work
          </Typography>
          <Typography variant="body1" sx={{ mb: 6, fontSize: '1.2rem' }}>
            Explore a collection of projects that demonstrate my skills in full-stack development,
            mobile apps, cloud solutions, and modern web technologies.
          </Typography>
        </Container>
      </Box>

      {/* Category Filter */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Tabs
          value={selectedCategory}
          onChange={handleCategoryChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            '& .MuiTab-root': {
              minHeight: 64,
              textTransform: 'none',
              fontSize: '1rem'
            }
          }}
        >
          {categories.map((category) => (
            <Tab
              key={category.id}
              value={category.id}
              label={category.label}
              icon={category.icon}
              iconPosition="start"
            />
          ))}
        </Tabs>
      </Container>

      {/* Projects Grid */}
      <Container maxWidth="lg" sx={{ py: 4, pb: 8 }}>
        <Grid container spacing={4}>
          {filteredProjects.map((project) => (
            <Grid item xs={12} sm={6} md={4} key={project.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                  '&:hover': {
                    boxShadow: 6,
                    transform: 'translateY(-4px)',
                    transition: '0.3s'
                  }
                }}
                onClick={() => handleProjectClick(project)}
              >
                <CardMedia
                  component="div"
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
                </CardMedia>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                    {project.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {project.description}
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
                    {project.technologies.slice(0, 3).map((tech, index) => (
                      <Chip
                        key={index}
                        label={tech}
                        size="small"
                        variant="outlined"
                        color="primary"
                      />
                    ))}
                    {project.technologies.length > 3 && (
                      <Chip
                        label={`+${project.technologies.length - 3} more`}
                        size="small"
                        variant="outlined"
                      />
                    )}
                  </Box>
                  <Typography variant="caption" color="text.secondary">
                    Completed: {project.completionDate}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary">
                    View Details
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Project Detail Modal */}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        scroll="paper"
      >
        {selectedProject && (
          <>
            <DialogTitle sx={{ m: 0, p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
                {selectedProject.title}
              </Typography>
              <IconButton onClick={handleClose} size="large">
                <Close />
              </IconButton>
            </DialogTitle>
            <DialogContent dividers>
              <Box
                sx={{
                  height: 250,
                  backgroundColor: '#f5f5f5',
                  borderRadius: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 3
                }}
              >
                <Typography variant="body1" color="text.secondary">
                  Project Screenshot
                </Typography>
              </Box>

              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Project Overview
              </Typography>
              <Typography variant="body1" paragraph>
                {selectedProject.longDescription}
              </Typography>

              <Divider sx={{ my: 3 }} />

              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Key Features
              </Typography>
              <List dense>
                {selectedProject.features.map((feature, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <Avatar sx={{ width: 20, height: 20, bgcolor: 'primary.main', fontSize: '0.75rem' }}>
                        ✓
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText primary={feature} />
                  </ListItem>
                ))}
              </List>

              <Divider sx={{ my: 3 }} />

              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Technologies Used
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                {selectedProject.technologies.map((tech, index) => (
                  <Chip
                    key={index}
                    label={tech}
                    variant="filled"
                    color="primary"
                  />
                ))}
              </Box>

              <Typography variant="body2" color="text.secondary">
                <strong>Completed:</strong> {selectedProject.completionDate}
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button
                startIcon={<GitHub />}
                href={selectedProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Code
              </Button>
              <Button
                startIcon={<Launch />}
                href={selectedProject.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="contained"
              >
                Live Demo
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Call to Action */}
      <Box
        sx={{
          backgroundColor: '#f8f9fa',
          py: 8,
          textAlign: 'center'
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h3" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
            Interested in Working Together?
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
            Let's discuss how I can help bring your project ideas to life.
          </Typography>
          <Button
            variant="contained"
            size="large"
            component={Link}
            to="/contact"
            endIcon={<ArrowForward />}
          >
            Start a Project
          </Button>
        </Container>
      </Box>

      <Footer />
    </div>
  );
};

export default Portfolio;