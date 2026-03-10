import React, { useState, useEffect } from 'react';
import '../../../../App.css';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { useAuth } from '../../../../Context/AuthContext';
import adminService from '../../../../services/admin.service';

const AdminList = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [editForm, setEditForm] = useState({ admin_name: '', admin_email: '', role_id: '' });
  const { auth } = useAuth();

  useEffect(() => {
    fetchAdmins();
  }, [auth]);

  const fetchAdmins = async () => {
    try {
      const response = await adminService.getAllAdmins(auth.admin_token);
      if (response.ok) {
        const data = await response.json();
        setAdmins(data.data || []);
      } else {
        setError('Failed to fetch admins');
      }
    } catch (err) {
      setError('Error fetching admins');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (admin) => {
    setSelectedAdmin(admin);
    setEditForm({
      admin_name: admin.admin_name,
      admin_email: admin.admin_email,
      admin_password: admin.admin_password,
      role_id: admin.role_id,
    });
    setEditDialogOpen(true);
  };

  const handleEditSave = async () => {
    try {
      const response = await adminService.updateAdmin(selectedAdmin.admin_id, editForm);
      if (response.ok) {
        setEditDialogOpen(false);
        fetchAdmins(); // Refresh list
      } else {
        setError('Failed to update admin');
      }
    } catch (err) {
      setError('Error updating admin');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this admin?')) {
      try {
        const response = await adminService.deleteAdmin(id, auth.admin_token);
        if (response.ok) {
          fetchAdmins(); // Refresh list
        } else {
          setError('Failed to delete admin');
        }
      } catch (err) {
        setError('Error deleting admin');
      }
    }
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Admin List
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {admins.map((admin) => (
              <TableRow key={admin.admin_id}>
                <TableCell>{admin.admin_id}</TableCell>
                <TableCell>{admin.admin_name}</TableCell>
                <TableCell>{admin.admin_email}</TableCell>
                <TableCell>{admin.role_id === 1 ? 'Admin' : 'Manager'}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(admin)} color="primary">
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(admin.admin_id)} color="error">
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Edit Admin</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            value={editForm.admin_name}
            onChange={(e) => setEditForm({ ...editForm, admin_name: e.target.value })}
          />
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={editForm.admin_email}
            onChange={(e) => setEditForm({ ...editForm, admin_email: e.target.value })}
          />
          <TextField
            label="Role ID"
            fullWidth
            margin="normal"
            type="number"
            value={editForm.role_id}
            onChange={(e) => setEditForm({ ...editForm, role_id: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleEditSave} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminList;
