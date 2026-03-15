import React, { useState } from 'react';
import '../../../../App.css';
import { 
  TextField, 
  Button, 
  Box, 
  Typography, 
  Paper, 
  Grid,
  Card,
  CardMedia,
  IconButton,
  Alert
} from '@mui/material';
import { CloudUpload, Delete, Image } from '@mui/icons-material';
import { useAuth } from '../../../../Context/AuthContext';
import projectService from '../../../../services/project.service';

const AddProjectForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    project_image: null,
    project_link: '',
    github_link: '',
    tech_stack: '',
    category: ''
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const { auth } = useAuth();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files[0]) {
      // Handle file input
      const file = files[0];
      setFormData(prev => ({
        ...prev,
        [name]: file
      }));
      setSelectedImage(file);
      
      // Create image preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      // Handle text inputs
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setFormData(prev => ({
      ...prev,
      project_image: null
    }));
  };

  const validateImage = (file) => {
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    
    if (!allowedTypes.includes(file.type)) {
      return 'Please select a valid image file (JPEG, PNG, GIF, WebP)';
    }
    
    if (file.size > maxSize) {
      return 'Image size must be less than 5MB';
    }
    
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    // Validate image if selected
    if (selectedImage) {
      const imageError = validateImage(selectedImage);
      if (imageError) {
        setError(imageError);
        setLoading(false);
        return;
      }
    }

    try {
      const projectData = {
        ...formData,
        created_by: auth.admin_id
      };

      const response = await projectService.createProject(projectData);
      const result = await response.json();

      if (response.ok) {
        setSuccess('Project added successfully!');
        // Reset form
        setFormData({
          title: '',
          description: '',
          project_image: null,
          project_link: '',
          github_link: '',
          tech_stack: '',
          category: ''
        });
        setSelectedImage(null);
        setImagePreview(null);
      } else {
        setError(result.msg || 'Failed to add project');
      }
    } catch (err) {
      setError('Error adding project');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Add New Project
      </Typography>
      <Paper sx={{ p: 3, mt: 2 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Project Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                multiline
                rows={4}
                required
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Project Image
              </Typography>
              <Box sx={{ mb: 2 }}>
                {!imagePreview ? (
                  <Card 
                    sx={{ 
                      minHeight: 200, 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      border: '2px dashed #ccc',
                      cursor: 'pointer',
                      '&:hover': { borderColor: 'primary.main' }
                    }}
                    onClick={() => document.getElementById('project-image-input').click()}
                  >
                    <Box sx={{ textAlign: 'center', p: 3 }}>
                      <CloudUpload sx={{ fontSize: 48, color: 'text.secondary', mb: 1 }} />
                      <Typography variant="h6" color="text.secondary">
                        Click to upload image
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        PNG, JPG, GIF up to 5MB
                      </Typography>
                    </Box>
                  </Card>
                ) : (
                  <Card sx={{ position: 'relative' }}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={imagePreview}
                      alt="Project preview"
                      sx={{ objectFit: 'cover' }}
                    />
                    <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
                      <IconButton
                        onClick={handleRemoveImage}
                        sx={{ 
                          bgcolor: 'rgba(0,0,0,0.5)', 
                          color: 'white',
                          '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' }
                        }}
                      >
                        <Delete />
                      </IconButton>
                    </Box>
                    <Box sx={{ p: 2, bgcolor: 'rgba(0,0,0,0.7)', color: 'white' }}>
                      <Typography variant="body2">
                        {selectedImage?.name}
                      </Typography>
                      <Typography variant="caption">
                        {(selectedImage?.size / 1024 / 1024).toFixed(2)} MB
                      </Typography>
                    </Box>
                  </Card>
                )}
                <input
                  id="project-image-input"
                  type="file"
                  name="project_image"
                  onChange={handleChange}
                  accept="image/*"
                  style={{ display: 'none' }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Project Link"
                name="project_link"
                value={formData.project_link}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="GitHub Link"
                name="github_link"
                value={formData.github_link}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Tech Stack"
                name="tech_stack"
                value={formData.tech_stack}
                onChange={handleChange}
                placeholder="e.g., React, Node.js, MongoDB"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                disabled={loading}
                sx={{ mt: 2 }}
              >
                {loading ? 'Adding Project...' : 'Add Project'}
              </Button>
            </Grid>
          </Grid>
        </form>
        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
        {success && (
          <Typography color="success.main" sx={{ mt: 2 }}>
            {success}
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default AddProjectForm;