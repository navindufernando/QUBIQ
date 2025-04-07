import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  IconButton,
  Divider,
  Chip,
  Avatar,
  Grid,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  Checkbox,
  FormControlLabel,
  Paper,
  Tabs,
  Tab,
  Tooltip,
} from "@mui/material";
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  MoreVert as MoreVertIcon,
  Flag as FlagIcon,
  Person as PersonIcon,
  CalendarToday as CalendarTodayIcon,
  AttachFile as AttachFileIcon,
  ArrowBack as ArrowBackIcon,
  FilterList as FilterListIcon,
  Assignment as AssignmentIcon,
  Timeline as TimelineIcon,
  Dashboard as DashboardIcon,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";

// Define types
interface Task {
  id: string;
  title: string;
  description: string;
  status: "todo" | "inProgress" | "review" | "done";
  priority: "low" | "medium" | "high";
  dueDate: string;
  assignee: string;
  subtasks: Subtask[];
  comments: Comment[];
  attachments: string[];
  createdAt: string;
}

interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}

interface Comment {
  id: string;
  author: string;
  text: string;
  timestamp: string;
}

interface ProjectData {
  id: string;
  name: string;
  color: string;
  description?: string;
}

const ProjectDetail: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [project, setProject] = useState<ProjectData | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<Partial<Task>>({
    title: "",
    description: "",
    status: "todo",
    priority: "medium",
    dueDate: "",
    assignee: "",
  });
  const [newSubtask, setNewSubtask] = useState("");
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<string | null>(null);
  const [currentTab, setCurrentTab] = useState(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [taskMenuId, setTaskMenuId] = useState<string | null>(null);
  const [taskDetailOpen, setTaskDetailOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterPriority, setFilterPriority] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const teamMembers = [
    { id: "1", name: "Inuthi", avatar: "IS" },
    { id: "2", name: "Navindu", avatar: "NJ" },
    { id: "3", name: "Manula", avatar: "MJ" },
    { id: "4", name: "Jaith", avatar: "JR" },
    { id: "5", name: "Ashini", avatar: "AT" },
  ];

  useEffect(() => {
    const projectId = location.state?.projectId;

    if (projectId) {
      const projectsData = JSON.parse(localStorage.getItem("projects") || "[]");
      const projectData = projectsData.find(
        (p: ProjectData) => p.id === projectId
      );

      if (projectData) {
        setProject(projectData);
        const tasksData = JSON.parse(
          localStorage.getItem(`tasks_${projectId}`) || "[]"
        );
        setTasks(tasksData);
      } else {
        navigate("/project");
      }
    } else {
      navigate("/project");
    }
  }, [location, navigate]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const openTaskMenu = (
    event: React.MouseEvent<HTMLButtonElement>,
    taskId: string
  ) => {
    setAnchorEl(event.currentTarget);
    setTaskMenuId(taskId);
  };

  const closeTaskMenu = () => {
    setAnchorEl(null);
    setTaskMenuId(null);
  };

  const openTaskDetail = (task: Task) => {
    setCurrentTask(task);
    setTaskDetailOpen(true);
  };

  const closeTaskDetail = () => {
    setTaskDetailOpen(false);
    setCurrentTask(null);
  };

  const handleCreateTask = () => {
    if (!newTask.title?.trim()) {
      alert("Task title is required");
      return;
    }

    if (!project) return;

    const task: Task = {
      id: Date.now().toString(),
      title: newTask.title || "",
      description: newTask.description || "",
      status: newTask.status || "todo",
      priority: newTask.priority || "medium",
      dueDate: newTask.dueDate || "",
      assignee: newTask.assignee || "",
      subtasks: [],
      comments: [],
      attachments: [],
      createdAt: new Date().toISOString(),
    };

    const updatedTasks = [...tasks, task];
    setTasks(updatedTasks);
    localStorage.setItem(`tasks_${project.id}`, JSON.stringify(updatedTasks));

    setNewTask({
      title: "",
      description: "",
      status: "todo",
      priority: "medium",
      dueDate: "",
      assignee: "",
    });
    setIsTaskFormOpen(false);
  };

  const handleUpdateTask = () => {
    if (!editingTask || !newTask.title?.trim() || !project) return;

    const updatedTasks = tasks.map((task) =>
      task.id === editingTask
        ? {
            ...task,
            title: newTask.title || task.title,
            description: newTask.description || task.description,
            status: newTask.status || task.status,
            priority: newTask.priority || task.priority,
            dueDate: newTask.dueDate || task.dueDate,
            assignee: newTask.assignee || task.assignee,
          }
        : task
    );

    setTasks(updatedTasks);
    localStorage.setItem(`tasks_${project.id}`, JSON.stringify(updatedTasks));

    setNewTask({
      title: "",
      description: "",
      status: "todo",
      priority: "medium",
      dueDate: "",
      assignee: "",
    });
    setIsTaskFormOpen(false);
    setEditingTask(null);
  };

  const handleDeleteTask = (taskId: string) => {
    if (!project) return;

    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    localStorage.setItem(`tasks_${project.id}`, JSON.stringify(updatedTasks));
    closeTaskMenu();
  };

  const handleEditTask = (taskId: string) => {
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
      setNewTask({
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        dueDate: task.dueDate,
        assignee: task.assignee,
      });
      setEditingTask(taskId);
      setIsTaskFormOpen(true);
    }
    closeTaskMenu();
  };

  const handleAddSubtask = () => {
    if (!currentTask || !newSubtask.trim()) return;

    const subtask: Subtask = {
      id: Date.now().toString(),
      title: newSubtask,
      completed: false,
    };

    const updatedTask = {
      ...currentTask,
      subtasks: [...currentTask.subtasks, subtask],
    };

    const updatedTasks = tasks.map((task) =>
      task.id === currentTask.id ? updatedTask : task
    );

    setTasks(updatedTasks);
    setCurrentTask(updatedTask);
    setNewSubtask("");

    if (project) {
      localStorage.setItem(`tasks_${project.id}`, JSON.stringify(updatedTasks));
    }
  };

  const handleToggleSubtask = (subtaskId: string) => {
    if (!currentTask) return;

    const updatedSubtasks = currentTask.subtasks.map((subtask) =>
      subtask.id === subtaskId
        ? { ...subtask, completed: !subtask.completed }
        : subtask
    );

    const updatedTask = {
      ...currentTask,
      subtasks: updatedSubtasks,
    };

    const updatedTasks = tasks.map((task) =>
      task.id === currentTask.id ? updatedTask : task
    );

    setTasks(updatedTasks);
    setCurrentTask(updatedTask);

    if (project) {
      localStorage.setItem(`tasks_${project.id}`, JSON.stringify(updatedTasks));
    }
  };

  const addComment = (text: string) => {
    if (!currentTask || !text.trim() || !project) return;

    const comment: Comment = {
      id: Date.now().toString(),
      author: "Current User",
      text,
      timestamp: new Date().toISOString(),
    };

    const updatedTask = {
      ...currentTask,
      comments: [...currentTask.comments, comment],
    };

    const updatedTasks = tasks.map((task) =>
      task.id === currentTask.id ? updatedTask : task
    );

    setTasks(updatedTasks);
    setCurrentTask(updatedTask);
    localStorage.setItem(`tasks_${project.id}`, JSON.stringify(updatedTasks));
  };

  const updateTaskStatus = (
    taskId: string,
    status: "todo" | "inProgress" | "review" | "done"
  ) => {
    if (!project) return;

    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, status } : task
    );

    setTasks(updatedTasks);
    localStorage.setItem(`tasks_${project.id}`, JSON.stringify(updatedTasks));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filterStatus !== "all" && task.status !== filterStatus) return false;
    if (filterPriority !== "all" && task.priority !== filterPriority)
      return false;
    if (
      searchQuery &&
      !task.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false;
    return true;
  });

  const tasksByStatus = {
    todo: filteredTasks.filter((task) => task.status === "todo"),
    inProgress: filteredTasks.filter((task) => task.status === "inProgress"),
    review: filteredTasks.filter((task) => task.status === "review"),
    done: filteredTasks.filter((task) => task.status === "done"),
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "todo":
        return "#9CA3AF";
      case "inProgress":
        return "#3B82F6";
      case "review":
        return "#F59E0B";
      case "done":
        return "#10B981";
      default:
        return "#9CA3AF";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "low":
        return "#10B981";
      case "medium":
        return "#F59E0B";
      case "high":
        return "#EF4444";
      default:
        return "#9CA3AF";
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "low":
        return <FlagIcon style={{ color: "#10B981" }} />;
      case "medium":
        return <FlagIcon style={{ color: "#F59E0B" }} />;
      case "high":
        return <FlagIcon style={{ color: "#EF4444" }} />;
      default:
        return <FlagIcon style={{ color: "#9CA3AF" }} />;
    }
  };

  const calculateProgress = (task: Task) => {
    if (task.subtasks.length === 0) return task.status === "done" ? 100 : 0;
    const completed = task.subtasks.filter((subtask) => subtask.completed).length;
    return (completed / task.subtasks.length) * 100;
  };

  const calculateProjectProgress = () => {
    if (tasks.length === 0) return 0;

    const completedTasks = tasks.filter((task) => task.status === "done").length;
    let progress = (completedTasks / tasks.length) * 100;

    let totalSubtasks = 0;
    let completedSubtasks = 0;

    tasks.forEach((task) => {
      totalSubtasks += task.subtasks.length;
      completedSubtasks += task.subtasks.filter((st) => st.completed).length;
    });

    if (totalSubtasks > 0) {
      const taskProgress = (completedTasks / tasks.length) * 50;
      const subtaskProgress = (completedSubtasks / totalSubtasks) * 50;
      progress = taskProgress + subtaskProgress;
    }

    return Math.round(progress);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (!project) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>Loading project details...</Box>
    );
  }

  return (
    <Box sx={{ maxWidth: "1200px", mx: "auto" }}>
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <IconButton onClick={() => navigate("/project")} sx={{ mr: 1 }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography
            variant="h4"
            component="h1"
            sx={{ fontWeight: "bold", display: "flex", alignItems: "center" }}
          >
            <Box
              component="span"
              sx={{
                width: 16,
                height: 16,
                borderRadius: "50%",
                bgcolor: project.color,
                mr: 2,
                display: "inline-block",
              }}
            />
            {project.name}
          </Typography>
        </Box>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          {project.description || "No description provided for this project."}
        </Typography>

        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <Card sx={{ flex: 1 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 1, fontWeight: 500 }}>
                {tasks.length} Tasks
              </Typography>
              <Box sx={{ display: "flex", gap: 2 }}>
                <Chip
                  label={`${tasksByStatus.todo.length} To Do`}
                  size="small"
                  sx={{ bgcolor: "#F3F4F6" }}
                />
                <Chip
                  label={`${tasksByStatus.inProgress.length} In Progress`}
                  size="small"
                  sx={{ bgcolor: "#DBEAFE", color: "#1E40AF" }}
                />
                <Chip
                  label={`${tasksByStatus.done.length} Done`}
                  size="small"
                  sx={{ bgcolor: "#D1FAE5", color: "#065F46" }}
                />
              </Box>
            </CardContent>
          </Card>

          <Card sx={{ flex: 1 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 1, fontWeight: 500 }}>
                Team
              </Typography>
              <Box sx={{ display: "flex", gap: 1 }}>
                {teamMembers.slice(0, 5).map((member) => (
                  <Tooltip key={member.id} title={member.name}>
                    <Avatar
                      sx={{
                        width: 32,
                        height: 32,
                        fontSize: "0.875rem",
                        bgcolor: project.color,
                      }}
                    >
                      {member.avatar}
                    </Avatar>
                  </Tooltip>
                ))}
                {teamMembers.length > 5 && (
                  <Avatar
                    sx={{
                      width: 32,
                      height: 32,
                      fontSize: "0.875rem",
                      bgcolor: "#9CA3AF",
                    }}
                  >
                    +{teamMembers.length - 5}
                  </Avatar>
                )}
              </Box>
            </CardContent>
          </Card>

          <Card sx={{ flex: 1 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 1, fontWeight: 500 }}>
                Progress
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Box sx={{ flexGrow: 1 }}>
                  <LinearProgress
                    variant="determinate"
                    value={calculateProjectProgress()}
                    sx={{ height: 8, borderRadius: 1 }}
                  />
                </Box>
                <Typography variant="body2" fontWeight="bold">
                  {calculateProjectProgress()}%
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Tabs
            value={currentTab}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab icon={<DashboardIcon />} label="Board" />
            <Tab icon={<AssignmentIcon />} label="List" />
            <Tab icon={<TimelineIcon />} label="Timeline" />
          </Tabs>

          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              size="small"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{ width: 200 }}
            />

            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Status</InputLabel>
              <Select
                value={filterStatus}
                label="Status"
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <MenuItem value="all">All Status</MenuItem>
                <MenuItem value="todo">To Do</MenuItem>
                <MenuItem value="inProgress">In Progress</MenuItem>
                <MenuItem value="review">Review</MenuItem>
                <MenuItem value="done">Done</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Priority</InputLabel>
              <Select
                value={filterPriority}
                label="Priority"
                onChange={(e) => setFilterPriority(e.target.value)}
              >
                <MenuItem value="all">All Priorities</MenuItem>
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="high">High</MenuItem>
              </Select>
            </FormControl>

            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => {
                setEditingTask(null);
                setNewTask({
                  title: "",
                  description: "",
                  status: "todo",
                  priority: "medium",
                  dueDate: "",
                  assignee: "",
                });
                setIsTaskFormOpen(true);
              }}
            >
              Add Task
            </Button>
          </Box>
        </Box>

        {currentTab === 0 && (
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <Paper sx={{ p: 2, bgcolor: "#F9FAFB", height: "100%" }}>
                <Typography
                  variant="h6"
                  sx={{ mb: 2, display: "flex", alignItems: "center" }}
                >
                  <Box
                    component="span"
                    sx={{
                      width: 12,
                      height: 12,
                      borderRadius: "50%",
                      bgcolor: "#9CA3AF",
                      mr: 1,
                      display: "inline-block",
                    }}
                  />
                  To Do ({tasksByStatus.todo.length})
                </Typography>
                <Box
                  sx={{
                    minHeight: 200,
                    maxHeight: "calc(100vh - 350px)",
                    overflowY: "auto",
                  }}
                >
                  {tasksByStatus.todo.map((task) => (
                    <Card
                      key={task.id}
                      sx={{
                        mb: 2,
                        cursor: "pointer",
                        "&:hover": {
                          boxShadow: 3,
                          transform: "translateY(-2px)",
                        },
                        transition: "all 0.2s",
                      }}
                      onClick={() => openTaskDetail(task)}
                    >
                      <CardContent>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            mb: 1,
                          }}
                        >
                          <Typography variant="subtitle1" fontWeight="bold">
                            {task.title}
                          </Typography>
                          <IconButton
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation();
                              openTaskMenu(e, task.id);
                            }}
                          >
                            <MoreVertIcon fontSize="small" />
                          </IconButton>
                        </Box>

                        {task.description && (
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                              mb: 2,
                              display: "-webkit-box",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                            }}
                          >
                            {task.description}
                          </Typography>
                        )}

                        {task.subtasks.length > 0 && (
                          <Box sx={{ mb: 2 }}>
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                mb: 0.5,
                              }}
                            >
                              <Typography
                                variant="caption"
                                color="text.secondary"
                              >
                                Subtasks:{" "}{task.subtasks.filter((st) => st.completed).length}/{task.subtasks.length}
                              </Typography>
                              <Typography variant="caption" fontWeight="medium">
                                {Math.round(calculateProgress(task))}%
                              </Typography>
                            </Box>
                            <LinearProgress
                              variant="determinate"
                              value={calculateProgress(task)}
                              sx={{ height: 4, borderRadius: 1 }}
                            />
                          </Box>
                        )}

                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Chip
                            icon={getPriorityIcon(task.priority)}
                            label={task.priority}
                            size="small"
                            sx={{
                              textTransform: "capitalize",
                              bgcolor: `${getPriorityColor(task.priority)}20`,
                            }}
                          />

                          {task.dueDate && (
                            <Chip
                              icon={<CalendarTodayIcon fontSize="small" />}
                              label={formatDate(task.dueDate)}
                              size="small"
                            />
                          )}
                        </Box>
                      </CardContent>
                    </Card>
                  ))}

                  {tasksByStatus.todo.length === 0 && (
                    <Box
                      sx={{
                        p: 2,
                        textAlign: "center",
                        bgcolor: "#F3F4F6",
                        borderRadius: 1,
                        border: "1px dashed #D1D5DB",
                      }}
                    >
                      <Typography variant="body2" color="text.secondary">
                        No tasks to do
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12} md={3}>
              <Paper sx={{ p: 2, bgcolor: "#F0F9FF", height: "100%" }}>
                <Typography
                  variant="h6"
                  sx={{ mb: 2, display: "flex", alignItems: "center" }}
                >
                  <Box
                    component="span"
                    sx={{
                      width: 12,
                      height: 12,
                      borderRadius: "50%",
                      bgcolor: "#3B82F6",
                      mr: 1,
                      display: "inline-block",
                    }}
                  />
                  In Progress ({tasksByStatus.inProgress.length})
                </Typography>
                <Box
                  sx={{
                    minHeight: 200,
                    maxHeight: "calc(100vh - 350px)",
                    overflowY: "auto",
                  }}
                >
                  {tasksByStatus.inProgress.map((task) => (
                    <Card
                      key={task.id}
                      sx={{
                        mb: 2,
                        cursor: "pointer",
                        "&:hover": {
                          boxShadow: 3,
                          transform: "translateY(-2px)",
                        },
                        transition: "all 0.2s",
                      }}
                      onClick={() => openTaskDetail(task)}
                    >
                      <CardContent>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            mb: 1,
                          }}
                        >
                          <Typography variant="subtitle1" fontWeight="bold">
                            {task.title}
                          </Typography>
                          <IconButton
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation();
                              openTaskMenu(e, task.id);
                            }}
                          >
                            <MoreVertIcon fontSize="small" />
                          </IconButton>
                        </Box>

                        {task.description && (
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                              mb: 2,
                              display: "-webkit-box",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                            }}
                          >
                            {task.description}
                          </Typography>
                        )}

                        {task.subtasks.length > 0 && (
                          <Box sx={{ mb: 2 }}>
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                mb: 0.5,
                              }}
                            >
                              <Typography
                                variant="caption"
                                color="text.secondary"
                              >
                                Subtasks:{" "}{task.subtasks.filter((st) => st.completed).length}/{task.subtasks.length}
                              </Typography>
                              <Typography variant="caption" fontWeight="medium">
                                {Math.round(calculateProgress(task))}%
                              </Typography>
                            </Box>
                            <LinearProgress
                              variant="determinate"
                              value={calculateProgress(task)}
                              sx={{ height: 4, borderRadius: 1 }}
                            />
                          </Box>
                        )}

                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Chip
                            icon={getPriorityIcon(task.priority)}
                            label={task.priority}
                            size="small"
                            sx={{
                              textTransform: "capitalize",
                              bgcolor: `${getPriorityColor(task.priority)}20`,
                            }}
                          />

                          {task.dueDate && (
                            <Chip
                              icon={<CalendarTodayIcon fontSize="small" />}
                              label={formatDate(task.dueDate)}
                              size="small"
                            />
                          )}
                        </Box>
                      </CardContent>
                    </Card>
                  ))}

                  {tasksByStatus.inProgress.length === 0 && (
                    <Box
                      sx={{
                        p: 2,
                        textAlign: "center",
                        bgcolor: "#DBEAFE",
                        borderRadius: 1,
                        border: "1px dashed #93C5FD",
                      }}
                    >
                      <Typography variant="body2" color="text.secondary">
                        No tasks in progress
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12} md={3}>
              <Paper sx={{ p: 2, bgcolor: "#FFFBEB", height: "100%" }}>
                <Typography
                  variant="h6"
                  sx={{ mb: 2, display: "flex", alignItems: "center" }}
                >
                  <Box
                    component="span"
                    sx={{
                      width: 12,
                      height: 12,
                      borderRadius: "50%",
                      bgcolor: "#F59E0B",
                      mr: 1,
                      display: "inline-block",
                    }}
                  />
                  Review ({tasksByStatus.review.length})
                </Typography>
                <Box
                  sx={{
                    minHeight: 200,
                    maxHeight: "calc(100vh - 350px)",
                    overflowY: "auto",
                  }}
                >
                  {tasksByStatus.review.map((task) => (
                    <Card
                      key={task.id}
                      sx={{
                        mb: 2,
                        cursor: "pointer",
                        "&:hover": {
                          boxShadow: 3,
                          transform: "translateY(-2px)",
                        },
                        transition: "all 0.2s",
                      }}
                      onClick={() => openTaskDetail(task)}
                    >
                      <CardContent>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            mb: 1,
                          }}
                        >
                          <Typography variant="subtitle1" fontWeight="bold">
                            {task.title}
                          </Typography>
                          <IconButton
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation();
                              openTaskMenu(e, task.id);
                            }}
                          >
                            <MoreVertIcon fontSize="small" />
                          </IconButton>
                        </Box>

                        {task.description && (
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                              mb: 2,
                              display: "-webkit-box",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                            }}
                          >
                            {task.description}
                          </Typography>
                        )}

                        {task.subtasks.length > 0 && (
                          <Box sx={{ mb: 2 }}>
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                mb: 0.5,
                              }}
                            >
                              <Typography
                                variant="caption"
                                color="text.secondary"
                              >
                                Subtasks:{" "}{task.subtasks.filter((st) => st.completed).length}/{task.subtasks.length}
                              </Typography>
                              <Typography variant="caption" fontWeight="medium">
                                {Math.round(calculateProgress(task))}%
                              </Typography>
                            </Box>
                            <LinearProgress
                              variant="determinate"
                              value={calculateProgress(task)}
                              sx={{ height: 4, borderRadius: 1 }}
                            />
                          </Box>
                        )}

                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Chip
                            icon={getPriorityIcon(task.priority)}
                            label={task.priority}
                            size="small"
                            sx={{
                              textTransform: "capitalize",
                              bgcolor: `${getPriorityColor(task.priority)}20`,
                            }}
                          />

                          {task.dueDate && (
                            <Chip
                              icon={<CalendarTodayIcon fontSize="small" />}
                              label={formatDate(task.dueDate)}
                              size="small"
                            />
                          )}
                        </Box>
                      </CardContent>
                    </Card>
                  ))}

                  {tasksByStatus.review.length === 0 && (
                    <Box
                      sx={{
                        p: 2,
                        textAlign: "center",
                        bgcolor: "#FEF3C7",
                        borderRadius: 1,
                        border: "1px dashed #FCD34D",
                      }}
                    >
                      <Typography variant="body2" color="text.secondary">
                        No tasks in review
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12} md={3}>
              <Paper sx={{ p: 2, bgcolor: "#ECFDF5", height: "100%" }}>
                <Typography
                  variant="h6"
                  sx={{ mb: 2, display: "flex", alignItems: "center" }}
                >
                  <Box
                    component="span"
                    sx={{
                      width: 12,
                      height: 12,
                      borderRadius: "50%",
                      bgcolor: "#10B981",
                      mr: 1,
                      display: "inline-block",
                    }}
                  />
                  Done ({tasksByStatus.done.length})
                </Typography>
                <Box
                  sx={{
                    minHeight: 200,
                    maxHeight: "calc(100vh - 350px)",
                    overflowY: "auto",
                  }}
                >
                  {tasksByStatus.done.map((task) => (
                    <Card
                      key={task.id}
                      sx={{
                        mb: 2,
                        cursor: "pointer",
                        "&:hover": {
                          boxShadow: 3,
                          transform: "translateY(-2px)",
                        },
                        transition: "all 0.2s",
                      }}
                      onClick={() => openTaskDetail(task)}
                    >
                      <CardContent>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            mb: 1,
                          }}
                        >
                          <Typography variant="subtitle1" fontWeight="bold">
                            {task.title}
                          </Typography>
                          <IconButton
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation();
                              openTaskMenu(e, task.id);
                            }}
                          >
                            <MoreVertIcon fontSize="small" />
                          </IconButton>
                        </Box>

                        {task.description && (
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                              mb: 2,
                              display: "-webkit-box",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                            }}
                          >
                            {task.description}
                          </Typography>
                        )}

                        {task.subtasks.length > 0 && (
                          <Box sx={{ mb: 2 }}>
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                mb: 0.5,
                              }}
                            >
                              <Typography
                                variant="caption"
                                color="text.secondary"
                              >
                                Subtasks:{" "}{task.subtasks.filter((st) => st.completed).length}/{task.subtasks.length}
                              </Typography>
                              <Typography variant="caption" fontWeight="medium">
                                {Math.round(calculateProgress(task))}%
                              </Typography>
                            </Box>
                            <LinearProgress
                              variant="determinate"
                              value={calculateProgress(task)}
                              sx={{ height: 4, borderRadius: 1 }}
                            />
                          </Box>
                        )}

                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Chip
                            icon={getPriorityIcon(task.priority)}
                            label={task.priority}
                            size="small"
                            sx={{
                              textTransform: "capitalize",
                              bgcolor: `${getPriorityColor(task.priority)}20`,
                            }}
                          />

                          {task.dueDate && (
                            <Chip
                              icon={<CalendarTodayIcon fontSize="small" />}
                              label={formatDate(task.dueDate)}
                              size="small"
                            />
                          )}
                        </Box>
                      </CardContent>
                    </Card>
                  ))}

                  {tasksByStatus.done.length === 0 && (
                    <Box
                      sx={{
                        p: 2,
                        textAlign: "center",
                        bgcolor: "#D1FAE5",
                        borderRadius: 1,
                        border: "1px dashed #6EE7B7",
                      }}
                    >
                      <Typography variant="body2" color="text.secondary">
                        No completed tasks
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Paper>
            </Grid>
          </Grid>
        )}

        {currentTab === 1 && (
          <Paper sx={{ p: 2 }}>
            <List>
              {filteredTasks.length > 0 ? (
                filteredTasks.map((task) => (
                  <React.Fragment key={task.id}>
                    <ListItem
                      secondaryAction={
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Chip
                            size="small"
                            label={task.status}
                            sx={{
                              mr: 1,
                              textTransform: "capitalize",
                              bgcolor: `${getStatusColor(task.status)}20`,
                              color: getStatusColor(task.status),
                            }}
                          />
                          <IconButton
                            edge="end"
                            onClick={(e) => openTaskMenu(e, task.id)}
                          >
                            <MoreVertIcon />
                          </IconButton>
                        </Box>
                      }
                      sx={{
                        cursor: "pointer",
                        "&:hover": { bgcolor: "#F9FAFB" },
                      }}
                      onClick={() => openTaskDetail(task)}
                    >
                      <ListItemText
                        primary={task.title}
                        secondary={
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 2,
                              mt: 0.5,
                            }}
                          >
                            {task.dueDate && (
                              <Box
                                sx={{ display: "flex", alignItems: "center" }}
                              >
                                <CalendarTodayIcon
                                  fontSize="small"
                                  sx={{
                                    mr: 0.5,
                                    color: "text.secondary",
                                    fontSize: "0.875rem",
                                  }}
                                />
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  {formatDate(task.dueDate)}
                                </Typography>
                              </Box>
                            )}

                            {task.assignee && (
                              <Box
                                sx={{ display: "flex", alignItems: "center" }}
                              >
                                <PersonIcon
                                  fontSize="small"
                                  sx={{
                                    mr: 0.5,
                                    color: "text.secondary",
                                    fontSize: "0.875rem",
                                  }}
                                />
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  {teamMembers.find(
                                    (m) => m.id === task.assignee
                                  )?.name || "Unassigned"}
                                </Typography>
                              </Box>
                            )}

                            {task.priority && (
                              <Box
                                sx={{ display: "flex", alignItems: "center" }}
                              >
                                <FlagIcon
                                  fontSize="small"
                                  sx={{
                                    mr: 0.5,
                                    color: getPriorityColor(task.priority),
                                    fontSize: "0.875rem",
                                  }}
                                />
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                  sx={{ textTransform: "capitalize" }}
                                >
                                  {task.priority}
                                </Typography>
                              </Box>
                            )}
                          </Box>
                        }
                      />
                    </ListItem>
                    <Divider component="li" />
                  </React.Fragment>
                ))
              ) : (
                <Box sx={{ p: 3, textAlign: "center" }}>
                  <Typography variant="body1" color="text.secondary">
                    No tasks found matching your filters
                  </Typography>
                  <Button
                    variant="text"
                    startIcon={<FilterListIcon />}
                    onClick={() => {
                      setFilterStatus("all");
                      setFilterPriority("all");
                      setSearchQuery("");
                    }}
                    sx={{ mt: 1 }}
                  >
                    Clear filters
                  </Button>
                </Box>
              )}
            </List>
          </Paper>
        )}

        {currentTab === 2 && (
          <Paper sx={{ p: 3, textAlign: "center", height: 400 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Timeline View
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Timeline visualization would be implemented here with a proper
              timeline library like react-chrono or similar.
            </Typography>
            <Box sx={{ mt: 3 }}>
              <Typography variant="body2">
                Tasks with due dates:{" "}
                {tasks.filter((task) => task.dueDate).length}/{tasks.length}
              </Typography>
            </Box>
          </Paper>
        )}
      </Box>

      <Dialog
        open={isTaskFormOpen}
        onClose={() => setIsTaskFormOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {editingTask ? "Edit Task" : "Create New Task"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Task Title"
            fullWidth
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            required
            sx={{ mb: 2 }}
          />

          <TextField
            margin="dense"
            label="Description"
            fullWidth
            multiline
            rows={3}
            value={newTask.description}
            onChange={(e) =>
              setNewTask({ ...newTask, description: e.target.value })
            }
            sx={{ mb: 2 }}
          />

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="dense">
                <InputLabel>Status</InputLabel>
                <Select
                  value={newTask.status}
                  label="Status"
                  onChange={(e) =>
                    setNewTask({
                      ...newTask,
                      status: e.target.value as
                        | "todo"
                        | "inProgress"
                        | "review"
                        | "done",
                    })
                  }
                >
                  <MenuItem value="todo">To Do</MenuItem>
                  <MenuItem value="inProgress">In Progress</MenuItem>
                  <MenuItem value="review">Review</MenuItem>
                  <MenuItem value="done">Done</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="dense">
                <InputLabel>Priority</InputLabel>
                <Select
                  value={newTask.priority}
                  label="Priority"
                  onChange={(e) =>
                    setNewTask({
                      ...newTask,
                      priority: e.target.value as "low" | "medium" | "high",
                    })
                  }
                >
                  <MenuItem value="low">Low</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="high">High</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                margin="dense"
                label="Due Date"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={newTask.dueDate}
                onChange={(e) =>
                  setNewTask({ ...newTask, dueDate: e.target.value })
                }
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="dense">
                <InputLabel>Assignee</InputLabel>
                <Select
                  value={newTask.assignee}
                  label="Assignee"
                  onChange={(e) =>
                    setNewTask({ ...newTask, assignee: e.target.value })
                  }
                >
                  <MenuItem value="">Unassigned</MenuItem>
                  {teamMembers.map((member) => (
                    <MenuItem key={member.id} value={member.id}>
                      {member.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsTaskFormOpen(false)}>Cancel</Button>
          <Button
            onClick={editingTask ? handleUpdateTask : handleCreateTask}
            variant="contained"
            color="primary"
          >
            {editingTask ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={taskDetailOpen}
        onClose={closeTaskDetail}
        maxWidth="md"
        fullWidth
      >
        {currentTask && (
          <>
            <DialogTitle
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h6">{currentTask.title}</Typography>
              <Box>
                <IconButton
                  size="small"
                  onClick={() => {
                    handleEditTask(currentTask.id);
                    closeTaskDetail();
                  }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => {
                    if (confirm("Are you sure you want to delete this task?")) {
                      handleDeleteTask(currentTask.id);
                      closeTaskDetail();
                    }
                  }}
                >
                  <DeleteIcon />
                </IconButton>
                <IconButton size="small" onClick={closeTaskDetail}>
                  <ArrowBackIcon />
                </IconButton>
              </Box>
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                  <Typography variant="body1" paragraph>
                    {currentTask.description || "No description provided."}
                  </Typography>

                  <Divider sx={{ my: 2 }} />

                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Subtasks
                  </Typography>

                  <Box sx={{ mb: 3 }}>
                    {currentTask.subtasks.length > 0 ? (
                      currentTask.subtasks.map((subtask) => (
                        <FormControlLabel
                          key={subtask.id}
                          control={
                            <Checkbox
                              checked={subtask.completed}
                              onChange={() => handleToggleSubtask(subtask.id)}
                            />
                          }
                          label={subtask.title}
                        />
                      ))
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        No subtasks have been added.
                      </Typography>
                    )}
                  </Box>

                  <Box sx={{ display: "flex", mb: 2 }}>
                    <TextField
                      size="small"
                      placeholder="Add a subtask..."
                      value={newSubtask}
                      onChange={(e) => setNewSubtask(e.target.value)}
                      fullWidth
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={handleAddSubtask}
                      sx={{ ml: 1 }}
                    >
                      Add
                    </Button>
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Comments
                  </Typography>

                  <Box sx={{ mb: 2 }}>
                    {currentTask.comments.length > 0 ? (
                      currentTask.comments.map((comment) => (
                        <Box key={comment.id} sx={{ mb: 2 }}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              mb: 1,
                            }}
                          >
                            <Avatar
                              sx={{
                                width: 32,
                                height: 32,
                                mr: 1,
                                bgcolor: project.color,
                              }}
                            >
                              {comment.author.charAt(0)}
                            </Avatar>
                            <Box>
                              <Typography variant="subtitle2">
                                {comment.author}
                              </Typography>
                              <Typography
                                variant="caption"
                                color="text.secondary"
                              >
                                {formatDate(comment.timestamp)}
                              </Typography>
                            </Box>
                          </Box>
                          <Typography variant="body2">
                            {comment.text}
                          </Typography>
                        </Box>
                      ))
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        No comments yet.
                      </Typography>
                    )}
                  </Box>

                  <Box sx={{ display: "flex", mb: 2 }}>
                    <TextField
                      size="small"
                      placeholder="Add a comment..."
                      fullWidth
                      multiline
                      rows={2}
                      onKeyPress={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          const target = e.target as HTMLTextAreaElement;
                          addComment(target.value);
                          target.value = "";
                        }
                      }}
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={(e) => {
                        const target = e.currentTarget
                          .previousSibling as HTMLTextAreaElement;
                        addComment(target.value);
                        target.value = "";
                      }}
                      sx={{ ml: 1, alignSelf: "flex-end" }}
                    >
                      Send
                    </Button>
                  </Box>
                </Grid>

                <Grid item xs={12} md={4}>
                  <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
                    <Typography variant="subtitle2" sx={{ mb: 2 }}>
                      Status
                    </Typography>
                    <FormControl fullWidth size="small">
                      <Select
                        value={currentTask.status}
                        onChange={(e) =>
                          updateTaskStatus(
                            currentTask.id,
                            e.target.value as
                              | "todo"
                              | "inProgress"
                              | "review"
                              | "done"
                          )
                        }
                      >
                        <MenuItem value="todo">To Do</MenuItem>
                        <MenuItem value="inProgress">In Progress</MenuItem>
                        <MenuItem value="review">Review</MenuItem>
                        <MenuItem value="done">Done</MenuItem>
                      </Select>
                    </FormControl>
                  </Paper>

                  <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                      Details
                    </Typography>

                    <Box sx={{ mb: 2 }}>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        display="block"
                      >
                        Priority
                      </Typography>
                      <Chip
                        icon={getPriorityIcon(currentTask.priority)}
                        label={currentTask.priority}
                        size="small"
                        sx={{
                          textTransform: "capitalize",
                          bgcolor: `${getPriorityColor(
                            currentTask.priority
                          )}20`,
                        }}
                      />
                    </Box>

                    <Box sx={{ mb: 2 }}>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        display="block"
                      >
                        Assignee
                      </Typography>
                      {currentTask.assignee ? (
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Avatar
                            sx={{
                              width: 24,
                              height: 24,
                              mr: 1,
                              fontSize: "0.75rem",
                              bgcolor: project.color,
                            }}
                          >
                            {teamMembers.find(
                              (m) => m.id === currentTask.assignee
                            )?.avatar || "?"}
                          </Avatar>
                          <Typography variant="body2">
                            {teamMembers.find(
                              (m) => m.id === currentTask.assignee
                            )?.name || "Unknown"}
                          </Typography>
                        </Box>
                      ) : (
                        <Typography variant="body2" color="text.secondary">
                          Unassigned
                        </Typography>
                      )}
                    </Box>

                    <Box sx={{ mb: 2 }}>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        display="block"
                      >
                        Due Date
                      </Typography>
                      {currentTask.dueDate ? (
                        <Typography variant="body2">
                          {formatDate(currentTask.dueDate)}
                        </Typography>
                      ) : (
                        <Typography variant="body2" color="text.secondary">
                          No due date
                        </Typography>
                      )}
                    </Box>

                    <Box>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        display="block"
                      >
                        Created
                      </Typography>
                      <Typography variant="body2">
                        {formatDate(currentTask.createdAt)}
                      </Typography>
                    </Box>
                  </Paper>

                  <Paper variant="outlined" sx={{ p: 2 }}>
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                      Attachments
                    </Typography>

                    {currentTask.attachments.length > 0 ? (
                      <List dense>
                        {currentTask.attachments.map((attachment, index) => (
                          <ListItem key={index}>
                            <ListItemText
                              primary={attachment}
                              secondary="Click to download"
                            />
                          </ListItem>
                        ))}
                      </List>
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        No attachments
                      </Typography>
                    )}

                    <Button
                      startIcon={<AttachFileIcon />}
                      fullWidth
                      variant="outlined"
                      size="small"
                      sx={{ mt: 1 }}
                    >
                      Add Attachment
                    </Button>
                  </Paper>
                </Grid>
              </Grid>
            </DialogContent>
          </>
        )}
      </Dialog>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl) && taskMenuId !== null}
        onClose={closeTaskMenu}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem
          onClick={() => taskMenuId && handleEditTask(taskMenuId)}
        >
          <EditIcon fontSize="small" sx={{ mr: 1 }} />
          Edit Task
        </MenuItem>
        <MenuItem
          onClick={() => taskMenuId && handleDeleteTask(taskMenuId)}
        >
          <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
          Delete Task
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={() => taskMenuId && updateTaskStatus(taskMenuId, "todo")}
        >
          <Box
            component="span"
            sx={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              bgcolor: "#9CA3AF",
              mr: 1,
              display: "inline-block",
            }}
          />
          Move to To Do
        </MenuItem>
        <MenuItem
          onClick={() => taskMenuId && updateTaskStatus(taskMenuId, "inProgress")}
        >
          <Box
            component="span"
            sx={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              bgcolor: "#3B82F6",
              mr: 1,
              display: "inline-block",
            }}
          />
          Move to In Progress
        </MenuItem>
        <MenuItem
          onClick={() => taskMenuId && updateTaskStatus(taskMenuId, "review")}
        >
          <Box
            component="span"
            sx={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              bgcolor: "#F59E0B",
              mr: 1,
              display: "inline-block",
            }}
          />
          Move to Review
        </MenuItem>
        <MenuItem
          onClick={() => taskMenuId && updateTaskStatus(taskMenuId, "done")}
        >
          <Box
            component="span"
            sx={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              bgcolor: "#10B981",
              mr: 1,
              display: "inline-block",
            }}
          />
          Move to Done
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default ProjectDetail;