import React, { useState } from 'react';
import '../../../../App.css';
import { TextField, Button, Box, Typography, Paper, Grid, MenuItem } from '@mui/material';
import { useAuth } from '../../../../Context/AuthContext';
import skillService from '../../../../services/skill.service';

const AddSkillForm = () => {
  const [formData, setFormData] = useState({
    skill_name: '',
    skill_level: '',
    skill_icon: null,
    category: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const { auth } = useAuth();

  const skillLevels = [
    { value: 'Beginner', label: 'Beginner' },
    { value: 'Intermediate', label: 'Intermediate' },
    { value: 'Advanced', label: 'Advanced' },
    { value: 'Expert', label: 'Expert' }
  ];

  const categories = [
    { value: 'Frontend', label: 'Frontend' },
    { value: 'Backend', label: 'Backend' },
    { value: 'Database', label: 'Database' },
    { value: 'DevOps', label: 'DevOps' },
    { value: 'Mobile', label: 'Mobile' },
    { value: 'Other', label: 'Other' }
  ];

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
      const skillData = {
        ...formData,
        created_by: auth.admin_id
      };

      const response = await skillService.createSkill(skillData);
      const result = await response.json();
      console.log(result)

      if (response.ok) {
        setSuccess('Skill added successfully!');
        setFormData({
          skill_name: '',
          skill_level: '',
          skill_icon: null,
          category: ''
        });
      } else {
        setError(result.msg || 'Failed to add skill');
      }
    } catch (err) {
      setError('Error adding skill');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Add New Skill
      </Typography>
      <Paper sx={{ p: 3, mt: 2 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Skill Name"
                name="skill_name"
                value={formData.skill_name}
                onChange={handleChange}
                required
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Skill Level"
                name="skill_level"
                value={formData.skill_level}
                onChange={handleChange}
                required
                variant="outlined"
              >
                {skillLevels.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box>
                <Typography variant="body1" gutterBottom>
                  Skill Icon
                </Typography>
                <input
                  type="file"
                  name="skill_icon"
                  onChange={handleChange}
                  accept="image/*"
                  style={{ width: '100%' }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                variant="outlined"
              >
                {categories.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
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
                {loading ? 'Adding Skill...' : 'Add Skill'}
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

export default AddSkillForm;