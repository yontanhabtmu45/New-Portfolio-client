import React from 'react'
import AddProjectForm from '../../components/Admin/AddProjectForm/AddProjectForm'
import AdminMenu from '../../components/Admin/AdminMenu/AdminMenu'
import { Box } from '@mui/material';

function AddProject() {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Box sx={{ width: 300, flexShrink: 0, p: 2, bgcolor: 'background.paper', borderRight: 1, borderColor: 'divider' }}>
        <AdminMenu />
      </Box>
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <AddProjectForm />
      </Box>
    </Box>
  )
}

export default AddProject