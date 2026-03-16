import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box, IconButton } from '@mui/material';
import { DarkMode, LightMode } from '@mui/icons-material';
import { useTheme as useCustomTheme } from '../../../ThemeContext';
import { useAuth } from '../../../Context/AuthContext';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { mode, toggleTheme } = useCustomTheme();
  const { auth, isLogged, logout } = useAuth();

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Services', path: '/services' },
    { label: 'Portfolio', path: '/portfolio' },
    { label: 'Contact', path: '/contact' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getRoleName = (roleId) => {
    switch (roleId) {
      case 1: return 'Admin';
      case 2: return 'Manager';
      default: return 'User';
    }
  };

  return (
    <AppBar 
      position="sticky" 
      sx={{ 
        backgroundColor: 'primary.main',
        top: 0,
        zIndex: 1100,
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}
    >
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          My Portfolio
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          {navItems.map((item) => (
            <Button
              key={item.path}
              color="inherit"
              component={Link}
              to={item.path}
              sx={{
                textDecoration: location.pathname === item.path ? 'underline' : 'none',
                fontWeight: location.pathname === item.path ? 'bold' : 'normal',
              }}
            >
              {item.label}
            </Button>
          ))}
          <Button
            color="inherit"
            href="/resume.pdf"
            download = "resume.pdf"
            sx={{ ml: 2 }}
          >
            Resume
          </Button>
          {isLogged && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 2 }}>
              <Typography variant="body1" sx={{ color: 'inherit' }}>
                {auth.admin_name} ({getRoleName(auth.role_id)})
              </Typography>
              <Button
                color="inherit"
                onClick={handleLogout}
                sx={{ textTransform: 'none' }}
              >
                Logout
              </Button>
            </Box>
          )}
          <IconButton
            color="inherit"
            onClick={toggleTheme}
            sx={{ ml: 1 }}
            aria-label="toggle theme"
          >
            {mode === 'dark' ? <LightMode /> : <DarkMode />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;