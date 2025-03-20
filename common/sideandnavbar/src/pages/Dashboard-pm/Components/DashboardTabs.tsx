import { SyntheticEvent, useState } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import CreateSprint from './Sprints/CreateSprint';
import TeamProgress from './TeamProgress/TeamProgress';
import Workload from './Workload/Workload';
import ProjectOverview from './ProjectOverview/ProjectOverview';
import CustomCharts from './Custom/CustomCharts';

const DashboardTabs = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const renderTabContent = () => {
    switch (value) {
      case 0:
        return <CreateSprint/>;
      case 1: 
        return <TeamProgress/>;
      case 2:
        return <Workload/>;
      case 3:
        return <ProjectOverview/>;
      case 4:
        return <CustomCharts/>;
      default:
        return <CreateSprint/>;
    }
  }

  return (
    <>
    <Box sx={{
      width: '100%',
      bgcolor: 'background.paper',
      mb: 2,
    }}>
      <Tabs variant='scrollable' scrollButtons value={value} onChange={handleChange} centered>
        <Tab label="Sprints" />
        <Tab label="Progress Tracking" />
        <Tab label="Workload" />
        <Tab label="Project Overview" />
        <Tab label="Custom Charts" />
      </Tabs>
    </Box><Box sx={{ p: 2 }}>{renderTabContent()}</Box>
    </>


  );

}

export default DashboardTabs
