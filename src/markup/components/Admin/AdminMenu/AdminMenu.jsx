import React from 'react';
import { Link, useLocation } from 'react-router';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  Box,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Folder as FolderIcon,
  Add as AddIcon,
  Build as BuildIcon,
  People as PeopleIcon,
} from '@mui/icons-material';

function AdminMenu() {
  const location = useLocation();

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, link: '/admin' },
    { text: 'Projects', icon: <FolderIcon />, link: '/admin/projects' },
    { text: 'New Project', icon: <AddIcon />, link: '/admin/add-project' },
    { text: 'Skills', icon: <BuildIcon />, link: '/admin/skills' },
    { text: 'Add Skill', icon: <AddIcon />, link: '/admin/add-skill' },
    { text: 'Admins', icon: <PeopleIcon />, link: '/admin/admins' },
    { text: 'Add Admin', icon: <AddIcon />, link: '/admin/add-admin' },
  ];

  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <Typography variant="h6" sx={{ p: 2, fontWeight: 'bold', color: '#1e3c72' }}>
        Admin Menu
      </Typography>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              component={Link}
              to={item.link}
              selected={location.pathname === item.link}
              className="admin-menu-item"
              sx={{
                '&.Mui-selected': {
                  bgcolor: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
                  '&:hover': {
                    bgcolor: 'linear-gradient(135deg, #2a5298 0%, #1e3c72 100%)',
                  },
                },
              }}
            >
              <ListItemIcon sx={{ color: location.pathname === item.link ? 'white' : '#1e3c72' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} sx={{ color: location.pathname === item.link ? 'white' : 'inherit' }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default AdminMenu;