import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container, Paper, Typography, Box, Divider, Tabs, Tab, IconButton, Button, Menu, MenuItem
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AssessmentIcon from "@mui/icons-material/Assessment";
import InfoIcon from "@mui/icons-material/Info";
import ForumIcon from "@mui/icons-material/Forum";
import GroupIcon from "@mui/icons-material/Group";
import BusinessIcon from "@mui/icons-material/Business";
import TabPanel from "./reusablecomponents/TabPanel";
import EditDialog from "./reusablecomponents/EditDialog";
import ProjectSummary from "./ProjectSummary";
import CommentsFeedback from "./CommentsFeedback";
import StakeholderCommunications from "./StakeholderCommunications";
import TeamInsights from "./TeamInsights";
import { ProjectData, FeedbackItem } from "./types";
import apiService from "../../services/apiService";
import { useAuth } from "../Signup&Login/AuthContext";

export default function ProjectReviewComponent() {
  const [tabValue, setTabValue] = useState(0);
  const [project, setProject] = useState<ProjectData | null>(null);
  const [feedback, setFeedback] = useState<FeedbackItem[]>([]);
  const [communicationLogs, setCommunicationLogs] = useState<any[]>([]);
  const [teamInsights, setTeamInsights] = useState<any[]>([]);
  const [projectId, setProjectId] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editedProjectName, setEditedProjectName] = useState("");
  const [editSection, setEditSection] = useState<string | null>(null);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [newDescription, setNewDescription] = useState("");
  const [newObjective, setNewObjective] = useState("");
  const [newHighlight, setNewHighlight] = useState("");
  const [newRisk, setNewRisk] = useState({ severity: "", description: "" });
  const [editFeedbackId, setEditFeedbackId] = useState<string | null>(null);
  const [editFeedbackContent, setEditFeedbackContent] = useState("");
  const [editFeedbackSentiment, setEditFeedbackSentiment] = useState("");
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleOpenEditDialog = () => {
    setEditedProjectName(project?.name || "");
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

  const handleSaveProjectName = async () => {
    if (!user) return;
    try {
      let newProjectData: ProjectData;
      if (projectId && project) {
        newProjectData = await apiService.updateProjectReview(projectId, { name: editedProjectName });
      } else {
        const response = await apiService.createProjectReview({ name: editedProjectName, creatorId: user.id });
        newProjectData = {
          ...response,
          creator: { firstName: user.firstName || "", lastName: user.lastName || "", role: user.role },
          completion: 0,
          createdAt: new Date(),
          objectives: [],
          risks: [],
          highlights: [],
          feedbackItems: [],
          communicationLogs: [],
          teamInsights: [],
        };
        setProjectId(response.id); // Set projectId after creation
      }
      setProject(newProjectData);
      setFeedback(newProjectData.feedbackItems || []);
      setCommunicationLogs(newProjectData.communicationLogs || []);
      setTeamInsights(newProjectData.teamInsights || []);
      setIsEditDialogOpen(false);
    } catch (error) {
      console.error("Failed to save project name:", error);
    }
  };

  const handleOpenEditSection = (section: string, index?: number) => {
    if (user?.role !== 'PM') return;
    setEditSection(section);
    setEditIndex(index !== undefined ? index : null);
    if (!project) return;
    if (section === "description") {
      setNewDescription(project.description || "");
    } else if (section === "objectives" && index !== undefined) {
      setNewObjective(project.objectives[index].content);
    } else if (section === "highlights" && index !== undefined) {
      setNewHighlight(project.highlights[index].content);
    } else if (section === "risks" && index !== undefined) {
      setNewRisk({ severity: project.risks[index].severity, description: project.risks[index].description });
    }
    setIsEditDialogOpen(true);
  };

  const handleSaveSection = async () => {
    if (!projectId || !project || user?.role !== 'PM') return;
    try {
      if (editSection === "description") {
        const updatedProject = await apiService.updateProjectReview(projectId, { description: newDescription });
        setProject(updatedProject);
      } else if (editSection === "objectives") {
        if (editIndex !== null) {
          const objectiveId = project.objectives[editIndex].id;
          const updatedObjective = await apiService.updateObjective(objectiveId, newObjective);
          const updatedObjectives = project.objectives.map((obj, i) => (i === editIndex ? updatedObjective : obj));
          setProject({ ...project, objectives: updatedObjectives });
        } else {
          const newObjectiveData = await apiService.createObjective(projectId, newObjective);
          setProject({ ...project, objectives: [...project.objectives, newObjectiveData] });
        }
      } else if (editSection === "highlights") {
        if (editIndex !== null) {
          const highlightId = project.highlights[editIndex].id;
          const updatedHighlight = await apiService.updateHighlight(highlightId, newHighlight);
          const updatedHighlights = project.highlights.map((hl, i) => (i === editIndex ? updatedHighlight : hl));
          setProject({ ...project, highlights: updatedHighlights });
        } else {
          const newHighlightData = await apiService.createHighlight(projectId, newHighlight);
          setProject({ ...project, highlights: [...project.highlights, newHighlightData] });
        }
      } else if (editSection === "risks") {
        if (editIndex !== null) {
          const riskId = project.risks[editIndex].id;
          const updatedRisk = await apiService.updateRisk(riskId, newRisk.severity, newRisk.description);
          const updatedRisks = project.risks.map((risk, i) => (i === editIndex ? updatedRisk : risk));
          setProject({ ...project, risks: updatedRisks });
        } else {
          const newRiskData = await apiService.createRisk(projectId, newRisk.severity, newRisk.description);
          setProject({ ...project, risks: [...project.risks, newRiskData] });
        }
      }
      handleCloseEditDialog();
    } catch (error) {
      console.error("Failed to save section:", error);
    }
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

  const handleSaveEditedFeedback = async () => {
    if (!editFeedbackContent.trim() || !editFeedbackId || !projectId) return;
    try {
      const updatedFeedback = await apiService.updateFeedback(
        editFeedbackId,
        editFeedbackContent,
        editFeedbackSentiment,
        new Date().toISOString().split("T")[0]
      );
      setFeedback(feedback.map((item) => (item.id === editFeedbackId ? updatedFeedback : item)));
      handleCloseEditDialog();
    } catch (error) {
      console.error("Failed to update feedback:", error);
    }
  };

  const hasContent = project && (
    project.name ||
    project.description ||
    project.objectives.length > 0 ||
    project.highlights.length > 0 ||
    project.risks.length > 0 ||
    feedback.length > 0 ||
    communicationLogs.length > 0 ||
    teamInsights.length > 0
  );

  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  if (!hasContent) {
    return (
      <Container maxWidth="xl" sx={{ py: 4, minHeight: "100vh", display: "flex", alignItems: "center" }}>
        <Paper elevation={0} sx={{ p: 4, borderRadius: 3, boxShadow: "0 2px 20px rgba(0,0,0,0.05)", width: "100%", maxWidth: 600, mx: "auto", textAlign: "center", bgcolor: "#fafafa" }}>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 700, color: "#1e293b", mb: 2 }}>Welcome to Project Review</Typography>
          <Typography variant="subtitle1" color="textSecondary" sx={{ mb: 4, fontStyle: "italic" }}>Get started by naming your project to unlock a comprehensive review dashboard.</Typography>
          <Box sx={{ bgcolor: "rgba(0, 0, 0, 0.04)", p: 3, borderRadius: 2, mb: 4 }}>
            <Typography variant="body1" color="textSecondary" sx={{ mb: 2 }}>Once you add a project name, you can:</Typography>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li><Typography variant="body1" sx={{ display: "flex", alignItems: "center" }}><CheckCircleIcon fontSize="small" color="primary" sx={{ mr: 1 }} />Track progress and metrics</Typography></li>
              <li><Typography variant="body1" sx={{ display: "flex", alignItems: "center" }}><CheckCircleIcon fontSize="small" color="primary" sx={{ mr: 1 }} />Add objectives and highlights</Typography></li>
              <li><Typography variant="body1" sx={{ display: "flex", alignItems: "center" }}><CheckCircleIcon fontSize="small" color="primary" sx={{ mr: 1 }} />Manage risks and feedback</Typography></li>
            </ul>
          </Box>
          <Button variant="contained" startIcon={<EditIcon />} onClick={handleOpenEditDialog} sx={{ borderRadius: 2, textTransform: "none", fontWeight: 500, boxShadow: 2, bgcolor: "#3b82f6", "&:hover": { bgcolor: "#2563eb" }, py: 1.5, px: 3 }} disabled={user?.role !== 'PM'}>Add Project Name</Button>
        </Paper>
        <EditDialog
          isOpen={isEditDialogOpen}
          onClose={handleCloseEditDialog}
          editFeedbackId={editFeedbackId}
          editFeedbackContent={editFeedbackContent}
          setEditFeedbackContent={setEditFeedbackContent}
          editFeedbackSentiment={editFeedbackSentiment}
          setEditFeedbackSentiment={setEditFeedbackSentiment}
          editSection={editSection}
          editIndex={editIndex}
          newDescription={newDescription}
          setNewDescription={setNewDescription}
          newObjective={newObjective}
          setNewObjective={setNewObjective}
          newHighlight={newHighlight}
          setNewHighlight={setNewHighlight}
          newRisk={newRisk}
          setNewRisk={setNewRisk}
          editedProjectName={editedProjectName}
          setEditedProjectName={setEditedProjectName}
          project={project || { id: '', name: '', completion: 0, createdAt: new Date(), creator: { firstName: user?.firstName || '', lastName: user?.lastName || '', role: user?.role || '' }, objectives: [], risks: [], highlights: [], feedbackItems: [], communicationLogs: [], teamInsights: [] }}
          onSave={handleSaveProjectName}
        />
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Paper elevation={0} sx={{ p: 3, mb: 4, borderRadius: 3, boxShadow: "0 2px 20px rgba(0,0,0,0.05)", bgcolor: "#fafafa" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 700, color: "#1e293b" }}>Project Review{project.name ? `: ${project.name}` : ""}</Typography>
            {user?.role === 'PM' && (
              <IconButton onClick={handleOpenEditDialog} sx={{ ml: 1 }} aria-label="edit project name"><EditIcon fontSize="small" /></IconButton>
            )}
          </Box>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button variant="outlined" startIcon={<CalendarTodayIcon />} sx={{ borderRadius: 2, textTransform: "none", fontWeight: 500, borderColor: "#64748b", color: "#64748b" }}>Export Report</Button>
            <Button variant="contained" startIcon={<AssessmentIcon />} sx={{ borderRadius: 2, textTransform: "none", fontWeight: 500, boxShadow: 2, bgcolor: "#3b82f6", "&:hover": { bgcolor: "#2563eb" } }}>Generate Insights</Button>
            <IconButton aria-label="more options" onClick={handleMenuClick} sx={{ ml: 1 }}><MoreVertIcon /></IconButton>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
              <MenuItem onClick={handleMenuClose}>Print Report</MenuItem>
              <MenuItem onClick={handleMenuClose}>Share Report</MenuItem>
              <MenuItem onClick={handleMenuClose}>Archive Project</MenuItem>
            </Menu>
          </Box>
        </Box>
        <Typography variant="subtitle1" color="textSecondary" sx={{ mt: 1, mb: 3, fontStyle: "italic" }}>A comprehensive analysis of project performance, feedback, and insights</Typography>
        <Divider sx={{ my: 3, borderColor: "#e2e8f0" }} />
        <Box sx={{ mb: 2 }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="project review tabs"
            variant="scrollable"
            scrollButtons="auto"
            sx={{ "& .MuiTab-root": { textTransform: "none", fontWeight: 600, fontSize: "1rem", minWidth: 120, color: "#64748b", "&.Mui-selected": { color: "#3b82f6" } }, "& .MuiTabs-indicator": { bgcolor: "#3b82f6" } }}
          >
            <Tab icon={<InfoIcon />} iconPosition="start" label="Project Summary" id="tab-0" aria-controls="tabpanel-0" />
            <Tab icon={<ForumIcon />} iconPosition="start" label="Comments & Feedback" id="tab-1" aria-controls="tabpanel-1" />
            <Tab icon={<BusinessIcon />} iconPosition="start" label="Stakeholder Communications" id="tab-2" aria-controls="tabpanel-2" />
            <Tab icon={<GroupIcon />} iconPosition="start" label="Team Insights" id="tab-3" aria-controls="tabpanel-3" />
          </Tabs>
        </Box>
      </Paper>

      <EditDialog
        isOpen={isEditDialogOpen}
        onClose={handleCloseEditDialog}
        editFeedbackId={editFeedbackId}
        editFeedbackContent={editFeedbackContent}
        setEditFeedbackContent={setEditFeedbackContent}
        editFeedbackSentiment={editFeedbackSentiment}
        setEditFeedbackSentiment={setEditFeedbackSentiment}
        editSection={editSection}
        editIndex={editIndex}
        newDescription={newDescription}
        setNewDescription={setNewDescription}
        newObjective={newObjective}
        setNewObjective={setNewObjective}
        newHighlight={newHighlight}
        setNewHighlight={setNewHighlight}
        newRisk={newRisk}
        setNewRisk={setNewRisk}
        editedProjectName={editedProjectName}
        setEditedProjectName={setEditedProjectName}
        project={project!}
        onSave={editFeedbackId ? handleSaveEditedFeedback : editSection ? handleSaveSection : handleSaveProjectName}
      />

      <TabPanel value={tabValue} index={0}>
        <ProjectSummary
          project={project!}
          setProject={setProject}
          handleOpenEditSection={handleOpenEditSection}
        />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        {projectId && (
          <CommentsFeedback
            feedback={feedback}
            setFeedback={setFeedback}
            handleEditFeedback={handleEditFeedback}
            projectId={projectId}
          />
        )}
      </TabPanel>
      <TabPanel value={tabValue} index={2}>
        <StakeholderCommunications communicationLogs={communicationLogs} projectId={projectId!} setCommunicationLogs={setCommunicationLogs} />
      </TabPanel>
      <TabPanel value={tabValue} index={3}>
        <TeamInsights teamInsights={teamInsights} projectId={projectId!} setTeamInsights={setTeamInsights} />
      </TabPanel>
    </Container>
  );
}