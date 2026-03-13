import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  IconButton,
  Divider,
  Alert,
  Snackbar,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import {
  Email,
  Phone,
  LocationOn,
  LinkedIn,
  GitHub,
  Twitter,
  Send,
  ExpandMore,
  Business,
  AccessTime,
  CheckCircle
} from '@mui/icons-material';
import Header from '../components/Header/header';
import Footer from '../components/Footer/Footer';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const contactInfo = [
    {
      icon: <Email sx={{ fontSize: 30 }} />,
      title: 'Email',
      value: 'your.email@example.com',
      description: 'Send me an email anytime',
      action: 'mailto:your.email@example.com'
    },
    {
      icon: <Phone sx={{ fontSize: 30 }} />,
      title: 'Phone',
      value: '+1 (555) 123-4567',
      description: 'Call me for quick discussions',
      action: 'tel:+15551234567'
    },
    {
      icon: <LocationOn sx={{ fontSize: 30 }} />,
      title: 'Location',
      value: 'Your City, Country',
      description: 'Open to remote work worldwide',
      action: null
    }
  ];

  const socialLinks = [
    {
      icon: <LinkedIn sx={{ fontSize: 30 }} />,
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/yourprofile',
      color: '#0077b5'
    },
    {
      icon: <GitHub sx={{ fontSize: 30 }} />,
      name: 'GitHub',
      url: 'https://github.com/yourusername',
      color: '#333'
    },
    {
      icon: <Twitter sx={{ fontSize: 30 }} />,
      name: 'Twitter',
      url: 'https://twitter.com/yourusername',
      color: '#1da1f2'
    }
  ];

  const faqs = [
    {
      question: 'What services do you offer?',
      answer: 'I offer full-stack web development, mobile app development, cloud solutions, and custom software development. I specialize in React, Node.js, and modern web technologies.'
    },
    {
      question: 'Do you work remotely?',
      answer: 'Yes, I work remotely and have experience collaborating with teams worldwide. I\'m comfortable with various time zones and communication tools.'
    },
    {
      question: 'What is your typical project timeline?',
      answer: 'Project timelines vary depending on complexity and scope. Simple websites might take 2-4 weeks, while complex applications could take 2-6 months. I\'ll provide a detailed timeline after discussing your requirements.'
    },
    {
      question: 'Do you provide ongoing support?',
      answer: 'Yes, I offer maintenance and support packages for all projects. This includes bug fixes, updates, performance optimizations, and feature enhancements.'
    },
    {
      question: 'What is your development process?',
      answer: 'My process includes discovery and planning, design and prototyping, development, testing and quality assurance, deployment, and ongoing support. I believe in transparent communication throughout the project.'
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call - replace with actual API endpoint
      await new Promise(resolve => setTimeout(resolve, 2000));

      setSnackbar({
        open: true,
        message: 'Message sent successfully! I\'ll get back to you soon.',
        severity: 'success'
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Failed to send message. Please try again.',
        severity: 'error'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
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
            Get In Touch
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 4 }}>
            Let's Start a Conversation
          </Typography>
          <Typography variant="body1" sx={{ mb: 6, fontSize: '1.2rem' }}>
            I'm always interested in new opportunities and exciting projects.
            Whether you have a question or just want to say hi, feel free to reach out!
          </Typography>
        </Container>
      </Box>

      {/* Contact Information */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" component="h2" align="center" gutterBottom sx={{ fontWeight: 'bold', mb: 6 }}>
          Contact Information
        </Typography>
        <Grid container spacing={4}>
          {contactInfo.map((info, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                sx={{
                  height: '100%',
                  textAlign: 'center',
                  cursor: info.action ? 'pointer' : 'default',
                  '&:hover': info.action ? {
                    boxShadow: 6,
                    transform: 'translateY(-4px)',
                    transition: '0.3s'
                  } : {}
                }}
                onClick={() => info.action && window.open(info.action, '_blank')}
              >
                <CardContent sx={{ p: 4 }}>
                  <Avatar sx={{ bgcolor: '#667eea', width: 60, height: 60, mx: 'auto', mb: 2 }}>
                    {info.icon}
                  </Avatar>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                    {info.title}
                  </Typography>
                  <Typography variant="h5" color="primary" gutterBottom>
                    {info.value}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {info.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Divider />

      {/* Contact Form and Social Links */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={6}>
          {/* Contact Form */}
          <Grid item xs={12} md={8}>
            <Typography variant="h3" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
              Send Me a Message
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Fill out the form below and I'll get back to you as soon as possible.
            </Typography>

            <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 600 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    error={!!errors.name}
                    helperText={errors.name}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    error={!!errors.email}
                    helperText={errors.email}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    error={!!errors.subject}
                    helperText={errors.subject}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Message"
                    name="message"
                    multiline
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    error={!!errors.message}
                    helperText={errors.message}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={isSubmitting}
                    endIcon={isSubmitting ? null : <Send />}
                    sx={{ px: 4, py: 1.5 }}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>

          {/* Social Links and Additional Info */}
          <Grid item xs={12} md={4}>
            <Typography variant="h4" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
              Connect With Me
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Follow me on social media or check out my work on GitHub.
            </Typography>

            <Box sx={{ mb: 4 }}>
              {socialLinks.map((social, index) => (
                <IconButton
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    mr: 2,
                    mb: 2,
                    bgcolor: social.color,
                    color: 'white',
                    '&:hover': { bgcolor: social.color, opacity: 0.8 }
                  }}
                  size="large"
                >
                  {social.icon}
                </IconButton>
              ))}
            </Box>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              <Business sx={{ mr: 1, verticalAlign: 'middle' }} />
              Availability
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              I'm currently available for new projects and collaborations.
            </Typography>

            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              <AccessTime sx={{ mr: 1, verticalAlign: 'middle' }} />
              Response Time
            </Typography>
            <Typography variant="body2" color="text.secondary">
              I typically respond to messages within 24 hours.
            </Typography>
          </Grid>
        </Grid>
      </Container>

      <Divider />

      {/* FAQ Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" component="h2" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
          Frequently Asked Questions
        </Typography>
        <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 6 }}>
          Common questions about my services and process
        </Typography>

        {faqs.map((faq, index) => (
          <Accordion key={index} sx={{ mb: 2 }}>
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls={`faq${index}-content`}
              id={`faq${index}-header`}
            >
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                {faq.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1">
                {faq.answer}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Container>

      {/* Snackbar for form feedback */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
          icon={<CheckCircle fontSize="inherit" />}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      <Footer />
    </div>
  );
};

export default Contact;