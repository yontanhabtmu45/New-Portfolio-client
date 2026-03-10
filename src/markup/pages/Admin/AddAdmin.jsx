import React from 'react'
// Import the AdminMenu component
import AdminMenu from '../../components/Admin/AdminMenu/AdminMenu';
import AddAdminForm from '../../components/Admin/AddAdminform/AddAdminform';
import { Box } from '@mui/material';

function AddAdmin() {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Box sx={{ width: 300, flexShrink: 0, p: 2, bgcolor: 'background.paper', borderRight: 1, borderColor: 'divider' }}>
        <AdminMenu />
      </Box>
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <AddAdminForm />
      </Box>
    </Box>
  )
}

export default AddAdmin