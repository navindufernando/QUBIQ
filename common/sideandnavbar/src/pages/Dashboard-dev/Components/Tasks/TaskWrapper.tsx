import {
  Badge,
  Box,
  Button,
  Divider,
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

interface Task {
  taskName: string;
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
}

const TaskWrapper: React.FC<TaskListProps> = ({ tasks, status }) => {
  const taskNum = tasks.length;

  return (
    <>
      <Box sx={{ p: 3, bgcolor: "background.paper", marginBottom: 4 }}>
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
          <Button
            variant="outlined"
            href="#outlined-buttons"
            sx={{
              borderRadius: "100%",
              width: 35,
              height: 35,
              minWidth: 0,
              padding: 0,
            }}
          >
            <AddIcon />
          </Button>
        </Box>
        <Divider
          variant="middle"
          sx={{ my: 1, marginX: 4, borderBottomWidth: 4 }}
        />
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
                <TableCell>{task.assignees}</TableCell>
                <TableCell>
                  {task.endDate || <CalendarMonthOutlinedIcon />}
                </TableCell>
                {/* <TableCell>{task.priority || <FlagTwoToneIcon />}</TableCell> */}
                <TableCell>{status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </>
  );
};

export default TaskWrapper;
