import {
  Box,
  FormControl,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import axios from "axios";
import { useEffect, useState } from "react";

const DailyCodeChart = () => {
  const [timePeriod, setTimePeriod] = useState<string>("This week");

  const handleTimePeriodChange = (event: SelectChangeEvent) => {
    setTimePeriod(event.target.value);
  };

  const dataset = [
    { weekDayIndex: 0, totalTime: 6, qualityTime: 4 }, // Monday
    { weekDayIndex: 1, totalTime: 7, qualityTime: 5 }, // Tuesday
    { weekDayIndex: 2, totalTime: 5, qualityTime: 3.5 }, // Wednesday
    { weekDayIndex: 3, totalTime: 8, qualityTime: 6 }, // Thursday
    { weekDayIndex: 4, totalTime: 6.5, qualityTime: 4.5 }, // Friday
    { weekDayIndex: 5, totalTime: 4, qualityTime: 2.5 }, // Saturday
    { weekDayIndex: 6, totalTime: 3, qualityTime: 2 }, // Sunday
  ];

  const [codeTime, setCodeTime] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:3000/dev/codetime", {
          params: { timePeriod },
        });
        setCodeTime(response.data);
      } catch (error) {
        console.error("Error fetching code time:", error);
      }
    };

    fetchTasks();
  }, [timePeriod]);

  const valueFormatter = (value: number | null) => `${value} hrs`;

  return (
    <>
      <Paper elevation={2} sx={{ p: 2, height: "100%", mt: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1,
            width: "100%",
          }}
        >
          <Typography variant="h6">Daily Coding Time Comparison</Typography>
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
        <BarChart
          dataset={dataset}
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
              dataKey: "totalTime",
              label: "Total Coding Time",
              valueFormatter,
            },
            {
              dataKey: "qualityTime",
              label: "Quality Coding Time",
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
    </>
  );
};

export default DailyCodeChart;
