import React, { useState, useEffect } from "react";
import '../../../../App.css'
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
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useAuth } from "../../../../Context/AuthContext";
import projectService from "../../../../services/project.service";

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    project_image: null, // Changed to null for file
    project_link: "",
    github_link: "",
    tech_stack: "",
    category: "",
  });
  const [error, setError] = useState(null);
  const { auth } = useAuth();

  useEffect(() => {
    fetchProjects();
  }, [auth]);

  const fetchProjects = async () => {
    try {
      const response = await projectService.getAllProjects(auth.admin_token);
      if (response.ok) {
        const data = await response.json();
        setProjects(data.data || []);
      } else {
        setError("Failed to fetch projects");
      }
    } catch (err) {
      setError("Error fetching projects");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (project) => {
    setSelectedProject(project);
    setEditForm({
      title: project.title,
      description: project.description,
      project_image: null, // Reset file input
      project_link: project.project_link,
      github_link: project.github_link,
      tech_stack: project.tech_stack,
      category: project.category,
    });
    setEditDialogOpen(true);
  };

  const handleEditSave = async () => {
    try {
      const response = await projectService.updateProject(
        selectedProject.project_id,
        editForm,
      );
      if (response.ok) {
        setEditDialogOpen(false);
        fetchProjects(); // Refresh list
      } else {
        setError("Failed to update Project");
      }
    } catch (err) {
      setError("Error updating Project");
    }
  };

  const handleDelete = async (projectId) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        // Assuming there's a deleteProject method in the service
        // const response = await projectService.deleteProject(projectId, auth.project_token);
        // For now, just remove from state
        setProjects(projects.filter((p) => p.project_id !== projectId));
      } catch (err) {
        setError("Error deleting project");
      }
    }
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Projects
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{bgcolor: "#cdc8c8ea"}}>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Tech Stack</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects.map((project) => (
              <TableRow key={project.project_id}>
                <TableCell>{project.title}</TableCell>
                <TableCell>{project.description}</TableCell>
                <TableCell>{project.category}</TableCell>
                <TableCell>{project.tech_stack}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(project)} color="primary">
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => handleDelete(project.project_id)}
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
        <DialogTitle>Edit Project</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            value={editForm.title}
            onChange={(e) =>
              setEditForm({ ...editForm, title: e.target.value })
            }
          />
          <TextField
            label="description"
            fullWidth
            margin="normal"
            multiline
            rows={3}
            value={editForm.description}
            onChange={(e) =>
              setEditForm({ ...editForm, description: e.target.value })
            }
          />
          <Box sx={{ mt: 2, mb: 1 }}>
            <Typography variant="body1" gutterBottom>
              Project Image
            </Typography>
            <input
              type="file"
              name="project_image"
              onChange={(e) =>
                setEditForm({ ...editForm, project_image: e.target.files[0] })
              }
              accept="image/*"
              style={{ width: '100%' }}
            />
          </Box>
          <TextField
            label="project Link"
            fullWidth
            margin="normal"
            // type="text"
            value={editForm.project_link}
            onChange={(e) =>
              setEditForm({ ...editForm, project_link: e.target.value })
            }
          />
          <TextField
            label="github Link"
            fullWidth
            margin="normal"
            // type="text"
            value={editForm.github_link}
            onChange={(e) =>
              setEditForm({ ...editForm, github_link: e.target.value })
            }
          />
          <TextField
            label="tech Stack"
            fullWidth
            margin="normal"
            // type="text"
            value={editForm.tech_stack}
            onChange={(e) =>
              setEditForm({ ...editForm, tech_stack: e.target.value })
            }
          />
          <TextField
            label="Category"
            fullWidth
            margin="normal"
            // type="text"
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

export default ProjectList;
