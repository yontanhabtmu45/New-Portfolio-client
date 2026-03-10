import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useAuth } from "../../../../Context/AuthContext";
import skillService from "../../../../services/skill.service";

const SkillList = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [editForm, setEditForm] = useState({
    skill_name: "",
    skill_level: "",
    skill_icon: null,
    category: "",
  });
  const { auth } = useAuth();

  const skillLevels = [
    { value: 'Beginner', label: 'Beginner' },
    { value: 'Intermediate', label: 'Intermediate' },
    { value: 'Advanced', label: 'Advanced' },
    { value: 'Expert', label: 'Expert' }
  ];


  useEffect(() => {
    fetchSkills();
  }, [auth]);

  const fetchSkills = async () => {
    try {
      const response = await skillService.getAllSkills(auth.skill_token);
      if (response.ok) {
        const data = await response.json();
        setSkills(data.data || []);
      } else {
        setError("Failed to fetch skills");
      }
    } catch (err) {
      setError("Error fetching skills");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (skill) => {
    setSelectedSkill(skill);
    setEditForm({
      skill_name: skill.skill_name,
      skill_level: skill.skill_level,
      skill_icon: null,
      category: skill.category,
    });
    setEditDialogOpen(true);
  };

  const handleEditSave = async () => {
    try {
      const response = await skillService.updateSkill(
        selectedSkill.skill_id,
        editForm,
      );
      if (response.ok) {
        setEditDialogOpen(false);
        fetchSkills(); // Refresh list
      } else {
        setError("Failed to update skill");
      }
    } catch (err) {
      setError("Error updating skill");
    }
  };

  const handleDelete = async (skillId) => {
    if (window.confirm("Are you sure you want to delete this skill?")) {
      try {
        // Assuming there's a deleteSkill method in the service
        // const response = await skillService.deleteSkill(skillId, auth.skill_token);
        // For now, just remove from state
        setSkills(skills.filter((s) => s.skill_id !== skillId));
      } catch (err) {
        setError("Error deleting skill");
      }
    }
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Skills
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Level</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Icon</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {skills.map((skill) => (
              <TableRow key={skill.skill_id}>
                <TableCell>{skill.skill_name}</TableCell>
                <TableCell>{skill.skill_level}</TableCell>
                <TableCell>{skill.category}</TableCell>
                <TableCell>{skill.skill_icon}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => handleEdit(skill.skill_id)}
                    color="primary"
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => handleDelete(skill.skill_id)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Edit skill</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            value={editForm.skill_name}
            onChange={(e) =>
              setEditForm({ ...editForm, skill_name: e.target.value })
            }
          />
          <TextField
            fullWidth
            select
            label="Skill Level"
            name="skill_level"
            value={editForm.skill_level}
            required
            variant="outlined"
          >
            {skillLevels.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Icon"
            fullWidth
            margin="normal"
            type="file"
            value={editForm.skill_icon}
            onChange={(e) =>
              setEditForm({ ...editForm, skill_icon: e.target.value })
            }
          />
          <TextField
            label="Category"
            fullWidth
            margin="normal"
            value={editForm.category}
            onChange={(e) =>
              setEditForm({ ...editForm, category: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleEditSave} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SkillList;
