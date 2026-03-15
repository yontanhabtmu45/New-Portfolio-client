import React, { useState, useEffect, useMemo } from 'react';
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
  ListItemText,
  CircularProgress
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
import projectService from '../../services/project.service';

const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [open, setOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Category mapping for labels and icons
  const categoryMapping = {
    web: { label: 'Web Apps', icon: <Web /> },
    mobile: { label: 'Mobile Apps', icon: <Smartphone /> },
    fullstack: { label: 'Full Stack', icon: <Code /> },
    cloud: { label: 'Cloud Solutions', icon: <Cloud /> },
    frontend: { label: 'Frontend', icon: <Web /> },
    backend: { label: 'Backend', icon: <Code /> },
    // Add more mappings as needed
  };

  // Generate dynamic categories from projects
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(projects.map(project => project.category).filter(Boolean))];
    const dynamicCategories = uniqueCategories.map(categoryId => ({
      id: categoryId,
      label: categoryMapping[categoryId]?.label || categoryId.charAt(0).toUpperCase() + categoryId.slice(1),
      icon: categoryMapping[categoryId]?.icon || <Code />
    }));

    return [
      { id: 'all', label: 'All Projects', icon: <FilterList /> },
      ...dynamicCategories
    ];
  }, [projects]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await projectService.getAllProjects();
        const data = await response.json();
        if (data.status === 'success') {
          // Transform backend data to match frontend expectations
          const transformedProjects = data.data.map(project => ({
            id: project.project_id,
            title: project.title,
            description: project.description,
            image: project.project_image || '/api/placeholder/400/300',
            liveUrl: project.project_link || '#',
            githubUrl: project.github_link || '#',
            technologies: project.tech_stack ? project.tech_stack.split(',').map(tech => tech.trim()) : [],
            category: project.category || 'web', // default category if null
            completionDate: project.created_at ? new Date(project.created_at).toLocaleDateString() : 'N/A',
          }));
          setProjects(transformedProjects);
        } else {
          setError('Failed to fetch projects');
        }
      } catch (err) {
        setError('Error fetching projects');
        console.error('Error fetching projects:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

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
          // background: 'linear-gradient(135deg, #475285 0%, #87c549 100%)',
          color: 'black',
          py: 12,
          textAlign: 'center'
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            My Portfolio
          </Typography>
          {/* <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 4 }}>
            Showcasing My Best Work
          </Typography>
          <Typography variant="body1" sx={{ mb: 6, fontSize: '1.2rem' }}>
            Explore a collection of projects that demonstrate my skills in full-stack development,
            mobile apps, cloud solutions, and modern web technologies.
          </Typography> */}
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
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="error">
              {error}
            </Typography>
          </Box>
        ) : (
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
                  {/* <Typography variant="caption" color="text.secondary">
                    Completed: {project.completionDate === 'N/A' ? 'N/A' : new Date(project.completionDate).getFullYear()}
                  </Typography> */}
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
        )}
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
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
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
                {selectedProject.description}
              </Typography>

              <Divider sx={{ my: 3 }} />

              {selectedProject.features && selectedProject.features.length > 0 && (
                <>
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
                </>
              )}

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

              {/* <Typography variant="body2" color="text.secondary">
                <strong>Completed:</strong> {selectedProject.completionDate === 'N/A' ? 'N/A' : new Date(selectedProject.completionDate).getFullYear()}
              </Typography> */}
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
    </div>
  );
};

export default Portfolio;