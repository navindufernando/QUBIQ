import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import FlagTwoToneIcon from "@mui/icons-material/FlagTwoTone";

// type Status = "IN_PROGRESS" | "COMPLETED" | "TODO";

interface Task {
  taskName: string;
  assignees: string[]; // if the images are URLs (change later if necessary)
  dueDate: string;
  priority: string;
  status: string; // change this later
}

interface TaskListProps {
  tasks: Task[];
  inProgress: boolean;
}

const TaskSection: React.FC<TaskListProps> = ({ tasks, inProgress }) => {
  const [taskCount, setTaskCount] = useState(tasks.length);
  return (
    <div className="bg-[#FFFFFF] px-4 py-6  rounded-xl">
      <div className="flex justify-between items-center px-8">
        <div className="flex items-center">
          <div
            className={`w-3 h-3 me-2 rounded-full ${
              inProgress ? "bg-[#FFA500]" : "bg-[#5030E5]"
            }`}
          ></div>
          <div>{inProgress ? "In Progress" : "To Do"}</div>
          <span className="inline-flex items-center justify-center w-4 h-4 ms-8 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full">
            {taskCount}
          </span>
        </div>
        <div className="flex">
          <span
            className={`inline-flex items-center justify-center w-6 h-6 ms-8 text-sm font-semibold rounded-sm pb-[3px] ${
              inProgress
                ? "text-[#FFA500] bg-[#F7E5C4]"
                : "text-[#5030E5] bg-[#C3BAFF]"
            }`}
          >
            +
          </span>
        </div>
      </div>
      <hr
        className={`w-226 h-1 my-4 mx-auto border-0 rounded-sm ${
          inProgress ? "bg-[#FFA500]" : "bg-[#5030E5]"
        }`}
      ></hr>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Tasks</TableCell>
            <TableCell>Assignee</TableCell>
            <TableCell>Due Date</TableCell>
            <TableCell>Priority</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.map((task, i) => (
            <TableRow
              key={i}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>{task.taskName}</TableCell>
              <TableCell>{task.assignees}</TableCell>
              <TableCell>
                {task.dueDate || <CalendarMonthOutlinedIcon />}
              </TableCell>
              <TableCell>{task.priority || <FlagTwoToneIcon />}</TableCell>
              <TableCell>{task.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TaskSection;
