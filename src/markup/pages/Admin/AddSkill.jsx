import React from 'react'
import AddSkillForm from '../../components/Admin/AddSkillForm/AddSkillForm'
import AdminMenu from '../../components/Admin/AdminMenu/AdminMenu'
import { Box } from '@mui/material';

function AddSkill() {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Box sx={{ width: 300, flexShrink: 0, p: 2, bgcolor: 'background.paper', borderRight: 1, borderColor: 'divider' }}>
        <AdminMenu />
      </Box>
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <AddSkillForm />
      </Box>
    </Box>
  )
}

export default AddSkill