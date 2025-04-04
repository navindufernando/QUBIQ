import {
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import FlagTwoToneIcon from "@mui/icons-material/FlagTwoTone";
import axios from "axios";
import { useState } from "react";

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

interface TaskListProps {
  tasks: Task[];
  status: string;
  onStatusChange: (taskId: number, newStatus: string) => void;
}

const TaskWrapper: React.FC<TaskListProps> = ({
  tasks,
  status,
  onStatusChange,
}) => {
  const taskNum = tasks.length;

  return (
    <>
      <Paper elevation={3} sx={{ p: 3, marginBottom: 4, borderRadius: 4,
        background: "linear-gradient(to right,#F5F7FA, #ffffff)",
      }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex" }}>
            <Typography
              variant="h5"
              sx={{ fondWeight: "bold", marginRight: 4 }}
            >
              {status}
            </Typography>
            <Box>
              <Badge
                badgeContent={taskNum}
                color="primary"
                overlap="circular"
              />
            </Box>
          </Box>
        </Box>
        <Divider
          variant="middle"
          sx={{ my: 1, marginX: 4, borderBottomWidth: 4 }}
        />
        { taskNum == 0 ? (
          <Typography
          variant="subtitle1"
          sx={{ textAlign: "center", mt: 4, mb: 2 }}
          >
            There are no tasks available in this category.
          </Typography>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Tasks</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Assignee</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Due Date</TableCell>
                {/* <TableCell sx={{ fontWeight: "bold" }}>Priority</TableCell> */}
                <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks.map((task, i) => (
                <TableRow
                  key={i}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{task.name}</TableCell>
                  <TableCell>
                    <Avatar sx={{ width: 33, height: 33, fontSize: "0.975" }}>
                      {task.assigneeName.charAt(0)}
                    </Avatar>
                  </TableCell>
                  <TableCell>
                    {task.endDate || <CalendarMonthOutlinedIcon />}
                  </TableCell>
                  {/* <TableCell>{task.priority || <FlagTwoToneIcon />}</TableCell> */}
                  <TableCell>
                    <Select
                      value={task.status}
                      onChange={(e) => onStatusChange(task.id, e.target.value)}
                      sx={{ width: "100%" }}
                    >
                      <MenuItem value="TO_DO">To Do</MenuItem>
                      <MenuItem value="IN_PROGRESS">In Progress</MenuItem>
                      <MenuItem value="COMPLETED">Completed</MenuItem>
                      <MenuItem value="BLOCKED">Blocked</MenuItem>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Paper>
    </>
  );
};

export default TaskWrapper;
