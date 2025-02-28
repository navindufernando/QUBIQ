import React from 'react'
import { Paper, Typography, Button, Grid2 } from '@mui/material';
import Calendar from './Components/Calendar';
import Activity from './Components/Activity';
import DashboardTabs from './Components/DashboardTabs';


const PMDashboard = () => {
  return (
    <div className='p-2'>
      <Grid2 container spacing={3}>
        <Grid2 size={{ xs: 12, md: 8 }}>
            <DashboardTabs/>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 4 }}>
          <Calendar/>
          <Activity/>
        </Grid2>
      </Grid2>
    </div>
  )
}

export default PMDashboard
