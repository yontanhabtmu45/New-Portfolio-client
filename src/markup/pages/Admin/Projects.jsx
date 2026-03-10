import React from 'react'
import AdminMenu from '../../components/Admin/AdminMenu/AdminMenu';
import ProjectList from '../../components/Admin/ProjectList/ProjectList';
import { Box } from '@mui/material';

function Projects() {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Box sx={{ width: 300, flexShrink: 0, p: 2, bgcolor: 'background.paper', borderRight: 1, borderColor: 'divider' }}>
        <AdminMenu />
      </Box>
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <ProjectList />
      </Box>
    </Box>
  )
}

export default Projects