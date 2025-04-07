import { Box, Paper, Tab, Tabs } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import Tasks from "./Tasks/Tasks";
import CodeImprovements from "./Improvements/CodeImprovements";
import SkillImprovements from "./Improvements/SkillImprovements";
// import CodeQuality from "./CodeQuality/CodeQuality";
import CodeTimePercentageChart from "./CodeQuality/CodeTimePercentageChart";
import DailyCodeChart from "./CodeQuality/DailyCodeChart";
import WorkTimeChart from "./DevInsights/WorkTimeChart";
import TaskChart from "./DevInsights/TaskChart";

const DashboardTabs = () => {
  const [displayTab, setDisplayTab] = useState(0);

  const handleChange = (event: SyntheticEvent, newDisplayTab: number) => {
    setDisplayTab(newDisplayTab);
  };

  const renderTabContent = () => {
    switch (displayTab) {
      case 0:
        return <Tasks />;
      case 1:
        return (
          <div>
            <CodeImprovements />
            <SkillImprovements />
          </div>
        );
      case 2:
        return (
          <div>
            <DailyCodeChart />
            <CodeTimePercentageChart />
          </div>
        );
      case 3:
        return (
          <div>
            <WorkTimeChart />
            <TaskChart />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Paper elevation={3} sx={{ p: 2, pt: 3, borderRadius: 4}}>
        <Box
          sx={{
            width: "100%",
            bgcolor: "background.paper",
            borderColor: "divider",
            pl: 4,
          }}
        >
          <Tabs value={displayTab} onChange={handleChange} 
            sx={{
              "& .MuiTab-root": {
                color: "#938E99",
              },
              "& .MuiTab-root.Mui-selected": {
                color: "#575BF0"
              }
            }}
            slotProps={{
              indicator: {
                sx: { backgroundColor: "#575BF0"}
              }
          }}>
            <Tab label="Tasks" />
            <Tab label="Improvements" />
            <Tab label="Coding Quality" />
            <Tab label="Developer Insights" />
          </Tabs>
        </Box>
        <Box sx={{ p: 2 }}>{renderTabContent()}</Box>
      </Paper>
    </>
  );
};

export default DashboardTabs;
