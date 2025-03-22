import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import TaskWrapper from "./TaskWrapper";
import axios from "axios";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:3000/dev/tasks");
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const groupedTasks = {
    TO_DO: tasks.filter((task: any) => task.status === "TO_DO"),
    IN_PROGRESS: tasks.filter(
      (task: any) => task.status.toUpperCase() === "IN_PROGRESS"
    ),
    COMPLETED: tasks.filter(
      (task: any) => task.status.toUpperCase() === "COMPLETED"
    ),
    BLOCKED: tasks.filter(
      (task: any) => task.status.toUpperCase() === "BLOCKED"
    ),
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
