import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  Paper,
  Divider,
  Avatar,
  Card,
  CardContent,
  Grid,
  Tabs,
  Tab,
  TextField,
  Button,
  IconButton,
  Chip,
  List,
  ListItem,
  ListItemText,
  Rating,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Menu,
  MenuItem,
  Tooltip,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem as SelectMenuItem,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import InfoIcon from "@mui/icons-material/Info";
import ForumIcon from "@mui/icons-material/Forum";
import GroupIcon from "@mui/icons-material/Group";
import AssessmentIcon from "@mui/icons-material/Assessment";
import BusinessIcon from "@mui/icons-material/Business";
import PersonIcon from "@mui/icons-material/Person";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";
import SortIcon from "@mui/icons-material/Sort";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import WarningIcon from "@mui/icons-material/Warning";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

const mockProjectData = {
  id: "1",
  name: "",
  description: { content: "", createdAt: null, updatedAt: null },
  startDate: "",
  endDate: "",
  status: "",
  completion: 0,
  budget: "",
  spent: "",
  objectives: [],
  risks: [],
  highlights: [],
};

const mockFeedback = [];
const mockCommunicationLogs = [];
const mockTeamInsights = [];

const ProjectReview = () => {
  const [tabValue, setTabValue] = useState(0);
  const [project, setProject] = useState<any>(null);
  const [feedback, setFeedback] = useState<any[]>([]);
  const [communicationLogs, setCommunicationLogs] = useState<any[]>([]);
  const [teamInsights, setTeamInsights] = useState<any[]>([]);
  const [newComment, setNewComment] = useState("");
  const [newSentiment, setNewSentiment] = useState("neutral");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editedProjectName, setEditedProjectName] = useState("");
  const [editSection, setEditSection] = useState<string | null>(null);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [newDescription, setNewDescription] = useState("");
  const [newObjective, setNewObjective] = useState("");
  const [newHighlight, setNewHighlight] = useState("");
  const [newRisk, setNewRisk] = useState({ severity: "", description: "" });
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [editFeedbackId, setEditFeedbackId] = useState<string | null>(null);
  const [editFeedbackContent, setEditFeedbackContent] = useState("");
  const [editFeedbackSentiment, setEditFeedbackSentiment] = useState("");

  const { projectId } = useParams();
  const location = useLocation();

  useEffect(() => {
    setProject(mockProjectData);
    setFeedback(mockFeedback);
    setCommunicationLogs(mockCommunicationLogs);
    setTeamInsights(mockTeamInsights);
  }, [projectId]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleFilterClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    const newFeedbackItem = {
      id: `f${feedback.length + 1}`,
      author: { name: "Current User", avatar: null, role: "Your Role" },
      date: new Date().toISOString().split("T")[0],
      content: newComment,
      sentiment: newSentiment,
      replies: [],
    };
    setFeedback([newFeedbackItem, ...feedback]);
    setNewComment("");
    setNewSentiment("neutral");
  };

  const handleEditFeedback = (id: string) => {
    const feedbackItem = feedback.find((item) => item.id === id);
    if (feedbackItem) {
      setEditFeedbackId(id);
      setEditFeedbackContent(feedbackItem.content);
      setEditFeedbackSentiment(feedbackItem.sentiment);
      setIsEditDialogOpen(true);
    }
  };

  const handleSaveEditedFeedback = () => {
    if (!editFeedbackContent.trim() || !editFeedbackId) return;
    setFeedback(
      feedback.map((item) =>
        item.id === editFeedbackId
          ? {
              ...item,
              content: editFeedbackContent,
              sentiment: editFeedbackSentiment,
              date: new Date().toISOString().split("T")[0], // Update date on edit
            }
          : item
      )
    );
    setIsEditDialogOpen(false);
    setEditFeedbackId(null);
    setEditFeedbackContent("");
    setEditFeedbackSentiment("");
  };

  const handleDeleteFeedback = (id: string) => {
    setFeedback(feedback.filter((item) => item.id !== id));
  };

  const handleOpenEditDialog = () => {
    setEditedProjectName(project.name);
    setIsEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setIsEditDialogOpen(false);
    setEditSection(null);
    setEditIndex(null);
    setNewDescription("");
    setNewObjective("");
    setNewHighlight("");
    setNewRisk({ severity: "", description: "" });
    setEditFeedbackId(null);
    setEditFeedbackContent("");
    setEditFeedbackSentiment("");
  };

  const handleSaveProjectName = () => {
    setProject({ ...project, name: editedProjectName });
    setIsEditDialogOpen(false);
  };

  const handleSelectSection = (section: string, index?: number) => {
    setSelectedSection(section);
    setSelectedIndex(index !== undefined ? index : null);
  };

  const handleDeselectSection = () => {
    setSelectedSection(null);
    setSelectedIndex(null);
  };

  const handleOpenEditSection = (section: string, index?: number) => {
    setEditSection(section);
    setEditIndex(index !== undefined ? index : null);
    if (section === "description") {
      setNewDescription(project.description.content);
    } else if (section === "objectives" && index !== undefined) {
      setNewObjective(project.objectives[index].content);
    } else if (section === "highlights" && index !== undefined) {
      setNewHighlight(project.highlights[index].content);
    } else if (section === "risks" && index !== undefined) {
      setNewRisk({
        severity: project.risks[index].severity,
        description: project.risks[index].description,
      });
    }
    setIsEditDialogOpen(true);
  };

  const handleSaveSection = () => {
    const currentDate = new Date().toISOString();
    if (editSection === "description") {
      setProject({
        ...project,
        description: {
          content: newDescription,
          createdAt: project.description.createdAt || currentDate,
          updatedAt: project.description.createdAt ? currentDate : null,
        },
      });
    } else if (editSection === "objectives") {
      if (editIndex !== null) {
        const updatedObjectives = [...project.objectives];
        updatedObjectives[editIndex] = {
          ...updatedObjectives[editIndex],
          content: newObjective,
          updatedAt: currentDate,
        };
        setProject({ ...project, objectives: updatedObjectives });
      } else {
        setProject({
          ...project,
          objectives: [
            ...project.objectives,
            { content: newObjective, createdAt: currentDate, updatedAt: null },
          ],
        });
      }
    } else if (editSection === "highlights") {
      if (editIndex !== null) {
        const updatedHighlights = [...project.highlights];
        updatedHighlights[editIndex] = {
          ...updatedHighlights[editIndex],
          content: newHighlight,
          updatedAt: currentDate,
        };
        setProject({ ...project, highlights: updatedHighlights });
      } else {
        setProject({
          ...project,
          highlights: [
            ...project.highlights,
            { content: newHighlight, createdAt: currentDate, updatedAt: null },
          ],
        });
      }
    } else if (editSection === "risks") {
      if (editIndex !== null) {
        const updatedRisks = [...project.risks];
        updatedRisks[editIndex] = {
          ...updatedRisks[editIndex],
          severity: newRisk.severity,
          description: newRisk.description,
          updatedAt: currentDate,
        };
        setProject({ ...project, risks: updatedRisks });
      } else {
        setProject({
          ...project,
          risks: [
            ...project.risks,
            {
              severity: newRisk.severity,
              description: newRisk.description,
              createdAt: currentDate,
              updatedAt: null,
            },
          ],
        });
      }
    }
    handleCloseEditDialog();
    setSelectedSection(null);
    setSelectedIndex(null);
  };

  const handleDeleteItem = (section: string, index?: number) => {
    if (section === "objectives" && index !== undefined) {
      setProject({
        ...project,
        objectives: project.objectives.filter((_: any, i: number) => i !== index),
      });
    } else if (section === "highlights" && index !== undefined) {
      setProject({
        ...project,
        highlights: project.highlights.filter((_: any, i: number) => i !== index),
      });
    } else if (section === "risks" && index !== undefined) {
      setProject({
        ...project,
        risks: project.risks.filter((_: any, i: number) => i !== index),
      });
    }
    setSelectedSection(null);
    setSelectedIndex(null);
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return <SentimentVerySatisfiedIcon color="success" />;
      case "negative":
        return <SentimentDissatisfiedIcon color="error" />;
      default:
        return <SentimentSatisfiedIcon color="action" />;
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "high":
        return <ErrorIcon color="error" />;
      case "medium":
        return <WarningIcon color="warning" />;
      case "low":
        return <CheckCircleIcon color="success" />;
      default:
        return <InfoIcon color="info" />;
    }
  };

  if (!project) {
    return null;
  }

  const hasContent =
    project.name ||
    project.description.content ||
    project.objectives.length > 0 ||
    project.highlights.length > 0 ||
    project.risks.length > 0 ||
    feedback.length > 0 ||
    communicationLogs.length > 0 ||
    teamInsights.length > 0;

  if (!hasContent) {
    return (
      <Container maxWidth="xl" sx={{ py: 4, minHeight: "100vh", display: "flex", alignItems: "center" }}>
        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: 3,
            boxShadow: "0 2px 20px rgba(0,0,0,0.05)",
            width: "100%",
            maxWidth: 600,
            mx: "auto",
            textAlign: "center",
            bgcolor: "#fafafa",
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            sx={{ fontWeight: 700, color: "#1e293b", mb: 2 }}
          >
            Welcome to Project Review
          </Typography>
          <Typography
            variant="subtitle1"
            color="textSecondary"
            sx={{ mb: 4, fontStyle: "italic" }}
          >
            Get started by naming your project to unlock a comprehensive review dashboard.
          </Typography>
          <Box
            sx={{
              bgcolor: "rgba(0, 0, 0, 0.04)",
              p: 3,
              borderRadius: 2,
              mb: 4,
            }}
          >
            <Typography variant="body1" color="textSecondary" sx={{ mb: 2 }}>
              Once you add a project name, you can:
            </Typography>
            <List disablePadding sx={{ textAlign: "left", maxWidth: 400, mx: "auto" }}>
              <ListItem sx={{ py: 0.5 }}>
                <CheckCircleIcon fontSize="small" color="primary" sx={{ mr: 1 }} />
                <ListItemText primary="Track progress and metrics" />
              </ListItem>
              <ListItem sx={{ py: 0.5 }}>
                <CheckCircleIcon fontSize="small" color="primary" sx={{ mr: 1 }} />
                <ListItemText primary="Add objectives and highlights" />
              </ListItem>
              <ListItem sx={{ py: 0.5 }}>
                <CheckCircleIcon fontSize="small" color="primary" sx={{ mr: 1 }} />
                <ListItemText primary="Manage risks and feedback" />
              </ListItem>
            </List>
          </Box>
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            onClick={handleOpenEditDialog}
            sx={{
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 500,
              boxShadow: 2,
              bgcolor: "#3b82f6",
              "&:hover": { bgcolor: "#2563eb" },
              py: 1.5,
              px: 3,
            }}
          >
            Add Project Name
          </Button>
        </Paper>

        <Dialog
          open={isEditDialogOpen}
          onClose={handleCloseEditDialog}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Add Project Name</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Project Name"
              fullWidth
              variant="outlined"
              value={editedProjectName}
              onChange={(e) => setEditedProjectName(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseEditDialog}>Cancel</Button>
            <Button
              onClick={handleSaveProjectName}
              variant="contained"
              disabled={!editedProjectName.trim()}
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 3,
          boxShadow: "0 2px 20px rgba(0,0,0,0.05)",
          bgcolor: "#fafafa",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              variant="h4"
              component="h1"
              sx={{ fontWeight: 700, color: "#1e293b" }}
            >
              Project Review{project.name ? `: ${project.name}` : ""}
            </Typography>
            <IconButton
              onClick={handleOpenEditDialog}
              sx={{ ml: 1 }}
              aria-label="edit project name"
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Box>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              variant="outlined"
              startIcon={<CalendarTodayIcon />}
              sx={{
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 500,
                borderColor: "#64748b",
                color: "#64748b",
              }}
            >
              Export Report
            </Button>
            <Button
              variant="contained"
              startIcon={<AssessmentIcon />}
              sx={{
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 500,
                boxShadow: 2,
                bgcolor: "#3b82f6",
                "&:hover": { bgcolor: "#2563eb" },
              }}
            >
              Generate Insights
            </Button>
            <IconButton
              aria-label="more options"
              onClick={handleMenuClick}
              sx={{ ml: 1 }}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleMenuClose}>Print Report</MenuItem>
              <MenuItem onClick={handleMenuClose}>Share Report</MenuItem>
              <MenuItem onClick={handleMenuClose}>Archive Project</MenuItem>
            </Menu>
          </Box>
        </Box>

        <Typography
          variant="subtitle1"
          color="textSecondary"
          sx={{ mt: 1, mb: 3, fontStyle: "italic" }}
        >
          A comprehensive analysis of project performance, feedback, and insights
        </Typography>

        <Divider sx={{ my: 3, borderColor: "#e2e8f0" }} />

        <Box sx={{ mb: 2 }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="project review tabs"
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              "& .MuiTab-root": {
                textTransform: "none",
                fontWeight: 600,
                fontSize: "1rem",
                minWidth: 120,
                color: "#64748b",
                "&.Mui-selected": { color: "#3b82f6" },
              },
              "& .MuiTabs-indicator": { bgcolor: "#3b82f6" },
            }}
          >
            <Tab
              icon={<InfoIcon />}
              iconPosition="start"
              label="Project Summary"
              id="tab-0"
              aria-controls="tabpanel-0"
            />
            <Tab
              icon={<ForumIcon />}
              iconPosition="start"
              label="Comments & Feedback"
              id="tab-1"
              aria-controls="tabpanel-1"
            />
            <Tab
              icon={<BusinessIcon />}
              iconPosition="start"
              label="Stakeholder Communications"
              id="tab-2"
              aria-controls="tabpanel-2"
            />
            <Tab
              icon={<GroupIcon />}
              iconPosition="start"
              label="Team Insights"
              id="tab-3"
              aria-controls="tabpanel-3"
            />
          </Tabs>
        </Box>
      </Paper>

      <Dialog
        open={isEditDialogOpen}
        onClose={handleCloseEditDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {editFeedbackId
            ? "Edit Feedback"
            : editSection
            ? editIndex !== null
              ? `Edit ${editSection}`
              : `Add ${editSection}`
            : project.name
            ? "Edit Project Name"
            : "Add Project Name"}
        </DialogTitle>
        <DialogContent>
          {editFeedbackId ? (
            <>
              <TextField
                autoFocus
                margin="dense"
                label="Feedback"
                fullWidth
                multiline
                rows={3}
                variant="outlined"
                value={editFeedbackContent}
                onChange={(e) => setEditFeedbackContent(e.target.value)}
              />
              <Select
                fullWidth
                value={editFeedbackSentiment}
                onChange={(e) => setEditFeedbackSentiment(e.target.value)}
                sx={{ mt: 2 }}
              >
                <SelectMenuItem value="positive">Positive</SelectMenuItem>
                <SelectMenuItem value="negative">Negative</SelectMenuItem>
                <SelectMenuItem value="neutral">Neutral</SelectMenuItem>
              </Select>
            </>
          ) : editSection === "description" ? (
            <TextField
              autoFocus
              margin="dense"
              label="Project Description"
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
            />
          ) : editSection === "objectives" ? (
            <TextField
              autoFocus
              margin="dense"
              label="Objective"
              fullWidth
              variant="outlined"
              value={newObjective}
              onChange={(e) => setNewObjective(e.target.value)}
            />
          ) : editSection === "highlights" ? (
            <TextField
              autoFocus
              margin="dense"
              label="Highlight"
              fullWidth
              variant="outlined"
              value={newHighlight}
              onChange={(e) => setNewHighlight(e.target.value)}
            />
          ) : editSection === "risks" ? (
            <>
              <TextField
                select
                margin="dense"
                label="Severity"
                fullWidth
                variant="outlined"
                value={newRisk.severity}
                onChange={(e) => setNewRisk({ ...newRisk, severity: e.target.value })}
              >
                <MenuItem value="high">High</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="low">Low</MenuItem>
              </TextField>
              <TextField
                autoFocus
                margin="dense"
                label="Risk Description"
                fullWidth
                variant="outlined"
                value={newRisk.description}
                onChange={(e) => setNewRisk({ ...newRisk, description: e.target.value })}
              />
            </>
          ) : (
            <TextField
              autoFocus
              margin="dense"
              label="Project Name"
              fullWidth
              variant="outlined"
              value={editedProjectName}
              onChange={(e) => setEditedProjectName(e.target.value)}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog}>Cancel</Button>
          <Button
            onClick={
              editFeedbackId
                ? handleSaveEditedFeedback
                : editSection
                ? handleSaveSection
                : handleSaveProjectName
            }
            variant="contained"
            disabled={
              editFeedbackId
                ? !editFeedbackContent.trim()
                : editSection === "description"
                ? !newDescription.trim()
                : editSection === "objectives"
                ? !newObjective.trim()
                : editSection === "highlights"
                ? !newHighlight.trim()
                : editSection === "risks"
                ? !newRisk.severity || !newRisk.description.trim()
                : !editedProjectName.trim()
            }
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <TabPanel value={tabValue} index={0}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 3,
                boxShadow: "0 2px 20px rgba(0,0,0,0.05)",
                height: "100%",
              }}
            >
              <Box sx={{ mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Project Overview
                </Typography>
              </Box>
              <Box
                sx={{
                  cursor: "pointer",
                  p: 1,
                  bgcolor:
                    selectedSection === "description" ? "rgba(0, 0, 0, 0.04)" : "transparent",
                  borderRadius: 1,
                }}
                onMouseEnter={() => handleSelectSection("description")}
                onMouseLeave={handleDeselectSection}
              >
                {project.description.content ? (
                  <>
                    <Typography variant="body1" paragraph>
                      {project.description.content}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      Created: {project.description.createdAt || "N/A"} | Updated:{" "}
                      {project.description.updatedAt || "N/A"}
                    </Typography>
                  </>
                ) : (
                  <Typography variant="body1" color="textSecondary">
                    No description provided yet. Click to add one.
                  </Typography>
                )}
                {selectedSection === "description" && (
                  <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<EditIcon />}
                      onClick={() => handleOpenEditSection("description")}
                    >
                      Edit
                    </Button>
                  </Box>
                )}
              </Box>

              <Box sx={{ my: 3 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    Objectives
                  </Typography>
                  <Button
                    size="small"
                    variant="outlined"
                    startIcon={<EditIcon />}
                    onClick={() => handleOpenEditSection("objectives")}
                  >
                    Add
                  </Button>
                </Box>
                <List disablePadding>
                  {project.objectives.length > 0 ? (
                    project.objectives.map((objective: any, index: number) => (
                      <Box
                        key={index}
                        sx={{
                          py: 0.5,
                          px: 1,
                          cursor: "pointer",
                          bgcolor:
                            selectedSection === "objectives" && selectedIndex === index
                              ? "rgba(0, 0, 0, 0.04)"
                              : "transparent",
                          borderRadius: 1,
                        }}
                        onMouseEnter={() => handleSelectSection("objectives", index)}
                        onMouseLeave={handleDeselectSection}
                      >
                        <ListItem sx={{ py: 0 }}>
                          <CheckCircleIcon fontSize="small" color="primary" sx={{ mr: 1 }} />
                          <ListItemText
                            primary={objective.content}
                            secondary={`Created: ${objective.createdAt || "N/A"} | Updated: ${
                              objective.updatedAt || "N/A"
                            }`}
                          />
                        </ListItem>
                        {selectedSection === "objectives" && selectedIndex === index && (
                          <Box sx={{ mt: 1, display: "flex", gap: 1 }}>
                            <Button
                              variant="outlined"
                              size="small"
                              startIcon={<EditIcon />}
                              onClick={() => handleOpenEditSection("objectives", index)}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="outlined"
                              size="small"
                              startIcon={<DeleteIcon />}
                              onClick={() => handleDeleteItem("objectives", index)}
                              color="error"
                            >
                              Delete
                            </Button>
                          </Box>
                        )}
                      </Box>
                    ))
                  ) : (
                    <Typography variant="body2" color="textSecondary">
                      No objectives added yet.
                    </Typography>
                  )}
                </List>
              </Box>

              <Box sx={{ my: 3 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    Key Highlights
                  </Typography>
                  <Button
                    size="small"
                    variant="outlined"
                    startIcon={<EditIcon />}
                    onClick={() => handleOpenEditSection("highlights")}
                  >
                    Add
                  </Button>
                </Box>
                <List disablePadding>
                  {project.highlights.length > 0 ? (
                    project.highlights.map((highlight: any, index: number) => (
                      <Box
                        key={index}
                        sx={{
                          py: 0.5,
                          px: 1,
                          cursor: "pointer",
                          bgcolor:
                            selectedSection === "highlights" && selectedIndex === index
                              ? "rgba(0, 0, 0, 0.04)"
                              : "transparent",
                          borderRadius: 1,
                        }}
                        onMouseEnter={() => handleSelectSection("highlights", index)}
                        onMouseLeave={handleDeselectSection}
                      >
                        <ListItem sx={{ py: 0 }}>
                          <InfoIcon fontSize="small" color="primary" sx={{ mr: 1 }} />
                          <ListItemText
                            primary={highlight.content}
                            secondary={`Created: ${highlight.createdAt || "N/A"} | Updated: ${
                              highlight.updatedAt || "N/A"
                            }`}
                          />
                        </ListItem>
                        {selectedSection === "highlights" && selectedIndex === index && (
                          <Box sx={{ mt: 1, display: "flex", gap: 1 }}>
                            <Button
                              variant="outlined"
                              size="small"
                              startIcon={<EditIcon />}
                              onClick={() => handleOpenEditSection("highlights", index)}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="outlined"
                              size="small"
                              startIcon={<DeleteIcon />}
                              onClick={() => handleDeleteItem("highlights", index)}
                              color="error"
                            >
                              Delete
                            </Button>
                          </Box>
                        )}
                      </Box>
                    ))
                  ) : (
                    <Typography variant="body2" color="textSecondary">
                      No highlights added yet.
                    </Typography>
                  )}
                </List>
              </Box>

              <Box sx={{ my: 3 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    Risk Assessment
                  </Typography>
                  <Button
                    size="small"
                    variant="outlined"
                    startIcon={<EditIcon />}
                    onClick={() => handleOpenEditSection("risks")}
                  >
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
                        project.risks.map((risk: any, index: number) => (
                          <Box
                            key={index}
                            sx={{
                              cursor: "pointer",
                              bgcolor:
                                selectedSection === "risks" && selectedIndex === index
                                  ? "rgba(0, 0, 0, 0.04)"
                                  : "transparent",
                            }}
                            onMouseEnter={() => handleSelectSection("risks", index)}
                            onMouseLeave={handleDeselectSection}
                          >
                            <TableRow>
                              <TableCell>
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                  {getSeverityIcon(risk.severity)}
                                  <Typography
                                    variant="body2"
                                    sx={{
                                      ml: 1,
                                      textTransform: "capitalize",
                                      fontWeight: 500,
                                    }}
                                  >
                                    {risk.severity}
                                  </Typography>
                                </Box>
                              </TableCell>
                              <TableCell>{risk.description}</TableCell>
                              <TableCell>
                                <Typography variant="caption" color="textSecondary">
                                  Created: {risk.createdAt || "N/A"}
                                  <br />
                                  Updated: {risk.updatedAt || "N/A"}
                                </Typography>
                              </TableCell>
                            </TableRow>
                            {selectedSection === "risks" && selectedIndex === index && (
                              <TableRow>
                                <TableCell colSpan={3}>
                                  <Box sx={{ mt: 1, display: "flex", gap: 1 }}>
                                    <Button
                                      variant="outlined"
                                      size="small"
                                      startIcon={<EditIcon />}
                                      onClick={() => handleOpenEditSection("risks", index)}
                                    >
                                      Edit
                                    </Button>
                                    <Button
                                      variant="outlined"
                                      size="small"
                                      startIcon={<DeleteIcon />}
                                      onClick={() => handleDeleteItem("risks", index)}
                                      color="error"
                                    >
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
                            <Typography variant="body2" color="textSecondary" align="center">
                              No risks added yet.
                            </Typography>
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
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 3,
                boxShadow: "0 2px 20px rgba(0,0,0,0.05)",
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Project Metrics
              </Typography>

              <Box sx={{ mb: 3 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 1,
                  }}
                >
                  <Typography variant="body2" color="textSecondary">
                    Completion
                  </Typography>
                  <Typography variant="body2" fontWeight="600">
                    {project.completion}%
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={project.completion}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    bgcolor: "rgba(0,0,0,0.04)",
                    "& .MuiLinearProgress-bar": { borderRadius: 4 },
                  }}
                />
              </Box>

              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={6}>
                  <Box
                    sx={{ p: 2, bgcolor: "rgba(59, 130, 246, 0.1)", borderRadius: 2 }}
                  >
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                      Start Date
                    </Typography>
                    <Typography variant="body1" fontWeight="600">
                      {project.startDate || "N/A"}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box
                    sx={{ p: 2, bgcolor: "rgba(59, 130, 246, 0.1)", borderRadius: 2 }}
                  >
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                      End Date
                    </Typography>
                    <Typography variant="body1" fontWeight="600">
                      {project.endDate || "N/A"}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box
                    sx={{ p: 2, bgcolor: "rgba(16, 185, 129, 0.1)", borderRadius: 2 }}
                  >
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                      Budget
                    </Typography>
                    <Typography variant="body1" fontWeight="600">
                      {project.budget || "N/A"}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box
                    sx={{ p: 2, bgcolor: "rgba(245, 158, 11, 0.1)", borderRadius: 2 }}
                  >
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                      Spent
                    </Typography>
                    <Typography variant="body1" fontWeight="600">
                      {project.spent || "N/A"}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>

              <Box
                sx={{ p: 2, bgcolor: "rgba(99, 102, 241, 0.1)", borderRadius: 2, mb: 3 }}
              >
                <Typography variant="subtitle2" gutterBottom>
                  Status
                </Typography>
                <Chip
                  label={project.status || "Not Started"}
                  color="primary"
                  size="small"
                  sx={{ fontWeight: 600, fontSize: "0.875rem", px: 1 }}
                />
              </Box>

              <Divider sx={{ my: 3 }} />

              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                Key Metrics
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="body2" color="textSecondary">
                    Team Members
                  </Typography>
                  <Typography variant="h6" fontWeight="600">
                    0
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="textSecondary">
                    Milestones
                  </Typography>
                  <Typography variant="h6" fontWeight="600">
                    0/0
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="textSecondary">
                    Open Tasks
                  </Typography>
                  <Typography variant="h6" fontWeight="600">
                    0
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="textSecondary">
                    Completed
                  </Typography>
                  <Typography variant="h6" fontWeight="600">
                    0
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 3,
                boxShadow: "0 2px 20px rgba(0,0,0,0.05)",
                mb: 4,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Add Your Feedback
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={3}
                placeholder="Share your thoughts, feedback, or questions about the project..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                variant="outlined"
                sx={{ mb: 2 }}
              />
              <Select
                fullWidth
                value={newSentiment}
                onChange={(e) => setNewSentiment(e.target.value)}
                sx={{ mb: 2 }}
              >
                <SelectMenuItem value="positive">Positive</SelectMenuItem>
                <SelectMenuItem value="negative">Negative</SelectMenuItem>
                <SelectMenuItem value="neutral">Neutral</SelectMenuItem>
              </Select>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Button
                  startIcon={<AttachFileIcon />}
                  sx={{ borderRadius: 2, textTransform: "none", fontWeight: 500 }}
                >
                  Attach Files
                </Button>
                <Button
                  variant="contained"
                  endIcon={<SendIcon />}
                  onClick={handleAddComment}
                  disabled={!newComment.trim()}
                  sx={{
                    borderRadius: 2,
                    textTransform: "none",
                    fontWeight: 500,
                    boxShadow: 2,
                  }}
                >
                  Submit Feedback
                </Button>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Feedback & Comments ({feedback.length})
              </Typography>

              <Box sx={{ display: "flex", gap: 2 }}>
                <TextField
                  size="small"
                  placeholder="Search feedback..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  sx={{ width: 220, "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
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
                  onClick={handleFilterClick}
                  sx={{ borderRadius: 2, textTransform: "none", fontWeight: 500 }}
                >
                  Filter
                </Button>
                <Menu
                  anchorEl={filterAnchorEl}
                  open={Boolean(filterAnchorEl)}
                  onClose={handleFilterClose}
                >
                  <MenuItem onClick={handleFilterClose}>All Feedback</MenuItem>
                  <MenuItem onClick={handleFilterClose}>Positive Only</MenuItem>
                  <MenuItem onClick={handleFilterClose}>Negative Only</MenuItem>
                  <MenuItem onClick={handleFilterClose}>Neutral Only</MenuItem>
                  <MenuItem onClick={handleFilterClose}>With Replies</MenuItem>
                </Menu>

                <Button
                  variant="outlined"
                  startIcon={<SortIcon />}
                  sx={{ borderRadius: 2, textTransform: "none", fontWeight: 500 }}
                >
                  Sort
                </Button>
              </Box>
            </Box>

            {feedback.length > 0 ? (
              feedback.map((item) => (
                <Paper
                  key={item.id}
                  elevation={0}
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    boxShadow: "0 2px 20px rgba(0,0,0,0.05)",
                    mb: 3,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      mb: 2,
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Avatar sx={{ bgcolor: "#3b82f6", width: 40, height: 40, mr: 2 }}>
                        {item.author.name.charAt(0)}
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                          {item.author.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {item.author.role} • {item.date}
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Chip
                        label={item.sentiment}
                        size="small"
                        color={
                          item.sentiment === "positive"
                            ? "success"
                            : item.sentiment === "negative"
                            ? "error"
                            : "default"
                        }
                        sx={{ textTransform: "capitalize" }}
                      />
                      {getSentimentIcon(item.sentiment)}
                    </Box>
                  </Box>

                  <Typography variant="body1" paragraph sx={{ mt: 2 }}>
                    {item.content}
                  </Typography>

                  <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
                    <Button
                      size="small"
                      startIcon={<ThumbUpIcon />}
                      sx={{ borderRadius: 2, textTransform: "none" }}
                    >
                      Helpful
                    </Button>
                    <Button
                      size="small"
                      startIcon={<ThumbDownIcon />}
                      sx={{ borderRadius: 2, textTransform: "none" }}
                    >
                      Not Helpful
                    </Button>
                    <Button
                      size="small"
                      sx={{ borderRadius: 2, textTransform: "none" }}
                    >
                      Reply
                    </Button>
                    <Button
                      size="small"
                      startIcon={<EditIcon />}
                      onClick={() => handleEditFeedback(item.id)}
                      sx={{ borderRadius: 2, textTransform: "none" }}
                    >
                      Edit
                    </Button>
                    <Button
                      size="small"
                      startIcon={<DeleteIcon />}
                      onClick={() => handleDeleteFeedback(item.id)}
                      color="error"
                      sx={{ borderRadius: 2, textTransform: "none" }}
                    >
                      Delete
                    </Button>
                  </Box>

                  {item.replies && item.replies.length > 0 && (
                    <Box sx={{ mt: 3, ml: 5 }}>
                      {item.replies.map((reply) => (
                        <Box key={reply.id} sx={{ mb: 3 }}>
                          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                            <Avatar
                              sx={{ bgcolor: "#10b981", width: 32, height: 32, mr: 1.5 }}
                            >
                              {reply.author.name.charAt(0)}
                            </Avatar>
                            <Box>
                              <Typography variant="subtitle2">
                                {reply.author.name}
                              </Typography>
                              <Typography variant="caption" color="textSecondary">
                                {reply.author.role} • {reply.date}
                              </Typography>
                            </Box>
                          </Box>
                          <Typography variant="body2" sx={{ ml: 6 }}>
                            {reply.content}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  )}
                </Paper>
              ))
            ) : (
              <Box sx={{ textAlign: "center", py: 4 }}>
                <Typography variant="body1" color="textSecondary">
                  No feedback has been submitted yet.
                </Typography>
              </Box>
            )}
          </Grid>
        </Grid>
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Stakeholder Communications ({communicationLogs.length})
              </Typography>

              <Box sx={{ display: "flex", gap: 2 }}>
                <TextField
                  size="small"
                  placeholder="Search communications..."
                  sx={{ width: 220, "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
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
                  sx={{ borderRadius: 2, textTransform: "none", fontWeight: 500 }}
                >
                  Filter
                </Button>
                <Button
                  variant="contained"
                  sx={{ borderRadius: 2, textTransform: "none", fontWeight: 500 }}
                >
                  Record New Communication
                </Button>
              </Box>
            </Box>

            {communicationLogs.length > 0 ? (
              communicationLogs.map((log) => (
                <Accordion
                  key={log.id}
                  elevation={0}
                  sx={{
                    mb: 2,
                    borderRadius: "12px !important",
                    overflow: "hidden",
                    boxShadow: "0 2px 20px rgba(0,0,0,0.05)",
                    "&:before": { display: "none" },
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel-${log.id}-content`}
                    id={`panel-${log.id}-header`}
                    sx={{ px: 3 }}
                  >
                    <Box sx={{ width: "100%" }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          width: "100%",
                        }}
                      >
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Avatar
                            sx={{
                              bgcolor: log.stakeholder.type === "Client" ? "#3b82f6" : "#10b981",
                              width: 40,
                              height: 40,
                              mr: 2,
                            }}
                          >
                            {log.stakeholder.type === "Client" ? (
                              <BusinessIcon fontSize="small" />
                            ) : (
                              <PersonIcon fontSize="small" />
                            )}
                          </Avatar>
                          <Box>
                            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                              {log.stakeholder.name}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              {log.stakeholder.type} • {log.date} • {log.channel}
                            </Typography>
                          </Box>
                        </Box>

                        <Chip
                          label={log.sentiment}
                          size="small"
                          color={
                            log.sentiment === "positive"
                              ? "success"
                              : log.sentiment === "negative"
                              ? "error"
                              : "default"
                          }
                          sx={{ textTransform: "capitalize", fontWeight: 500 }}
                        />
                      </Box>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails sx={{ px: 3, pb: 3 }}>
                    <Typography variant="body1" paragraph>
                      <strong>Contact Person:</strong> {log.stakeholder.contactPerson},{" "}
                      {log.stakeholder.position}
                    </Typography>
                    <Typography variant="body1" paragraph>
                      <strong>Summary:</strong> {log.summary}
                    </Typography>

                    <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>
                      Action Items:
                    </Typography>
                    <List disablePadding>
                      {log.action_items.map((item, index) => (
                        <ListItem
                          key={index}
                          sx={{ py: 0.5, px: 0, display: "flex", alignItems: "center" }}
                        >
                          <CheckCircleIcon fontSize="small" color="primary" sx={{ mr: 1 }} />
                          <Typography variant="body2">{item}</Typography>
                        </ListItem>
                      ))}
                    </List>
                  </AccordionDetails>
                </Accordion>
              ))
            ) : (
              <Box sx={{ textAlign: "center", py: 4 }}>
                <Typography variant="body1" color="textSecondary">
                  No communications recorded yet.
                </Typography>
              </Box>
            )}
          </Grid>
        </Grid>
      </TabPanel>

      <TabPanel value={tabValue} index={3}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Team Insights ({teamInsights.length})
              </Typography>

              <Box sx={{ display: "flex", gap: 2 }}>
                <Button
                  variant="outlined"
                  startIcon={<FilterListIcon />}
                  sx={{ borderRadius: 2, textTransform: "none", fontWeight: 500 }}
                >
                  Filter by Role
                </Button>
                <Button
                  variant="contained"
                  sx={{ borderRadius: 2, textTransform: "none", fontWeight: 500 }}
                >
                  Request New Insights
                </Button>
              </Box>
            </Box>

            {teamInsights.length > 0 ? (
              teamInsights.map((insight) => (
                <Card
                  key={insight.id}
                  elevation={0}
                  sx={{
                    borderRadius: 3,
                    boxShadow: "0 2px 20px rgba(0,0,0,0.05)",
                    mb: 3,
                    overflow: "visible",
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        mb: 2,
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Avatar sx={{ bgcolor: "#6366f1", width: 40, height: 40, mr: 2 }}>
                          {insight.member.name.charAt(0)}
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                            {insight.member.name}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            {insight.member.role} • {insight.date}
                          </Typography>
                        </Box>
                      </Box>
                      <Tooltip title="Team Member Performance Rating">
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            bgcolor: "rgba(99, 102, 241, 0.1)",
                            p: 1,
                            borderRadius: 2,
                          }}
                        >
                          <Rating
                            value={insight.rating}
                            precision={0.5}
                            readOnly
                            size="small"
                          />
                          <Typography variant="body2" sx={{ fontWeight: 500, ml: 1 }}>
                            {insight.rating.toFixed(1)}
                          </Typography>
                        </Box>
                      </Tooltip>
                    </Box>

                    <Typography variant="body1" paragraph sx={{ mt: 2 }}>
                      {insight.content}
                    </Typography>

                    <Box sx={{ mt: 3 }}>
                      <Typography variant="subtitle2" sx={{ mb: 1 }}>
                        Focus Areas:
                      </Typography>
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                        {insight.focus_areas.map((area, index) => (
                          <Chip
                            key={index}
                            label={area}
                            size="small"
                            sx={{
                              borderRadius: 2,
                              bgcolor: "rgba(99, 102, 241, 0.1)",
                              color: "#6366f1",
                              fontWeight: 500,
                            }}
                          />
                        ))}
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Box sx={{ textAlign: "center", py: 4 }}>
                <Typography variant="body1" color="textSecondary">
                  No team insights available yet.
                </Typography>
              </Box>
            )}
          </Grid>
        </Grid>
      </TabPanel>
    </Container>
  );
};

export default ProjectReview;