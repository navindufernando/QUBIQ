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
  ListItemAvatar,
  ListItemText,
  Rating,
  Badge,
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

// Mock data for development
const mockProjectData = {
  id: "1",
  name: "Project Alpha",
  description:
    "A comprehensive digital transformation initiative aimed at modernizing legacy systems and improving customer experience across all touchpoints.",
  startDate: "2024-01-15",
  endDate: "2024-06-30",
  status: "In Progress",
  completion: 65,
  budget: "$245,000",
  spent: "$158,250",
  objectives: [
    "Migrate legacy systems to cloud infrastructure",
    "Implement new customer portal with enhanced features",
    "Reduce operational costs by 30%",
    "Increase customer satisfaction scores by 25%",
  ],
  risks: [
    { severity: "high", description: "Data migration issues" },
    { severity: "medium", description: "Team bandwidth constraints" },
    { severity: "low", description: "Third-party API integration delays" },
  ],
  highlights: [
    "Successfully completed Phase 1 ahead of schedule",
    "Customer feedback on new UI has been overwhelmingly positive",
    "Identified cost-saving opportunities beyond initial estimates",
  ],
};

// Mock feedback data
const mockFeedback = [
  {
    id: "f1",
    author: {
      name: "Emily Chen",
      avatar: null,
      role: "Product Manager",
    },
    date: "2024-03-15",
    content:
      "The new dashboard design is excellent! The team has done a great job incorporating user feedback from the last session. I particularly like the new analytics visualization.",
    sentiment: "positive",
    replies: [
      {
        id: "r1",
        author: {
          name: "David Kim",
          avatar: null,
          role: "UX Designer",
        },
        date: "2024-03-15",
        content:
          "Thanks Emily! We're continuing to iterate on the charts based on the user testing sessions.",
      },
    ],
  },
  {
    id: "f2",
    author: {
      name: "Michael Scott",
      avatar: null,
      role: "Marketing Director",
    },
    date: "2024-03-10",
    content:
      "The landing page still doesn't clearly communicate our value proposition. We need to make the benefits more explicit and add more compelling CTAs.",
    sentiment: "negative",
    replies: [
      {
        id: "r2",
        author: {
          name: "Sarah Wong",
          avatar: null,
          role: "Project Lead",
        },
        date: "2024-03-10",
        content:
          "I agree, Michael. Let's schedule a workshop to revise the messaging and CTAs. I'll send a calendar invite for next week.",
      },
    ],
  },
  {
    id: "f3",
    author: {
      name: "James Wilson",
      avatar: null,
      role: "CTO",
    },
    date: "2024-03-05",
    content:
      "The backend performance improvements are impressive. Page load times have decreased by 40% according to our metrics. Great work by the engineering team!",
    sentiment: "positive",
    replies: [],
  },
];

// Mock stakeholder communication logs
const mockCommunicationLogs = [
  {
    id: "c1",
    stakeholder: {
      name: "Global Finance Inc.",
      type: "Client",
      contactPerson: "Robert Thompson",
      position: "CFO",
    },
    date: "2024-03-18",
    channel: "Video Conference",
    summary:
      "Presented Phase 2 progress and timeline. Client expressed satisfaction with current progress but raised concerns about the authentication system security. We've agreed to conduct an additional security audit before proceeding to Phase 3.",
    action_items: [
      "Schedule security audit with external vendor",
      "Prepare detailed report on authentication protocols",
      "Share updated timeline by end of week",
    ],
    sentiment: "neutral",
  },
  {
    id: "c2",
    stakeholder: {
      name: "Executive Board",
      type: "Internal",
      contactPerson: "Jennifer Hayes",
      position: "CEO",
    },
    date: "2024-03-12",
    channel: "Quarterly Review Meeting",
    summary:
      "Presented project ROI forecasts and current progress. Board is pleased with development pace but questioned resource allocation. We've been asked to prepare a detailed breakdown of resource utilization and potential optimization opportunities.",
    action_items: [
      "Prepare resource allocation report",
      "Identify potential areas for optimization",
      "Update financial projections for Q3 and Q4",
    ],
    sentiment: "positive",
  },
  {
    id: "c3",
    stakeholder: {
      name: "Compliance Department",
      type: "Internal",
      contactPerson: "Mark Rogers",
      position: "Compliance Officer",
    },
    date: "2024-03-08",
    channel: "Email Thread",
    summary:
      "Discussed GDPR compliance requirements for user data handling. Several concerns were raised about our current approach to consent management. Need to revise data handling protocols before launch.",
    action_items: [
      "Review and update privacy policy",
      "Implement explicit consent mechanisms",
      "Schedule follow-up meeting with legal team",
    ],
    sentiment: "negative",
  },
];

// Mock team insights
const mockTeamInsights = [
  {
    id: "i1",
    member: {
      name: "Sarah Wong",
      avatar: null,
      role: "Project Lead",
    },
    date: "2024-03-20",
    content:
      "The team has shown exceptional resilience in adapting to the scope changes. I'm particularly impressed with how the engineers quickly pivoted when we had to change our authentication provider mid-project. However, we're still facing challenges with resource allocation - the UX team is stretched thin with the additional requirements from the client.",
    rating: 4,
    focus_areas: ["Team coordination", "Resource management", "Client expectations"],
  },
  {
    id: "i2",
    member: {
      name: "David Kim",
      avatar: null,
      role: "UX Designer",
    },
    date: "2024-03-18",
    content:
      "Our user testing sessions have revealed that the new dashboard interface is significantly more intuitive than the previous version. Users completed tasks 30% faster on average. However, the mobile responsiveness still needs work, especially for complex data visualizations. I recommend we allocate more time to optimize the mobile experience before the final release.",
    rating: 3.5,
    focus_areas: ["User experience", "Mobile optimization", "Data visualization"],
  },
  {
    id: "i3",
    member: {
      name: "Jason Lee",
      avatar: null,
      role: "Backend Developer",
    },
    date: "2024-03-15",
    content:
      "The database migration was more complex than initially estimated. We encountered legacy data structures that weren't properly documented, which added about 20% more work than planned. For future phases, we should build in more buffer time for similar migrations. On the positive side, the new architecture is performing much better than expected, with query times reduced by almost 60%.",
    rating: 4,
    focus_areas: ["Technical debt", "Performance optimization", "Documentation"],
  },
];

const ProjectReview = () => {
  const [tabValue, setTabValue] = useState(0);
  const [project, setProject] = useState<any>(null);
  const [feedback, setFeedback] = useState<any[]>([]);
  const [communicationLogs, setCommunicationLogs] = useState<any[]>([]);
  const [teamInsights, setTeamInsights] = useState<any[]>([]);
  const [newComment, setNewComment] = useState("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const { projectId } = useParams();
  const location = useLocation();

  // Load project data
  useEffect(() => {
    // In a real app, you would fetch this data from an API
    // For now, we'll use mock data
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
      author: {
        name: "Current User",
        avatar: null,
        role: "Your Role",
      },
      date: new Date().toISOString().split("T")[0],
      content: newComment,
      sentiment: "neutral",
      replies: [],
    };

    setFeedback([newFeedbackItem, ...feedback]);
    setNewComment("");
  };

  // Function to get icon based on sentiment
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

  // Function to get severity icon
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
    return (
      <Container maxWidth="xl">
        <Box sx={{ py: 8 }}>
          <LinearProgress />
          <Typography variant="h5" sx={{ mt: 2, textAlign: "center" }}>
            Loading project review...
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header with title and project info */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 3,
          boxShadow: "0 2px 20px rgba(0,0,0,0.05)",
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
          <Box>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
              Project Review: {project.name}
            </Typography>
            <Typography
              variant="subtitle1"
              color="textSecondary"
              sx={{ mt: 1 }}
            >
              A comprehensive analysis of project performance, feedback, and
              insights
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              variant="outlined"
              startIcon={<CalendarTodayIcon />}
              sx={{
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 500,
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

        <Divider sx={{ my: 3 }} />

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
              },
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

      {/* Tab Content */}
      <TabPanel value={tabValue} index={0}>
        <Grid container spacing={4}>
          {/* Project Overview */}
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
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Project Overview
              </Typography>
              <Typography variant="body1" paragraph>
                {project.description}
              </Typography>

              <Box sx={{ my: 3 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                  Objectives
                </Typography>
                <List disablePadding>
                  {project.objectives.map((objective: string, index: number) => (
                    <ListItem
                      key={index}
                      sx={{
                        py: 0.5,
                        px: 0,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <CheckCircleIcon
                        fontSize="small"
                        color="primary"
                        sx={{ mr: 1 }}
                      />
                      <Typography variant="body2">{objective}</Typography>
                    </ListItem>
                  ))}
                </List>
              </Box>

              <Box sx={{ my: 3 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                  Key Highlights
                </Typography>
                <List disablePadding>
                  {project.highlights.map((highlight: string, index: number) => (
                    <ListItem
                      key={index}
                      sx={{
                        py: 0.5,
                        px: 0,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <InfoIcon
                        fontSize="small"
                        color="primary"
                        sx={{ mr: 1 }}
                      />
                      <Typography variant="body2">{highlight}</Typography>
                    </ListItem>
                  ))}
                </List>
              </Box>

              <Box sx={{ my: 3 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                  Risk Assessment
                </Typography>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Severity</TableCell>
                        <TableCell>Description</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {project.risks.map((risk: any, index: number) => (
                        <TableRow key={index}>
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
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Paper>
          </Grid>

          {/* Project Metrics */}
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
                    "& .MuiLinearProgress-bar": {
                      borderRadius: 4,
                    },
                  }}
                />
              </Box>

              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={6}>
                  <Box
                    sx={{
                      p: 2,
                      bgcolor: "rgba(59, 130, 246, 0.1)",
                      borderRadius: 2,
                    }}
                  >
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      gutterBottom
                    >
                      Start Date
                    </Typography>
                    <Typography variant="body1" fontWeight="600">
                      {project.startDate}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box
                    sx={{
                      p: 2,
                      bgcolor: "rgba(59, 130, 246, 0.1)",
                      borderRadius: 2,
                    }}
                  >
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      gutterBottom
                    >
                      End Date
                    </Typography>
                    <Typography variant="body1" fontWeight="600">
                      {project.endDate}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box
                    sx={{
                      p: 2,
                      bgcolor: "rgba(16, 185, 129, 0.1)",
                      borderRadius: 2,
                    }}
                  >
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      gutterBottom
                    >
                      Budget
                    </Typography>
                    <Typography variant="body1" fontWeight="600">
                      {project.budget}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box
                    sx={{
                      p: 2,
                      bgcolor: "rgba(245, 158, 11, 0.1)",
                      borderRadius: 2,
                    }}
                  >
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      gutterBottom
                    >
                      Spent
                    </Typography>
                    <Typography variant="body1" fontWeight="600">
                      {project.spent}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>

              <Box
                sx={{
                  p: 2,
                  bgcolor: "rgba(99, 102, 241, 0.1)",
                  borderRadius: 2,
                  mb: 3,
                }}
              >
                <Typography variant="subtitle2" gutterBottom>
                  Status
                </Typography>
                <Chip
                  label={project.status}
                  color="primary"
                  size="small"
                  sx={{
                    fontWeight: 600,
                    fontSize: "0.875rem",
                    px: 1,
                  }}
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
                    12
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="textSecondary">
                    Milestones
                  </Typography>
                  <Typography variant="h6" fontWeight="600">
                    8/12
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="textSecondary">
                    Open Tasks
                  </Typography>
                  <Typography variant="h6" fontWeight="600">
                    24
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="textSecondary">
                    Completed
                  </Typography>
                  <Typography variant="h6" fontWeight="600">
                    87
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
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            startIcon={<AttachFileIcon />}
            sx={{
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 500,
            }}
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
            sx={{
              width: 220,
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
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
            onClick={handleFilterClick}
            sx={{
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 500,
            }}
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
                <Avatar
                  sx={{ bgcolor: "#3b82f6", width: 40, height: 40, mr: 2 }}
                >
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
              </Box> {/* Added missing closing Box tag */}
              <Box>{getSentimentIcon(item.sentiment)}</Box>
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
                  sx={{
                    width: 220,
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
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
                  variant="contained"
                  sx={{
                    borderRadius: 2,
                    textTransform: "none",
                    fontWeight: 500,
                  }}
                >
                  Record New Communication
                </Button>
              </Box>
            </Box>

            {communicationLogs.map((log) => (
              <Accordion
                key={log.id}
                elevation={0}
                sx={{
                  mb: 2,
                  borderRadius: "12px !important",
                  overflow: "hidden",
                  boxShadow: "0 2px 20px rgba(0,0,0,0.05)",
                  "&:before": {
                    display: "none",
                  },
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
                            bgcolor:
                              log.stakeholder.type === "Client"
                                ? "#3b82f6"
                                : "#10b981",
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
                        sx={{
                          textTransform: "capitalize",
                          fontWeight: 500,
                        }}
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
                        sx={{
                          py: 0.5,
                          px: 0,
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <CheckCircleIcon
                          fontSize="small"
                          color="primary"
                          sx={{ mr: 1 }}
                        />
                        <Typography variant="body2">{item}</Typography>
                      </ListItem>
                    ))}
                  </List>
                </AccordionDetails>
              </Accordion>
            ))}
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
                  sx={{
                    borderRadius: 2,
                    textTransform: "none",
                    fontWeight: 500,
                  }}
                >
                  Filter by Role
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    borderRadius: 2,
                    textTransform: "none",
                    fontWeight: 500,
                  }}
                >
                  Request New Insights
                </Button>
              </Box>
            </Box>

            {teamInsights.map((insight) => (
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
                      <Avatar
                        sx={{ bgcolor: "#6366f1", width: 40, height: 40, mr: 2 }}
                      >
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
                        <Typography
                          variant="body2"
                          sx={{ fontWeight: 500, ml: 1 }}
                        >
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
            ))}
          </Grid>
        </Grid>
      </TabPanel>
    </Container>
  );
};

export default ProjectReview;