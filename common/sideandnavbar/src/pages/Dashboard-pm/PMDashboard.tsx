import { DashboardOutlined, MoreVertOutlined } from "@mui/icons-material";
import { Box, Card, Chip, Container, createTheme, Divider, FormControl, Grid, Grid2, IconButton, InputLabel, MenuItem, Paper, Select, Stack, ThemeProvider, Typography } from "@mui/material";
import { useState } from "react";
import Project from "../Projects/Project";
import DashboardTabs from "./Components/DashboardTabs";
import Calendar from "./Components/Calendar";
import Activity from "./Components/Activity";

const theme = createTheme({
  palette: {
    primary: {
      main: '#6366f1',
      light: "#E2DDFF",
      dark: "#4f46e5",
    },
    secondary: {
      main: "#1E293B",
      light: "#64748B",
    },
    background: {
      default: "#f1f5f9",
      paper: "#ffffff",
    },
    text: {
      primary: "#1E293B",
      secondary: "#64748B",
    },
  },
  shape: {
    borderRadius: 5,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          padding: "10px 24px",
          boxShadow: "0 4px 12px rgba(99, 102, 241, 0.25)",
        },
        containedPrimary: {
          background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
          transition: "all 0.3s ease",
          "&:hover": {
            background: "linear-gradient(135deg, #4f46e5 0%, #3730a3 100%)",
            transform: "translateY(-2px)",
            boxShadow: "0 6px 16px rgba(99, 102, 241, 0.3)",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.08)",
          overflow: "visible",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 10,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          margin: "16px 0",
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: 6,
        },
      },
    },
  },
})


const PMDashboard = () => {
  const [selectedProject, setSelectedProject] = useState('');

  // dummy data
  const projects = [
    { id: 'pr1', name: 'EDU' },
    { id: 'pr2', name: 'Worlie' },
    { id: 'pr3', name: 'WPS' }
  ]

  const handleProjectChange = (event: any) => {
    setSelectedProject(event.target.value);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minHeight: '100vh', py: 1 }}>
        <Container maxWidth='xl'>
          {/* Header with user info */}
          <Paper 
            elevation={2} 
            sx={{ 
              p: { xs: 3, md: 4 }, 
              mb: 4, 
              background: 'linear-gradient(135deg, #E2DDFF 0%, #6366f1 110%)', 
              color: '#1E293B', 
              display: "flex", 
              flexDirection: { xs: 'column', sm: 'row' }, 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              overflow: 'hidden', 
              position: 'relative' 
            }}>
            <Box sx={{ position: 'relative', zIndex: 2, width: '100%' }}>
              <Typography variant="h4" sx={{ mt: 2, fontWeight: 'bold', color: 'text.primary', textShadow: '0 3px 3px rgba(0,0,0,0.3)', fontSize: { xs: '1.5rem', md: '1.75rem' } }}>
                Welcome to Your Dashboard!
              </Typography>
              <Typography variant='subtitle1' sx={{ color: 'text.primary', textShadow: '0 4px 3px rgba(0,0,0,0.1)', opacity: 0.9, mt: 1, mb: 3 }}>
                Track your projects, activities and analytics all in one place.
              </Typography>
            </Box>
            <Box sx={{
              position: 'absolute',
              right: -10,
              top: -30,
              width: 200,
              height: 180,
              borderRadius: '10%',
              bgcolor: 'rgba(255,255,255,0.1)'
            }} />
            <Box sx={{
              position: 'absolute',
              right: 60,
              bottom: -40,
              width: 180,
              height: 140,
              borderRadius: '10%',
              bgcolor: 'rgba(255,255,255,0.1)'
            }} />
          </Paper>
          <Card sx={{ p: { xs: 2, md: 3 }, mb: 4, position: 'relative', boxShadow: 0.5 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', mb: 3 }}>
              <FormControl sx={{ width: { xs: '100%', sm: 250 }, mb: 2 }}>
                <InputLabel>Select Project</InputLabel>
                <Select
                  labelId="project-select-label"
                  id="project-select"
                  value={selectedProject}
                  label='Select project'
                  onChange={handleProjectChange}
                  sx={{
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgba(0,0,0,0.12)'
                    }
                  }}
                >
                  {projects.map((Project) => (
                    <MenuItem key={Project.id} value={Project.id}>
                      {Project.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              </Box>

              <Divider />
              
              <Box sx={{ mt: 3 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} lg={8}>
                  <DashboardTabs />
                </Grid>
                
                <Grid item xs={12} lg={4}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <Calendar />
                    <Activity />
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Card>
        </Container>
      </Box>
    </ThemeProvider>
  )
}

export default PMDashboard
