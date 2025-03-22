import { Box } from "@mui/material";
import TaskWrapper from "./TaskWrapper";

const Tasks = () => {
  const tasks = [
    {
      taskName: "Build Authentication System",
      assignees: ["img4.jpg"],
      dueDate: "",
      priority: "Medium",
      status: "TO_DO",
    },
    {
      taskName: "User Role Management",
      assignees: ["img1.jpg", "img2.jpg"],
      dueDate: "Tomorrow",
      priority: "High",
      status: "IN_PROGRESS",
    },
    {
      taskName: "Implement Dark Mode",
      assignees: ["img3.jpg"],
      dueDate: "3 days ago",
      priority: "Low",
      status: "IN_PROGRESS",
    },
    {
      taskName: "Testing Payment Module",
      assignees: ["img5.jpg"],
      dueDate: "2 days ago",
      priority: "",
      status: "TO_DO",
    },
    {
      taskName: "Testing Payment Module",
      assignees: ["img5.jpg"],
      dueDate: "2 days ago",
      priority: "Urgent",
      status: "TO_DO",
    },
    {
      taskName: "Testing Payment Module Security",
      assignees: ["img5.jpg"],
      dueDate: "2 days ago",
      priority: "Urgent",
      status: "BLOCKED",
    },
    {
      taskName: "Testing Payment Module Design",
      assignees: ["img5.jpg"],
      dueDate: "2 days ago",
      priority: "Urgent",
      status: "COMPLETED",
    },
  ];

  const groupedTasks = {
    TO_DO: tasks.filter((task) => task.status === "TO_DO"),
    IN_PROGRESS: tasks.filter((task) => task.status === "IN_PROGRESS"),
    COMPLETED: tasks.filter((task) => task.status === "COMPLETED"),
    BLOCKED: tasks.filter((task) => task.status === "BLOCKED"),
  };

  const statusLabels = {
    TO_DO: "To Do",
    IN_PROGRESS: "In Progress",
    COMPLETED: "Completed",
    BLOCKED: "Blocked",
  };

  return (
    <Box sx={{ paddingTop: 2 }}>
      {Object.entries(groupedTasks).map(([status, taskList]) => (
        <TaskWrapper
          key={status}
          tasks={taskList}
          status={statusLabels[status as keyof typeof statusLabels]}
        />
      ))}
    </Box>
  );
};

export default Tasks;
