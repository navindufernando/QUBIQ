import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import TaskWrapper from "./TaskWrapper";
import axios from "axios";
import { useAuth } from "../../../Signup&Login/AuthContext";

interface Task {
  taskName: string;
  assigneeName: string;
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: string;
  projectId: string;
  assigneeId: number;
  createdAt: string;
  updatedAt: string;
}

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { user } = useAuth();
  const userId = user?.id;

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:3000/dev/tasks", {
          params: { userId },
        });
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  useEffect(() => {
    console.log(tasks);
    console.log(userId);
  }, [tasks]);

  const handleStatusChange = async (taskId: number, newStatus: string) => {
    try {
      // Send update to backend
      await axios.patch(`http://localhost:3000/dev/tasks/${taskId}`, {
        status: newStatus,
      });

      // Update local state
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, status: newStatus } : task
        )
      );
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

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
          onStatusChange={handleStatusChange}
        />
      ))}
    </Box>
  );
};

export default Tasks;
