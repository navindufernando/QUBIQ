import { Box, Tab, Tabs } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import Tasks from "./Tasks/Tasks";

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
        return <div></div>;
      case 2:
        return <div></div>;
      case 3:
        return <div></div>;
      case 4:
        return <div></div>;
      default:
        return null;
    }
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          bgcolor: "background.paper",
          borderColor: "divider",
          borderBottom: 1,
        }}
      >
        <Tabs value={displayTab} onChange={handleChange} centered>
          <Tab label="Tasks" />
          <Tab label="Work" />
          <Tab label="pending" />
          <Tab label="pending" />
          <Tab label="pending" />
        </Tabs>
      </Box>
      <Box sx={{ p: 2 }}>{renderTabContent()}</Box>
    </>
  );
};

export default DashboardTabs;
