import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Paper, Grid } from '@mui/material';
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const { auth } = useAuth();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const projectData = {
        ...formData,
        created_by: auth.admin_id
      };

      const response = await projectService.createProject(projectData);
      const result = await response.json();

      if (response.ok) {
        setSuccess('Project added successfully!');
        setFormData({
          title: '',
          description: '',
          project_image: null,
          project_link: '',
          github_link: '',
          tech_stack: '',
          category: ''
        });
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
            <Grid item xs={12} sm={6}>
              <Box>
                <Typography variant="body1" gutterBottom>
                  Project Image
                </Typography>
                <input
                  type="file"
                  name="project_image"
                  onChange={handleChange}
                  accept="image/*"
                  style={{ width: '100%' }}
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