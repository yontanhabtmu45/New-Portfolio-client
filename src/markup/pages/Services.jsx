import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stepper,
  Step,
  StepLabel,
  Divider,
  Avatar,
  CircularProgress
} from '@mui/material';
import {
  Code,
  Palette,
  Storage,
  Smartphone,
  Cloud,
  Security,
  CheckCircle,
  ArrowForward,
  Web,
  Api,
  Analytics
} from '@mui/icons-material';
import Header from '../components/Header/header';
import Footer from '../components/Footer/Footer';
import skillService from '../../services/skill.service';

const Services = () => {
  const [skills, setSkills] = useState([]);
  const [skillsLoading, setSkillsLoading] = useState(true);
  const [skillsError, setSkillsError] = useState(null);

  // Function to map skill levels to numerical values
  const getSkillProgress = (level) => {
    const levelNum = parseInt(level) || 0;
    
    // Assuming skill levels are stored as numbers 1-5
    switch (levelNum) {
      case 1:
        return 25; // Beginner
      case 2:
        return 50; // Intermediate
      case 3:
        return 75; // Advanced
      case 4:
      case 5:
        return 95; // Expert
      default:
        return 50; // Default to intermediate
    }
  };

  // Function to get color based on skill level
  const getSkillColor = (level) => {
    const levelNum = parseInt(level) || 0;
    switch (levelNum) {
      case 1:
        return '#ff9800'; // Orange - Beginner
      case 2:
        return '#2196f3'; // Blue - Intermediate
      case 3:
        return '#4caf50'; // Green - Advanced
      case 4:
      case 5:
        return '#9c27b0'; // Purple - Expert
      default:
        return '#2196f3'; // Default blue
    }
  };

  // Function to get skill level text
  const getSkillLevelText = (level) => {
    const levelNum = parseInt(level) || 0;
    switch (levelNum) {
      case 1:
        return 'Beginner';
      case 2:
        return 'Intermediate';
      case 3:
        return 'Advanced';
      case 4:
      case 5:
        return 'Expert';
      default:
        return 'Intermediate';
    }
  };

  const services = [
    {
      title: 'Full-Stack Web Development',
      icon: <Web sx={{ fontSize: 40 }} />,
      description: 'Complete web applications built with modern technologies. From concept to deployment, I create scalable solutions that meet your business needs.',
      features: [
        'Custom web applications',
        'E-commerce platforms',
        'Content management systems',
        'Progressive web apps (PWAs)'
      ],
      technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'MySQL']
    },
    {
      title: 'Frontend Development',
      icon: <Palette sx={{ fontSize: 40 }} />,
      description: 'Beautiful, responsive user interfaces that provide exceptional user experiences. I focus on performance, accessibility, and modern design principles.',
      features: [
        'Responsive web design',
        'Single-page applications (SPAs)',
        'UI/UX implementation',
        'Performance optimization'
      ],
      technologies: ['React', 'Angular.js', 'Material-UI', 'Bootstrap', 'Tailwind CSS']
    },
    {
      title: 'Backend Development',
      icon: <Storage sx={{ fontSize: 40 }} />,
      description: 'Robust server-side solutions with secure APIs and efficient database design. I build scalable backends that power your applications.',
      features: [
        'RESTful API development',
        'Database design & optimization',
        'Authentication & security',
        'Microservices architecture'
      ],
      technologies: ['Node.js', 'PHP', 'Express', 'MongoDB', 'MySQL', 'Redis']
    },
    // {
    //   title: 'Mobile App Development',
    //   icon: <Smartphone sx={{ fontSize: 40 }} />,
    //   description: 'Cross-platform mobile applications that work seamlessly across iOS and Android devices. Native performance with web technologies.',
    //   features: [
    //     'Cross-platform apps',
    //     'Native mobile apps',
    //     'App store deployment',
    //     'Mobile UI/UX design'
    //   ],
    //   technologies: ['React Native', 'Flutter', 'iOS', 'Android']
    // },
    {
      title: 'Cloud Solutions',
      icon: <Cloud sx={{ fontSize: 40 }} />,
      description: 'Scalable cloud infrastructure and deployment solutions. I help you leverage the power of cloud platforms for better performance and reliability.',
      features: [
        'Cloud migration',
        'Infrastructure as Code',
        'Auto-scaling solutions',
        'CI/CD'
      ],
      technologies: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'Jenkins']
    },
    {
      title: 'API Development & Integration',
      icon: <Api sx={{ fontSize: 40 }} />,
      description: 'Seamless API development and third-party integrations. Connect your applications with external services and platforms.',
      features: [
        'REST & GraphQL APIs',
        'Third-party integrations',
        'API documentation',
        'Rate limiting & security'
      ],
      technologies: ['REST', 'OAuth', 'Postman', ]
    }
  ];

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setSkillsLoading(true);
        const response = await skillService.getAllSkills();
        const data = await response.json();
        if (data.status === 'success') {
          // Transform backend data to match frontend expectations
          const transformedSkills = data.data.map(skill => {
            return {
              id: skill.skill_id,
              name: skill.skill_name,
              level: skill.skill_level,
              icon: skill.skill_icon,
              category: skill.category
            };
          });
          setSkills(transformedSkills);
        } else {
          setSkillsError('Failed to fetch skills');
        }
      } catch (err) {
        setSkillsError('Error fetching skills');
        console.error('Error fetching skills:', err);
      } finally {
        setSkillsLoading(false);
      }
    };

    fetchSkills();
  }, []);

  // const skills = [
  //   { name: 'JavaScript/TypeScript', level: 'Advanced', color: '#f7df1e' },
  //   { name: 'React/Angular.js', level: 'Advanced', color: '#61dafb' },
  //   { name: 'Node.js', level: 'Expert', color: '#68a063' },
  //   { name: 'PHP', level: 'Advanced', color: '#3776ab' },
  //   { name: 'Database Design', level: 'Advanced', color: '#336791' },
  //   { name: 'Cloud Platforms', level: 'Advanced', color: '#ff9900' },
  //   { name: 'UI/UX Design', level: 'Intermediate', color: '#ff6b6b' }
  // ];

  const processSteps = [
    {
      label: 'Discovery & Planning',
      description: 'Understanding your requirements, goals, and constraints through detailed consultation.'
    },
    {
      label: 'Design & Prototyping',
      description: 'Creating wireframes, mockups, and prototypes to visualize the solution.'
    },
    {
      label: 'Development',
      description: 'Building the solution using best practices, clean code, and modern technologies.'
    },
    {
      label: 'Testing & Quality Assurance',
      description: 'Rigorous testing to ensure functionality, performance, and security.'
    },
    {
      label: 'Deployment & Launch',
      description: 'Deploying to production with monitoring and maintenance support.'
    },
    {
      label: 'Support & Maintenance',
      description: 'Ongoing support, updates, and optimization based on user feedback.'
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />

      {/* Hero Section */}
      {/* <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: 12,
          textAlign: 'center'
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            My Services
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 4 }}>
            Professional Development Solutions
          </Typography>
          <Typography variant="body1" sx={{ mb: 6, fontSize: '1.2rem' }}>
            I offer comprehensive development services to help bring your ideas to life.
            From web applications to mobile apps, I deliver high-quality solutions tailored to your needs.
          </Typography>
        </Container>
      </Box> */}

      {/* Services Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" component="h2" align="center" gutterBottom sx={{ fontWeight: 'bold', mb: 6 }}>
          What I Offer
        </Typography>
        <Grid container spacing={4}>
          {services.map((service, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  '&:hover': { boxShadow: 6, transform: 'translateY(-4px)', transition: '0.3s' }
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ bgcolor: '#667eea', mr: 2 }}>
                      {service.icon}
                    </Avatar>
                    <Typography variant="h5" component="h3" sx={{ fontWeight: 'bold' }}>
                      {service.title}
                    </Typography>
                  </Box>
                  <Typography variant="body1" paragraph>
                    {service.description}
                  </Typography>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                    Key Features:
                  </Typography>
                  <List dense>
                    {service.features.map((feature, featureIndex) => (
                      <ListItem key={featureIndex} sx={{ px: 0 }}>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <CheckCircle color="primary" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary={feature} />
                      </ListItem>
                    ))}
                  </List>
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                      Technologies:
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {service.technologies.map((tech, techIndex) => (
                        <Chip
                          key={techIndex}
                          label={tech}
                          size="small"
                          variant="outlined"
                          color="primary"
                        />
                      ))}
                    </Box>
                  </Box>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    component={Link}
                    to="/contact"
                  >
                    Get Quote
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Divider />

      {/* Skills Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" component="h2" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
          Technical Skills
        </Typography>
        <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 6 }}>
          Technologies and expertise I bring to every project
        </Typography>
        
        {skillsLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress />
          </Box>
        ) : skillsError ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="error">
              {skillsError}
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {skills.map((skill, index) => (
              <Grid item xs={12} sm={6} md={3} key={skill.id || index}>
                <Box
                  sx={{
                    textAlign: 'center',
                    p: 3,
                    borderRadius: 2,
                    boxShadow: 2,
                    '&:hover': { transform: 'translateY(-4px)', transition: '0.3s' }
                  }}
                >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 'bold',
                    mb: 2
                  }}
                >
                  {skill.name}
                </Typography>
                <Box sx={{ position: 'relative', display: 'inline-flex', mb: 1 }}>
                  <CircularProgress
                    variant="determinate"
                    value={(skill.level)}
                    size={80}
                    thickness={4}
                    sx={{
                      color: (skill.level),
                      '& .MuiCircularProgress-circle': {
                        strokeLinecap: 'round',
                      },
                    }}
                  />
                  <Box
                    sx={{
                      top: 0,
                      left: 0,
                      bottom: 0,
                      right: 0,
                      position: 'absolute',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography
                      variant="caption"
                      component="div"
                      sx={{
                        fontWeight: 'bold',
                        fontSize: '0.75rem'
                      }}
                    >
                      {skill.level}
                    </Typography>
                  </Box>
                </Box>
                <Typography
                  variant="body2"
                  sx={{
                    mt: 1,
                    fontWeight: 'medium',
                    color: 'text.secondary'
                  }}
                >
                  {getSkillLevelText(skill.level)}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
        )}
      </Container>

      <Divider />

      {/* Process Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" component="h2" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
          My Process
        </Typography>
        <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 6 }}>
          How I work to deliver exceptional results
        </Typography>
        <Stepper alternativeLabel sx={{ mb: 6 }}>
          {processSteps.map((step, index) => (
            <Step key={index}>
              <StepLabel>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  {step.label}
                </Typography>
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Container>

      {/* Call to Action */}

      <Footer />
    </div>
  );
};

export default Services;