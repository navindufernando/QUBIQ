import React, { useState, useEffect } from 'react';
import { Button, TextField, IconButton, Card, CardContent, Typography, Divider, Box, Chip, Tooltip, Paper, Avatar, Grid, LinearProgress } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import FolderIcon from '@mui/icons-material/Folder';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import TimerIcon from '@mui/icons-material/Timer';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DateRangeIcon from '@mui/icons-material/DateRange';
import EqualizerIcon from '@mui/icons-material/Equalizer';

const Project = () => {
  const [projectName, setProjectName] = useState('');
  const [projectColor, setProjectColor] = useState('#3b82f6'); // Default blue color
  const [projects, setProjects] = useState<{ id: string; name: string; color: string }[]>([]);
  const [isFormVisible, setIsFormVisible] = useState(false);

  // Load existing projects on component mount
  useEffect(() => {
    const existingProjects = JSON.parse(localStorage.getItem('projects') || '[]');
    setProjects(existingProjects);
    
    // If no projects exist, show the form by default
    if (existingProjects.length === 0) {
      setIsFormVisible(true);
    }
  }, []);

  const handleCreateProject = (e) => {
    e.preventDefault();
    
    if (!projectName.trim()) {
      alert('Please enter a project name');
      return;
    }
    
    // Get existing projects from localStorage or initialize empty array
    const existingProjects = JSON.parse(localStorage.getItem('projects') || '[]');
    
    // Create new project object
    const newProject = {
      id: Date.now().toString(),
      name: projectName,
      color: projectColor
    };
    
    // Add new project to array and save to localStorage
    const updatedProjects = [...existingProjects, newProject];
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
    
    // Update local state
    setProjects(updatedProjects);
    
    // Reset form
    setProjectName('');
    setIsFormVisible(false);
  };

  const handleDeleteProject = (id) => {
    // Filter out the project with the matching id
    const updatedProjects = projects.filter(project => project.id !== id);
    
    // Update localStorage
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
    
    // Update state
    setProjects(updatedProjects);
  };

  const colorOptions = [
    { value: '#3b82f6', label: 'Blue' },
    { value: '#10b981', label: 'Green' },
    { value: '#ef4444', label: 'Red' },
    { value: '#f59e0b', label: 'Orange' },
    { value: '#8b5cf6', label: 'Purple' }
  ];

  // Generate mock stats for visual enhancement
  const getProgressValue = () => Math.floor(Math.random() * 100);
  const getTaskCount = () => Math.floor(Math.random() * 10);

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header with summary cards */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
            Workspace
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button variant="outlined" startIcon={<DateRangeIcon />}>
              Calendar
            </Button>
            <Button variant="outlined" startIcon={<EqualizerIcon />}>
              Reports
            </Button>
          </Box>
        </Box>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card elevation={2} sx={{ bgcolor: '#f0f7ff', height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Box>
                    <Typography color="textSecondary" gutterBottom>
                      Total Projects
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                      {projects.length}
                    </Typography>
                  </Box>
                  <Avatar sx={{ bgcolor: '#3b82f6' }}>
                    <DashboardIcon />
                  </Avatar>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card elevation={2} sx={{ bgcolor: '#f0fff4', height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Box>
                    <Typography color="textSecondary" gutterBottom>
                      Completed Tasks
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                      {projects.length > 0 ? 12 : 0}
                    </Typography>
                  </Box>
                  <Avatar sx={{ bgcolor: '#10b981' }}>
                    <CheckCircleIcon />
                  </Avatar>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card elevation={2} sx={{ bgcolor: '#fff9eb', height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Box>
                    <Typography color="textSecondary" gutterBottom>
                      In Progress
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                      {projects.length > 0 ? 8 : 0}
                    </Typography>
                  </Box>
                  <Avatar sx={{ bgcolor: '#f59e0b' }}>
                    <TimerIcon />
                  </Avatar>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Project Management Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3, display: 'flex', alignItems: 'center' }}>
          <FolderIcon sx={{ mr: 1 }} />
          Projects
        </Typography>

        <Card elevation={3} sx={{ mb: 4 }}>
          <CardContent>
            <Box 
              onClick={() => setIsFormVisible(!isFormVisible)} 
              sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                cursor: 'pointer',
                py: 1
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                <AddIcon sx={{ mr: 1 }} />
                Create New Project
              </Typography>
              {isFormVisible ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </Box>

            {isFormVisible && (
              <>
                <Divider sx={{ my: 2 }} />
                <form onSubmit={handleCreateProject}>
                  <div className="mb-4">
                    <TextField
                      id="projectName"
                      label="Project Name"
                      variant="outlined"
                      fullWidth
                      placeholder="Enter project name"
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                      required
                      className="mb-2"
                      autoFocus
                    />
                  </div>
                  
                  <div className="mb-4">
                    <Typography variant="subtitle2" className="block mb-2">
                      Project Color
                    </Typography>
                    <div className="flex space-x-3">
                      {colorOptions.map((color) => (
                        <Tooltip key={color.value} title={color.label} arrow>
                          <button
                            type="button"
                            className={`w-10 h-10 rounded-full border-2 shadow hover:shadow-md transition-shadow ${
                              projectColor === color.value ? 'border-gray-800 ring-2 ring-gray-300' : 'border-transparent'
                            }`}
                            style={{ backgroundColor: color.value }}
                            onClick={() => setProjectColor(color.value)}
                            aria-label={`Select ${color.label} color`}
                          />
                        </Tooltip>
                      ))}
                    </div>
                  </div>
                  
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      startIcon={<AddIcon />}
                      sx={{ 
                        py: 1.5, 
                        textTransform: 'none',
                        fontWeight: 'bold'
                      }}
                    >
                      Create Project
                    </Button>
                    <Button
                      type="button"
                      variant="outlined"
                      sx={{ 
                        py: 1.5, 
                        textTransform: 'none'
                      }}
                      onClick={() => setIsFormVisible(false)}
                    >
                      Cancel
                    </Button>
                  </Box>
                </form>
              </>
            )}
          </CardContent>
        </Card>

        <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 500 }}>
          Your Projects ({projects.length})
        </Typography>

        {projects.length > 0 ? (
          <Grid container spacing={3}>
            {projects.map((project) => (
              <Grid item xs={12} md={6} lg={4} key={project.id}>
                <Card 
                  sx={{ 
                    height: '100%',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': { 
                      transform: 'translateY(-4px)',
                      boxShadow: 6
                    }
                  }}
                >
                  <Box 
                    sx={{ 
                      height: 8, 
                      bgcolor: project.color 
                    }} 
                  />
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                        {project.name}
                      </Typography>
                      <Box sx={{ display: 'flex' }}>
                        <Tooltip title="Bookmark">
                          <IconButton size="small">
                            <BookmarkIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete Project">
                          <IconButton 
                            aria-label="delete" 
                            onClick={() => handleDeleteProject(project.id)}
                            size="small"
                            color="error"
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="More Options">
                          <IconButton size="small">
                            <MoreVertIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </Box>
                    
                    <Box sx={{ mb: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                        <Typography variant="body2" color="textSecondary">
                          Progress
                        </Typography>
                        <Typography variant="body2" fontWeight="bold">
                          {getProgressValue()}%
                        </Typography>
                      </Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={getProgressValue()} 
                        sx={{ 
                          height: 6, 
                          borderRadius: 1,
                          bgcolor: 'rgba(0,0,0,0.05)',
                          '& .MuiLinearProgress-bar': {
                            bgcolor: project.color
                          }
                        }}
                      />
                    </Box>
                    
                    <Divider sx={{ mb: 2 }} />
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Chip 
                          icon={<CheckCircleIcon fontSize="small" />}
                          label={`${getTaskCount()} Done`}
                          size="small" 
                          sx={{ fontSize: '0.75rem' }}
                        />
                        <Chip 
                          icon={<TimerIcon fontSize="small" />}
                          label={`${getTaskCount()} In Progress`}
                          size="small" 
                          sx={{ fontSize: '0.75rem' }}
                        />
                      </Box>
                      <Box sx={{ display: 'flex', gap: 0.5 }}>
                        {[...Array(Math.min(3, getTaskCount()))].map((_, i) => (
                          <Avatar 
                            key={i}
                            sx={{ 
                              width: 24, 
                              height: 24, 
                              fontSize: '0.75rem',
                              bgcolor: ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444'][i % 5]
                            }}
                          >
                            {String.fromCharCode(65 + i)}
                          </Avatar>
                        ))}
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Card elevation={2}>
            <CardContent sx={{ p: 4, textAlign: 'center' }}>
              <Box sx={{ maxWidth: 300, mx: 'auto', mb: 3 }}>
                <FolderIcon sx={{ fontSize: 60, color: '#ccc', mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  No projects yet
                </Typography>
                <Typography color="textSecondary" sx={{ mb: 3 }}>
                  Create your first project to get started with tracking your work and organizing your tasks.
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AddIcon />}
                  onClick={() => setIsFormVisible(true)}
                  sx={{ textTransform: 'none' }}
                >
                  Create First Project
                </Button>
              </Box>
            </CardContent>
          </Card>
        )}
      </Box>
    </div>
  );
};

export default Project;