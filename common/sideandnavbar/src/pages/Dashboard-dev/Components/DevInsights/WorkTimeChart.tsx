import {
  Box,
  FormControl,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../../../Signup&Login/AuthContext";

const WorkTimeChart = () => {
  const [timePeriod, setTimePeriod] = useState<string>("this_week");
  const [codeTime, setCodeTime] = useState([]);
  const { user } = useAuth();
  const userId = user?.id;

  const handleTimePeriodChange = (event: SelectChangeEvent) => {
    setTimePeriod(event.target.value);
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/dev/codetimeinsight",
          {
            params: { userId, timePeriod },
          }
        );
        setCodeTime(response.data);
      } catch (error) {
        console.error("Error fetching code time:", error);
      }
    };

    fetchTasks();
  }, [timePeriod]);

  const valueFormatter = (value: number | null) => `${value} hrs`;

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
        <Typography variant="h6">Daily Coding Time</Typography>
        <FormControl sx={{ minWidth: 150 }}>
          <Select
            value={timePeriod}
            onChange={handleTimePeriodChange}
            displayEmpty
            size="small"
          >
            <MenuItem value="this_week">This Week</MenuItem>
            <MenuItem value="last_week">Last Week</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <LineChart
        dataset={codeTime}
        xAxis={[
          {
            scaleType: "band",
            dataKey: "weekDayIndex",
            valueFormatter: (index: number) =>
              ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][index],
          },
        ]}
        series={[
          {
            dataKey: "time",
            label: "Time",
            valueFormatter,
          },
        ]}
        yAxis={[{ label: "Time (hrs)" }]}
        height={300}
        sx={{
          width: "100%",
        }}
      />
    </Paper>
  );
};

export default WorkTimeChart;
