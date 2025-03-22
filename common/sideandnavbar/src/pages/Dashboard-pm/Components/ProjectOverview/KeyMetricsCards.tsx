import { CheckCircle, Height } from '@mui/icons-material'
import { Box, Grid2, Paper, Typography, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getTaskByCounts } from '../../../../services/TaskAPI';

interface TaskCountData {
    completedTasks: number;
    pendingTasks: number;
    inProgressTasks: number;
    overdueTasks: number;
}

const KeyMetricsCards = ({ projectId }: { projectId: string }) => {
    const theme = useTheme();
    const [taskCountData, setTaskCountData] = useState<TaskCountData| null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTaskCounts = async () => {
            try {
                const data = await getTaskByCounts(projectId);
                console.log('Fetched task count data:', data);
                setTaskCountData(data);
            } catch (error) {
                console.error('Failed to fetch task counts: ', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTaskCounts();
    }, [projectId]);

    if (loading) {
        return (
            <Typography>Loading project data...</Typography>
        )
    }

    if (!taskCountData) {
        return (
            <Typography>No Project data found.</Typography>
        )
    }
      

  return (
    <>
    <Grid2 container spacing={3} sx={{ mb: 3 }}>
          <Grid2 sx={{ xs: 12, sm: 6, md: 3 }}>
              <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
                  <Box sx={{ textAlign: 'center' }}>
                      <CheckCircle sx={{ fontSize: 40, color: theme.palette.success.main, mb: 1 }} />
                      <Typography variant='h4' component='div' sx={{ fontWeight: 'bold' }}>
                          {taskCountData.completedTasks}
                      </Typography>
                      <Typography variant='body2' color='text.secondary'>
                          Tasks Completed
                      </Typography>
                  </Box>
              </Paper>
          </Grid2>
          <Grid2 sx={{ xs: 12, sm: 6, md: 3 }}>
              <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
                  <Box sx={{ textAlign: 'center' }}>
                      <CheckCircle sx={{ fontSize: 40, color: theme.palette.info.main, mb: 1 }} />
                      <Typography variant='h4' component='div' sx={{ fontWeight: 'bold' }}>
                          {taskCountData.inProgressTasks}
                      </Typography>
                      <Typography variant='body2' color='text.secondary'>
                          Tasks In Progress
                      </Typography>
                  </Box>
              </Paper>
          </Grid2>

      </Grid2>
      <Grid2 container spacing={3} sx={{ mb: 3 }}>
              <Grid2 sx={{ xs: 12, sm: 6, md: 3 }}>
                  <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
                      <Box sx={{ textAlign: 'center' }}>
                          <CheckCircle sx={{ fontSize: 40, color: theme.palette.error.main, mb: 1 }} />
                          <Typography variant='h4' component='div' sx={{ fontWeight: 'bold' }}>
                              {taskCountData.pendingTasks}
                          </Typography>
                          <Typography variant='body2' color='text.secondary'>
                              Tasks Pending
                          </Typography>
                      </Box>
                  </Paper>
              </Grid2>
              <Grid2 sx={{ xs: 12, sm: 6, md: 3 }}>
                  <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
                      <Box sx={{ textAlign: 'center' }}>
                          <CheckCircle sx={{ fontSize: 40, color: theme.palette.primary.main, mb: 1 }} />
                          <Typography variant='h4' component='div' sx={{ fontWeight: 'bold' }}>
                              {taskCountData.overdueTasks}
                          </Typography>
                          <Typography variant='body2' color='text.secondary'>
                              Tasks Overdue
                          </Typography>
                      </Box>
                  </Paper>
              </Grid2>
          </Grid2></>
    
  )
}

export default KeyMetricsCards
