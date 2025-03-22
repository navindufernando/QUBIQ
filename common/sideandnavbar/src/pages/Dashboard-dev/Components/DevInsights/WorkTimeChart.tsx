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
import { useState } from "react";

const WorkTimeChart = () => {
  const [timePeriod, setTimePeriod] = useState<string>("This week");

  const handleTimePeriodChange = (event: SelectChangeEvent) => {
    setTimePeriod(event.target.value);
  };

  const dataset = [
    { weekDayIndex: 0, time: 6 }, // Monday
    { weekDayIndex: 1, time: 7 }, // Tuesday
    { weekDayIndex: 2, time: 5 }, // Wednesday
    { weekDayIndex: 3, time: 8 }, // Thursday
    { weekDayIndex: 4, time: 6.5 }, // Friday
    { weekDayIndex: 5, time: 4 }, // Saturday
    { weekDayIndex: 6, time: 3 }, // Sunday
  ];

  const valueFormatter = (value: number | null) => `${value} hrs`;

  return (
    <Paper elevation={2} sx={{ p: 2, width: "100%", mt: 2 }}>
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
            <MenuItem value="This week">This Week</MenuItem>
            <MenuItem value="Last week">Last Week</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <LineChart
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
