import {
  Box,
  Card,
  CardContent,
  Chip,
  FormControl,
  Grid,
  LinearProgress,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { useState } from "react";

interface Task {
  id: number;
  title: string;
  developer: string;
  status: "To Do" | "In Progress" | "Completed" | "Blocked";
}

interface Sprint {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  team: string;
  storyPoints: number;
  completionPercentage: number;
  tasks: Task[]; // Array of tasks
  bugsFound: number;
  status: "Completed" | "In Progress" | "Planned";
}

const TaskChart = () => {
  const [sprintSelection, setSprintSelection] = useState("all_sprints");
  const [sprintData1, setSprintData] = useState([]);

  const sprintData: Sprint[] = [
    {
      id: 1,
      title: "UI Redesign Sprint",
      startDate: "Jan 1, 2025",
      endDate: "Jan 14, 2025",
      team: "Frontend",
      storyPoints: 38,
      completionPercentage: 95,
      tasks: [
        {
          id: 101,
          title: "Implement Navbar",
          developer: "Alice",
          status: "Completed",
        },
        {
          id: 102,
          title: "Revamp Landing Page",
          developer: "Alice",
          status: "In Progress",
        },
        {
          id: 103,
          title: "Update Footer UI",
          developer: "Alice",
          status: "To Do",
        },
        {
          id: 104,
          title: "Fix Mobile Responsiveness",
          developer: "Alice",
          status: "Blocked",
        },
      ],
      bugsFound: 2,
      status: "In Progress",
    },
    {
      id: 2,
      title: "Backend Optimization Sprint",
      startDate: "Jan 15, 2025",
      endDate: "Jan 28, 2025",
      team: "Backend",
      storyPoints: 42,
      completionPercentage: 100,
      tasks: [
        {
          id: 201,
          title: "Optimize Database Queries",
          developer: "Alice",
          status: "Completed",
        },
        {
          id: 202,
          title: "Improve API Response Time",
          developer: "Bob",
          status: "Completed",
        },
        {
          id: 203,
          title: "Implement Caching",
          developer: "Alice",
          status: "To Do",
        },
      ],
      bugsFound: 0,
      status: "In Progress",
    },
  ];

  const [selectedDeveloper, setSelectedDeveloper] = useState<string>("Alice");

  const filteredSprints = sprintData
    .map((sprint) => {
      const devTasks = sprint.tasks.filter(
        (task) => task.developer === selectedDeveloper
      );

      return {
        ...sprint,
        totalTasks: devTasks.length,
        completed: devTasks.filter((task) => task.status === "Completed")
          .length,
        inProgress: devTasks.filter((task) => task.status === "In Progress")
          .length,
        toDo: devTasks.filter((task) => task.status === "To Do").length,
        blocked: devTasks.filter((task) => task.status === "Blocked").length,
      };
    })
    .filter((sprint) => sprint.totalTasks > 0);

  const [sprintFilter, setSprintFilter] = useState<string>("all");

  const handleSprintFilterChange = (event: SelectChangeEvent) => {
    setSprintFilter(event.target.value);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        width: "100%",
        mt: 2,
        borderRadius: 4,
        background: "linear-gradient(to right,#F5F7FA, #ffffff)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 1,
          width: "100%",
        }}
      >
        <Typography variant="h6">Task Completeness</Typography>
        <FormControl sx={{ minWidth: 150 }}>
          <Select
            value={sprintFilter}
            onChange={handleSprintFilterChange}
            displayEmpty
            size="small"
          >
            <MenuItem value="all">All Sprints</MenuItem>
            <MenuItem value="frontend">Frontend</MenuItem>
            <MenuItem value="backend">Backend</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {filteredSprints.map((sprint) => (
        <Card
          key={sprint.id}
          sx={{
            my: 2,
            borderRadius: 2,
            boxShadow: 1,
            background: "linear-gradient(to right, #f5f7fa, #ffffff)",
          }}
        >
          <CardContent>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 1,
              }}
            >
              <Typography variant="h6">{sprint.title}</Typography>
              <Chip
                label={sprint.status}
                color={sprint.status === "Completed" ? "success" : "primary"}
                variant="filled"
                size="small"
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignContent: "center",
                mb: 1,
              }}
            >
              <Typography variant="body2" color="text.secondary">
                {sprint.startDate} - {sprint.endDate}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Team: {sprint.team}
              </Typography>
            </Box>

            <LinearProgress
              variant="determinate"
              value={(sprint.completed / sprint.totalTasks) * 100}
              sx={{
                height: 10,
                borderRadius: 5,
                mb: 2,
                backgroundColor: "#e0e0e0",
                "& .MuiLinearProgress-bar": {
                  backgroundColor: "#4caf50",
                },
              }}
            />

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: 2,
                textAlign: "center",
              }}
            >
              <Box>
                <Typography
                  variant="h6"
                  color="primary"
                  sx={{ fontWeight: "bold" }}
                >
                  {sprint.totalTasks}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Developer Tasks
                </Typography>
              </Box>
              <Box>
                <Typography
                  variant="h6"
                  color="primary"
                  sx={{ fontWeight: "bold" }}
                >
                  {((sprint.completed / sprint.totalTasks) * 100).toFixed(2)}%
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Completed
                </Typography>
              </Box>
              <Box>
                <Typography
                  variant="h6"
                  color="primary"
                  sx={{ fontWeight: "bold" }}
                >
                  {sprint.inProgress}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  In Progress
                </Typography>
              </Box>
              <Box>
                <Typography
                  variant="h6"
                  color="primary"
                  sx={{ fontWeight: "bold" }}
                >
                  {sprint.toDo}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  To Do
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Paper>
  );
};

export default TaskChart;
