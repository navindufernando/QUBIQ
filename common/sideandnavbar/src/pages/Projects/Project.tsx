import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  TextField,
  IconButton,
  Card,
  CardContent,
  Typography,
  Divider,
  Box,
  Chip,
  Tooltip,
  Avatar,
  Grid,
  LinearProgress,
  Paper,
  Container,
  AvatarGroup,
  InputAdornment,
  CardActionArea,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import FolderIcon from "@mui/icons-material/Folder";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import TimerIcon from "@mui/icons-material/Timer";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DateRangeIcon from "@mui/icons-material/DateRange";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import SearchIcon from "@mui/icons-material/Search";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import SortIcon from "@mui/icons-material/Sort";
import FilterListIcon from "@mui/icons-material/FilterList";
import LabelIcon from "@mui/icons-material/Label";

const Project = () => {
  const [projectName, setProjectName] = useState("");
  const [projectColor, setProjectColor] = useState("#3b82f6"); // Default blue color
  const [projects, setProjects] = useState<
    { id: string; name: string; color: string }[]
  >([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Load existing projects on component mount
  useEffect(() => {
    const existingProjects = JSON.parse(
      localStorage.getItem("projects") || "[]"
    );
    setProjects(existingProjects);

    // If no projects exist, show the form by default
    if (existingProjects.length === 0) {
      setIsFormVisible(true);
    }
  }, []);

  const handleCreateProject = (e) => {
    e.preventDefault();

    if (!projectName.trim()) {
      alert("Please enter a project name");
      return;
    }

    // Get existing projects from localStorage or initialize empty array
    const existingProjects = JSON.parse(
      localStorage.getItem("projects") || "[]"
    );

    // Create new project object
    const newProject = {
      id: Date.now().toString(),
      name: projectName,
      color: projectColor,
    };

    // Add new project to array and save to localStorage
    const updatedProjects = [...existingProjects, newProject];
    localStorage.setItem("projects", JSON.stringify(updatedProjects));

    // Update local state
    setProjects(updatedProjects);

    // Reset form
    setProjectName("");
    setIsFormVisible(false);
  };

  const handleDeleteProject = (id, e) => {
    e.stopPropagation(); // Prevent navigating to project when deleting

    // Filter out the project with the matching id
    const updatedProjects = projects.filter((project) => project.id !== id);

    // Update localStorage
    localStorage.setItem("projects", JSON.stringify(updatedProjects));

    // Update state
    setProjects(updatedProjects);
  };

  const colorOptions = [
    { value: "#3b82f6", label: "Blue" },
    { value: "#10b981", label: "Green" },
    { value: "#ef4444", label: "Red" },
    { value: "#f59e0b", label: "Orange" },
    { value: "#8b5cf6", label: "Purple" },
    { value: "#14b8a6", label: "Teal" },
    { value: "#f97316", label: "Amber" },
    { value: "#6366f1", label: "Indigo" },
  ];

  // Generate mock stats for visual enhancement
  const getProgressValue = () => Math.floor(Math.random() * 100);
  const getTaskCount = () => Math.floor(Math.random() * 10);

  // Filter projects based on search term
  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header with title and action buttons */}
      <Box sx={{ mb: 5 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
            Workspace
          </Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              variant="outlined"
              startIcon={<DateRangeIcon />}
              sx={{
                borderRadius: 2,
                textTransform: "none",
                py: 1,
                px: 2,
                fontWeight: 500,
              }}
            >
              Calendar
            </Button>
            <Button
              variant="contained"
              startIcon={<EqualizerIcon />}
              sx={{
                borderRadius: 2,
                textTransform: "none",
                py: 1,
                px: 2,
                fontWeight: 500,
                boxShadow: 2,
              }}
            >
              Reports
            </Button>
          </Box>
        </Box>

        {/* Stats Cards */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Paper
              elevation={0}
              sx={{
                bgcolor: "#f0f7ff",
                height: "100%",
                borderRadius: 3,
                p: 0.5,
                boxShadow: "0 2px 20px rgba(0,0,0,0.05)",
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <Box>
                    <Typography color="textSecondary" gutterBottom>
                      Total Projects
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>
                      {projects.length}
                    </Typography>
                  </Box>
                  <Avatar
                    sx={{
                      bgcolor: "#3b82f6",
                      width: 48,
                      height: 48,
                      boxShadow: 2,
                    }}
                  >
                    <DashboardIcon />
                  </Avatar>
                </Box>
              </CardContent>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper
              elevation={0}
              sx={{
                bgcolor: "#f0fff4",
                height: "100%",
                borderRadius: 3,
                p: 0.5,
                boxShadow: "0 2px 20px rgba(0,0,0,0.05)",
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <Box>
                    <Typography color="textSecondary" gutterBottom>
                      Completed Tasks
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>
                      {projects.length > 0 ? 12 : 0}
                    </Typography>
                  </Box>
                  <Avatar
                    sx={{
                      bgcolor: "#10b981",
                      width: 48,
                      height: 48,
                      boxShadow: 2,
                    }}
                  >
                    <CheckCircleIcon />
                  </Avatar>
                </Box>
              </CardContent>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper
              elevation={0}
              sx={{
                bgcolor: "#fff9eb",
                height: "100%",
                borderRadius: 3,
                p: 0.5,
                boxShadow: "0 2px 20px rgba(0,0,0,0.05)",
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <Box>
                    <Typography color="textSecondary" gutterBottom>
                      In Progress
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>
                      {projects.length > 0 ? 8 : 0}
                    </Typography>
                  </Box>
                  <Avatar
                    sx={{
                      bgcolor: "#f59e0b",
                      width: 48,
                      height: 48,
                      boxShadow: 2,
                    }}
                  >
                    <TimerIcon />
                  </Avatar>
                </Box>
              </CardContent>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {/* Project Management Section */}
      <Box sx={{ mb: 5 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
            }}
          >
            <FolderIcon sx={{ mr: 1.5 }} />
            Projects
          </Typography>

          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              size="small"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{
                width: 240,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  bgcolor: "white",
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />

            <Button
              variant="outlined"
              startIcon={<FilterListIcon />}
              sx={{
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 500,
              }}
            >
              Filter
            </Button>

            <Button
              variant="outlined"
              startIcon={<SortIcon />}
              sx={{
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 500,
              }}
            >
              Sort
            </Button>
          </Box>
        </Box>

        <Paper
          elevation={0}
          sx={{
            mb: 4,
            borderRadius: 3,
            boxShadow: "0 2px 20px rgba(0,0,0,0.05)",
          }}
        >
          <CardContent sx={{ p: 0 }}>
            <Box
              onClick={() => setIsFormVisible(!isFormVisible)}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                cursor: "pointer",
                py: 2,
                px: 3,
                borderRadius: 3,
                bgcolor: isFormVisible
                  ? "rgba(59, 130, 246, 0.05)"
                  : "transparent",
                transition: "background-color 0.2s",
                "&:hover": {
                  bgcolor: "rgba(59, 130, 246, 0.05)",
                },
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  color: "#3b82f6",
                }}
              >
                <AddIcon sx={{ mr: 1.5 }} />
                Create New Project
              </Typography>
              {isFormVisible ? (
                <KeyboardArrowUpIcon />
              ) : (
                <KeyboardArrowDownIcon />
              )}
            </Box>

            {isFormVisible && (
              <>
                <Divider sx={{ my: 0 }} />
                <Box sx={{ p: 3 }}>
                  <form onSubmit={handleCreateProject}>
                    <Box sx={{ mb: 3 }}>
                      <TextField
                        id="projectName"
                        label="Project Name"
                        variant="outlined"
                        fullWidth
                        placeholder="Enter project name"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        required
                        autoFocus
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                          },
                        }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <LabelIcon fontSize="small" />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Box>

                    <Box sx={{ mb: 3 }}>
                      <Typography
                        variant="subtitle2"
                        sx={{ mb: 1.5, display: "flex", alignItems: "center" }}
                      >
                        <ColorLensIcon fontSize="small" sx={{ mr: 1 }} />
                        Project Color
                      </Typography>
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5 }}>
                        {colorOptions.map((color) => (
                          <Tooltip key={color.value} title={color.label} arrow>
                            <Box
                              onClick={() => setProjectColor(color.value)}
                              sx={{
                                width: 36,
                                height: 36,
                                borderRadius: "50%",
                                bgcolor: color.value,
                                cursor: "pointer",
                                border:
                                  projectColor === color.value
                                    ? "2px solid #000"
                                    : "2px solid transparent",
                                boxShadow:
                                  projectColor === color.value
                                    ? "0 0 0 2px rgba(0,0,0,0.2)"
                                    : "none",
                                transition: "all 0.2s",
                                "&:hover": {
                                  transform: "scale(1.1)",
                                  boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
                                },
                              }}
                              aria-label={`Select ${color.label} color`}
                            />
                          </Tooltip>
                        ))}
                      </Box>
                    </Box>

                    <Box sx={{ display: "flex", gap: 2 }}>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        startIcon={<AddIcon />}
                        sx={{
                          py: 1.5,
                          px: 3,
                          borderRadius: 2,
                          textTransform: "none",
                          fontWeight: 600,
                          boxShadow: 2,
                        }}
                      >
                        Create Project
                      </Button>
                      <Button
                        type="button"
                        variant="outlined"
                        sx={{
                          py: 1.5,
                          px: 3,
                          borderRadius: 2,
                          textTransform: "none",
                          fontWeight: 500,
                        }}
                        onClick={() => setIsFormVisible(false)}
                      >
                        Cancel
                      </Button>
                    </Box>
                  </form>
                </Box>
              </>
            )}
          </CardContent>
        </Paper>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            Your Projects ({filteredProjects.length})
          </Typography>
          {filteredProjects.length > 0 && searchTerm && (
            <Typography variant="body2" color="textSecondary">
              Showing {filteredProjects.length} of {projects.length} projects
            </Typography>
          )}
        </Box>

        {filteredProjects.length > 0 ? (
          <Grid container spacing={3}>
            {filteredProjects.map((project) => (
              <Grid item xs={12} md={6} lg={4} key={project.id}>
                <Card
                  sx={{
                    height: "100%",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    borderRadius: 3,
                    overflow: "hidden",
                    boxShadow: "0 2px 20px rgba(0,0,0,0.05)",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: "0 12px 30px rgba(0,0,0,0.1)",
                    },
                  }}
                >
                  <CardActionArea
                    onClick={() =>
                      navigate(`/project/${project.id}`, {
                        state: { projectId: project.id },
                      })
                    }
                  >
                    <Box
                      sx={{
                        height: 8,
                        bgcolor: project.color,
                      }}
                    />
                    <CardContent sx={{ p: 3 }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Avatar
                            sx={{
                              bgcolor: project.color,
                              width: 40,
                              height: 40,
                              mr: 2,
                              boxShadow: 1,
                            }}
                          >
                            {project.name.charAt(0).toUpperCase()}
                          </Avatar>
                          <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            {project.name}
                          </Typography>
                        </Box>
                        <Box sx={{ display: "flex" }}>
                          <Tooltip title="Bookmark">
                            <IconButton size="small">
                              <BookmarkIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete Project">
                            <IconButton
                              aria-label="delete"
                              onClick={(e) =>
                                handleDeleteProject(project.id, e)
                              }
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

                      <Box sx={{ mt: 3, mb: 2 }}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            mb: 1,
                          }}
                        >
                          <Typography variant="body2" color="textSecondary">
                            Progress
                          </Typography>
                          <Typography variant="body2" fontWeight="600">
                            {getProgressValue()}%
                          </Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={getProgressValue()}
                          sx={{
                            height: 8,
                            borderRadius: 4,
                            bgcolor: "rgba(0,0,0,0.04)",
                            "& .MuiLinearProgress-bar": {
                              bgcolor: project.color,
                              borderRadius: 4,
                            },
                          }}
                        />
                      </Box>

                      <Divider sx={{ my: 2 }} />

                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Box sx={{ display: "flex", gap: 1 }}>
                          <Chip
                            icon={<CheckCircleIcon fontSize="small" />}
                            label={`${getTaskCount()} Done`}
                            size="small"
                            sx={{
                              fontSize: "0.75rem",
                              borderRadius: 2,
                              bgcolor: "rgba(16, 185, 129, 0.1)",
                              color: "#10b981",
                              fontWeight: 500,
                            }}
                          />
                          <Chip
                            icon={<TimerIcon fontSize="small" />}
                            label={`${getTaskCount()} In Progress`}
                            size="small"
                            sx={{
                              fontSize: "0.75rem",
                              borderRadius: 2,
                              bgcolor: "rgba(245, 158, 11, 0.1)",
                              color: "#f59e0b",
                              fontWeight: 500,
                            }}
                          />
                        </Box>
                        <Box>
                          <AvatarGroup
                            max={3}
                            sx={{
                              "& .MuiAvatar-root": { width: 28, height: 28 },
                            }}
                          >
                            {[...Array(Math.min(4, getTaskCount()))].map(
                              (_, i) => (
                                <Avatar
                                  key={i}
                                  sx={{
                                    fontSize: "0.75rem",
                                    bgcolor: [
                                      "#3b82f6",
                                      "#10b981",
                                      "#f59e0b",
                                      "#8b5cf6",
                                      "#ef4444",
                                    ][i % 5],
                                    boxShadow: 1,
                                  }}
                                >
                                  {String.fromCharCode(65 + i)}
                                </Avatar>
                              )
                            )}
                          </AvatarGroup>
                        </Box>
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Paper
            elevation={0}
            sx={{
              borderRadius: 3,
              boxShadow: "0 2px 20px rgba(0,0,0,0.05)",
            }}
          >
            <CardContent sx={{ p: 5, textAlign: "center" }}>
              <Box sx={{ maxWidth: 400, mx: "auto" }}>
                <FolderIcon sx={{ fontSize: 70, color: "#d1d5db", mb: 2 }} />
                <Typography variant="h6" gutterBottom fontWeight={600}>
                  {searchTerm
                    ? "No matching projects found"
                    : "No projects yet"}
                </Typography>
                <Typography color="textSecondary" sx={{ mb: 3 }}>
                  {searchTerm
                    ? `Try adjusting your search term or create a new project.`
                    : `Create your first project to get started with tracking your
                    work and organizing your tasks.`}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AddIcon />}
                  onClick={() => {
                    setIsFormVisible(true);
                    setSearchTerm("");
                  }}
                  sx={{
                    textTransform: "none",
                    py: 1.5,
                    px: 3,
                    borderRadius: 2,
                    fontWeight: 600,
                    boxShadow: 2,
                  }}
                >
                  {searchTerm ? "Create New Project" : "Create First Project"}
                </Button>
              </Box>
            </CardContent>
          </Paper>
        )}
      </Box>
    </Container>
  );
};

export default Project;
