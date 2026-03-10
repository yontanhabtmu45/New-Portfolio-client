import React from 'react'
import AdminMenu from '../../components/Admin/AdminMenu/AdminMenu'
import SkillList from '../../components/Admin/SkillList/SkillList'
import { Box } from '@mui/material';

function Skills() {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Box sx={{ width: 300, flexShrink: 0, p: 2, bgcolor: 'background.paper', borderRight: 1, borderColor: 'divider' }}>
        <AdminMenu />
      </Box>
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <SkillList />
      </Box>
    </Box>
  )
}

export default Skills