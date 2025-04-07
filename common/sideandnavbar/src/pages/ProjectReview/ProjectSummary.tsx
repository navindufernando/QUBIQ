import { useState } from "react";
import {
  Grid, Paper, Typography, Box, LinearProgress, Chip, Divider, List, ListItem, ListItemText,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button
} from "@mui/material";
import { ProjectData } from "./types";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import InfoIcon from "@mui/icons-material/Info";
import ErrorIcon from "@mui/icons-material/Error";
import WarningIcon from "@mui/icons-material/Warning";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import apiService from "../../services/apiService";

interface ProjectSummaryProps {
  project: ProjectData;
  setProject: (project: ProjectData) => void;
  handleOpenEditSection: (section: string, index?: number) => void;
}

// Utility function to safely format dates
const formatDate = (date: any): string => {
  if (!date) return "N/A";
  const parsedDate = new Date(date);
  return isNaN(parsedDate.getTime()) ? "Invalid Date" : parsedDate.toLocaleDateString();
};

export default function ProjectSummary({
  project,
  setProject,
  handleOpenEditSection,
}: ProjectSummaryProps) {
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleSelectSection = (section: string, index?: number) => {
    setSelectedSection(section);
    setSelectedIndex(index !== undefined ? index : null);
  };

  const handleDeselectSection = () => {
    setSelectedSection(null);
    setSelectedIndex(null);
  };

  const handleDeleteItem = async (section: string, index?: number) => {
    try {
      if (section === "objectives" && index !== undefined) {
        const objectiveId = project.objectives[index].id;
        await apiService.deleteObjective(objectiveId);
        setProject({
          ...project,
          objectives: project.objectives.filter((_, i) => i !== index),
        });
      } else if (section === "highlights" && index !== undefined) {
        const highlightId = project.highlights[index].id;
        await apiService.deleteHighlight(highlightId);
        setProject({
          ...project,
          highlights: project.highlights.filter((_, i) => i !== index),
        });
      } else if (section === "risks" && index !== undefined) {
        const riskId = project.risks[index].id;
        await apiService.deleteRisk(riskId);
        setProject({
          ...project,
          risks: project.risks.filter((_, i) => i !== index),
        });
      }
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "high": return <ErrorIcon color="error" />;
      case "medium": return <WarningIcon color="warning" />;
      case "low": return <CheckCircleIcon color="success" />;
      default: return <InfoIcon color="info" />;
    }
  };

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={8}>
        <Paper elevation={0} sx={{ p: 3, borderRadius: 3, boxShadow: "0 2px 20px rgba(0,0,0,0.05)", height: "100%" }}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>Project Overview</Typography>
          </Box>
          <Box
            sx={{ cursor: "pointer", p: 1, bgcolor: selectedSection === "description" ? "rgba(0, 0, 0, 0.04)" : "transparent", borderRadius: 1 }}
            onMouseEnter={() => handleSelectSection("description")}
            onMouseLeave={handleDeselectSection}
          >
            {project.description ? (
              <>
                <Typography variant="body1" paragraph>{project.description}</Typography>
                <Typography variant="caption" color="textSecondary">
                  Created: {formatDate(project.createdAt)} | Updated: {formatDate(project.updatedAt)}
                </Typography>
              </>
            ) : (
              <Typography variant="body1" color="textSecondary">No description provided yet. Click to add one.</Typography>
            )}
            {selectedSection === "description" && (
              <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
                <Button variant="outlined" size="small" startIcon={<EditIcon />} onClick={() => handleOpenEditSection("description")}>
                  Edit
                </Button>
              </Box>
            )}
          </Box>

          <Box sx={{ my: 3 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Objectives</Typography>
              <Button size="small" variant="outlined" startIcon={<EditIcon />} onClick={() => handleOpenEditSection("objectives")}>
                Add
              </Button>
            </Box>
            <List disablePadding>
              {project.objectives.length > 0 ? (
                project.objectives.map((objective, index) => (
                  <Box
                    key={index}
                    sx={{ py: 0.5, px: 1, cursor: "pointer", bgcolor: selectedSection === "objectives" && selectedIndex === index ? "rgba(0, 0, 0, 0.04)" : "transparent", borderRadius: 1 }}
                    onMouseEnter={() => handleSelectSection("objectives", index)}
                    onMouseLeave={handleDeselectSection}
                  >
                    <ListItem sx={{ py: 0 }}>
                      <CheckCircleIcon fontSize="small" color="primary" sx={{ mr: 1 }} />
                      <ListItemText
                        primary={objective.content}
                        secondary={`Created: ${formatDate(objective.createdAt)} | Updated: ${formatDate(objective.updatedAt)}`}
                      />
                    </ListItem>
                    {selectedSection === "objectives" && selectedIndex === index && (
                      <Box sx={{ mt: 1, display: "flex", gap: 1 }}>
                        <Button variant="outlined" size="small" startIcon={<EditIcon />} onClick={() => handleOpenEditSection("objectives", index)}>
                          Edit
                        </Button>
                        <Button variant="outlined" size="small" startIcon={<DeleteIcon />} onClick={() => handleDeleteItem("objectives", index)} color="error">
                          Delete
                        </Button>
                      </Box>
                    )}
                  </Box>
                ))
              ) : (
                <Typography variant="body2" color="textSecondary">No objectives added yet.</Typography>
              )}
            </List>
          </Box>

          <Box sx={{ my: 3 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Key Highlights</Typography>
              <Button size="small" variant="outlined" startIcon={<EditIcon />} onClick={() => handleOpenEditSection("highlights")}>
                Add
              </Button>
            </Box>
            <List disablePadding>
              {project.highlights.length > 0 ? (
                project.highlights.map((highlight, index) => (
                  <Box
                    key={index}
                    sx={{ py: 0.5, px: 1, cursor: "pointer", bgcolor: selectedSection === "highlights" && selectedIndex === index ? "rgba(0, 0, 0, 0.04)" : "transparent", borderRadius: 1 }}
                    onMouseEnter={() => handleSelectSection("highlights", index)}
                    onMouseLeave={handleDeselectSection}
                  >
                    <ListItem sx={{ py: 0 }}>
                      <InfoIcon fontSize="small" color="primary" sx={{ mr: 1 }} />
                      <ListItemText
                        primary={highlight.content}
                        secondary={`Created: ${formatDate(highlight.createdAt)} | Updated: ${formatDate(highlight.updatedAt)}`}
                      />
                    </ListItem>
                    {selectedSection === "highlights" && selectedIndex === index && (
                      <Box sx={{ mt: 1, display: "flex", gap: 1 }}>
                        <Button variant="outlined" size="small" startIcon={<EditIcon />} onClick={() => handleOpenEditSection("highlights", index)}>
                          Edit
                        </Button>
                        <Button variant="outlined" size="small" startIcon={<DeleteIcon />} onClick={() => handleDeleteItem("highlights", index)} color="error">
                          Delete
                        </Button>
                      </Box>
                    )}
                  </Box>
                ))
              ) : (
                <Typography variant="body2" color="textSecondary">No highlights added yet.</Typography>
              )}
            </List>
          </Box>

          <Box sx={{ my: 3 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Risk Assessment</Typography>
              <Button size="small" variant="outlined" startIcon={<EditIcon />} onClick={() => handleOpenEditSection("risks")}>
                Add
              </Button>
            </Box>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Severity</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>History</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {project.risks.length > 0 ? (
                    project.risks.map((risk, index) => (
                      <Box
                        key={index}
                        sx={{ cursor: "pointer", bgcolor: selectedSection === "risks" && selectedIndex === index ? "rgba(0, 0, 0, 0.04)" : "transparent" }}
                        onMouseEnter={() => handleSelectSection("risks", index)}
                        onMouseLeave={handleDeselectSection}
                      >
                        <TableRow>
                          <TableCell>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              {getSeverityIcon(risk.severity)}
                              <Typography variant="body2" sx={{ ml: 1, textTransform: "capitalize", fontWeight: 500 }}>{risk.severity}</Typography>
                            </Box>
                          </TableCell>
                          <TableCell>{risk.description}</TableCell>
                          <TableCell>
                            <Typography variant="caption" color="textSecondary">
                              Created: {formatDate(risk.createdAt)}<br />Updated: {formatDate(risk.updatedAt)}
                            </Typography>
                          </TableCell>
                        </TableRow>
                        {selectedSection === "risks" && selectedIndex === index && (
                          <TableRow>
                            <TableCell colSpan={3}>
                              <Box sx={{ mt: 1, display: "flex", gap: 1 }}>
                                <Button variant="outlined" size="small" startIcon={<EditIcon />} onClick={() => handleOpenEditSection("risks", index)}>
                                  Edit
                                </Button>
                                <Button variant="outlined" size="small" startIcon={<DeleteIcon />} onClick={() => handleDeleteItem("risks", index)} color="error">
                                  Delete
                                </Button>
                              </Box>
                            </TableCell>
                          </TableRow>
                        )}
                      </Box>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3}>
                        <Typography variant="body2" color="textSecondary" align="center">No risks added yet.</Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Paper>
      </Grid>

      <Grid item xs={12} md={4}>
        <Paper elevation={0} sx={{ p: 3, borderRadius: 3, boxShadow: "0 2px 20px rgba(0,0,0,0.05)" }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>Project Metrics</Typography>
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
              <Typography variant="body2" color="textSecondary">Completion</Typography>
              <Typography variant="body2" fontWeight="600">{project.completion}%</Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={project.completion}
              sx={{ height: 8, borderRadius: 4, bgcolor: "rgba(0,0,0,0.04)", "& .MuiLinearProgress-bar": { borderRadius: 4 } }}
            />
          </Box>
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={6}><Box sx={{ p: 2, bgcolor: "rgba(59, 130, 246, 0.1)", borderRadius: 2 }}><Typography variant="body2" color="textSecondary" gutterBottom>Start Date</Typography><Typography variant="body1" fontWeight="600">{project.startDate || "N/A"}</Typography></Box></Grid>
            <Grid item xs={6}><Box sx={{ p: 2, bgcolor: "rgba(59, 130, 246, 0.1)", borderRadius: 2 }}><Typography variant="body2" color="textSecondary" gutterBottom>End Date</Typography><Typography variant="body1" fontWeight="600">{project.endDate || "N/A"}</Typography></Box></Grid>
            <Grid item xs={6}><Box sx={{ p: 2, bgcolor: "rgba(16, 185, 129, 0.1)", borderRadius: 2 }}><Typography variant="body2" color="textSecondary" gutterBottom>Budget</Typography><Typography variant="body1" fontWeight="600">{project.budget || "N/A"}</Typography></Box></Grid>
            <Grid item xs={6}><Box sx={{ p: 2, bgcolor: "rgba(245, 158, 11, 0.1)", borderRadius: 2 }}><Typography variant="body2" color="textSecondary" gutterBottom>Spent</Typography><Typography variant="body1" fontWeight="600">{project.spent || "N/A"}</Typography></Box></Grid>
          </Grid>
          <Box sx={{ p: 2, bgcolor: "rgba(99, 102, 241, 0.1)", borderRadius: 2, mb: 3 }}>
            <Typography variant="subtitle2" gutterBottom>Status</Typography>
            <Chip label={project.status || "Not Started"} color="primary" size="small" sx={{ fontWeight: 600, fontSize: "0.875rem", px: 1 }} />
          </Box>
          <Divider sx={{ my: 3 }} />
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>Key Metrics</Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}><Typography variant="body2" color="textSecondary">Team Members</Typography><Typography variant="h6" fontWeight="600">0</Typography></Grid>
            <Grid item xs={6}><Typography variant="body2" color="textSecondary">Milestones</Typography><Typography variant="h6" fontWeight="600">0/0</Typography></Grid>
            <Grid item xs={6}><Typography variant="body2" color="textSecondary">Open Tasks</Typography><Typography variant="h6" fontWeight="600">0</Typography></Grid>
            <Grid item xs={6}><Typography variant="body2" color="textSecondary">Completed</Typography><Typography variant="h6" fontWeight="600">0</Typography></Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}