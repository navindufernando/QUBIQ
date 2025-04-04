import { PieChart } from "@mui/x-charts/PieChart";
import {
  Box,
  FormControl,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { Legend } from "recharts";
import { useEffect, useState } from "react";
import axios from "axios";

const CodeTimePercentageChart = () => {
  const [timePeriod, setTimePeriod] = useState<string>("today");

  const handleTimePeriodChange = (event: SelectChangeEvent) => {
    setTimePeriod(event.target.value);
  };

  const codingTimeStats = [
    { id: "Quality Coding Time", value: 20, color: "#02B2AF" },
    { id: "Other Coding Time", value: 50, color: "#2E96FF" },
  ];

  const [codeTimeStat, setCodeTimeStat] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/dev/codetime-total",
          {
            params: { timePeriod },
          }
        );
        setCodeTimeStat(response.data);
      } catch (error) {
        console.error("Error fetching code time:", error);
      }
    };

    fetchTasks();
  }, [timePeriod]);

  return (
    <>
      <Paper elevation={3} sx={{ width: "100%", p: 2, mt: 4, mb: 2, borderRadius: 4, background: "linear-gradient(to right,#F5F7FA, #ffffff)" }}>
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
              <MenuItem value="today">Today</MenuItem>
              <MenuItem value="yesterday">Yesterday</MenuItem>
              <MenuItem value="this_week">This Week</MenuItem>
              <MenuItem value="last_week">Last Week</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ width: "100%", height: "100%" }}>
          <PieChart
            series={[
              {
                data: codingTimeStats,
                highlightScope: { fade: "global", highlight: "item" },
                faded: {
                  innerRadius: 30,
                  additionalRadius: -30,
                  color: "gray",
                },
                valueFormatter: ({ id, value }) => `${id}: ${value} hrs`,
              },
            ]}
            height={200}
            sx={{ width: "100%" }}
            slotProps={{
              legend: {
                hidden: false,
                direction: "column",
                position: { vertical: "middle", horizontal: "right" },
              },
            }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: 1,
            }}
          >
            {codingTimeStats.map((entry, index) => (
              <div
                key={`legend-item-${index}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginRight: "20px",
                }}
              >
                <div
                  style={{
                    width: "20px",
                    height: "20px",
                    backgroundColor: entry.color,
                    marginRight: "8px",
                  }}
                ></div>
                <span>{entry.id}</span>
              </div>
            ))}
          </div>
        </Box>
      </Paper>
    </>
  );
};

export default CodeTimePercentageChart;
