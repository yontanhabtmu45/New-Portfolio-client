import React from "react";
import { Link } from "react-router";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  Add as AddIcon,
  Edit as EditIcon,
  People as PeopleIcon,
  Build as BuildIcon,
} from "@mui/icons-material";

function Dashboard() {
  const dashboardItems = [
    {
      title: "Manage Projects",
      description: "View and edit existing projects",
      link: "/admin/projects",
      icon: <EditIcon fontSize="large" />,
      color: "primary",
    },
    {
      title: "Add Project",
      description: "Create a new project",
      link: "/admin/add-project",
      icon: <AddIcon fontSize="large" />,
      color: "success",
    },
    {
      title: "Manage Skills",
      description: "View and edit existing skills",
      link: "/admin/skills",
      icon: <BuildIcon fontSize="large" />,
      color: "secondary",
    },
    {
      title: "Add Skill",
      description: "Create a new skill",
      link: "/admin/add-skill",
      icon: <AddIcon fontSize="large" />,
      color: "info",
    },
    {
      title: "Manage Admins",
      description: "View and edit admin users",
      link: "/admin/admins",
      icon: <PeopleIcon fontSize="large" />,
      color: "warning",
    },
    {
      title: "Add Admin",
      description: "Create a new admin user",
      link: "/admin/add-admin",
      icon: <AddIcon fontSize="large" />,
      color: "error",
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Admin Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Welcome to the admin dashboard. Here you can manage all aspects of the application.
        </Typography>
      </Box>
      <Grid container spacing={3}>
        {dashboardItems.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: 4,
                },
              }}
            >
              <CardContent sx={{ flexGrow: 1, textAlign: "center" }}>
                <Box sx={{ color: `${item.color}.main`, mb: 2 }}>
                  {item.icon}
                </Box>
                <Typography variant="h5" component="h2" gutterBottom>
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  component={Link}
                  to={item.link}
                  variant="contained"
                  color={item.color}
                  fullWidth
                  sx={{ mt: "auto" }}
                >
                  Go to {item.title}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Dashboard;
