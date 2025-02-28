import { SyntheticEvent, useState } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

const DashboardTabs = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ 
      width: '100%', 
      bgcolor: 'background.paper', 
      borderColor: 'divider',
      borderBottom: 1,
      }}>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label="Sprints" />
        <Tab label="Progress Tracking" />
        <Tab label="Workload" />
        <Tab label="Project Overview" />
        <Tab label="Custom Charts" />
        <Tab label="Add Tab +" />
      </Tabs>
    </Box>
    

  );

}

export default DashboardTabs
