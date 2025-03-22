import { Box, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getTaskBySprintAndProject } from '../../../../services/TaskAPI';

const TimelineCard = ({ projectId, sprintId }: { projectId: string, sprintId: string }) => {
  const [timelineData, setTimelineData] = useState([]);
  const [projectStart, setProjectStart] = useState(new Date());
  const [totalDays, setTotalDays] = useState(1);
  const [loading, setLoading] = useState(true);
  const today = new Date();

  useEffect(() => {
    const fetchTaskByProjectAndSprint = async () => {
      try {
        const data = await getTaskBySprintAndProject(projectId, sprintId);
        console.log('Fetched task data:', data);

        if (data && data.length > 0) {
          setTimelineData(data);

          // Find project start date (earliest task start date)
          const startDates = data.map((task: any) => new Date(task.start));
          const endDates = data.map((task: any) => new Date(task.end));
          const earliestStart = new Date(Math.min(...startDates.map((date: any) => date.getTime())));
          const latestEnd = new Date(Math.max(...endDates.map((date: any) => date.getTime())));

          setProjectStart(earliestStart);
          setTotalDays(Math.ceil((latestEnd.getTime() - earliestStart.getTime()) / (1000 * 60 * 60 * 24)));
        }
      } catch (error) {
        console.error('Failed to fetch task data: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTaskByProjectAndSprint();
  }, [projectId, sprintId]);

  return (
    <Box sx={{ my: 4 }}>
      <Paper elevation={2} sx={{ p: 3 }}>
        <Typography variant='h6' gutterBottom>
          Gantt Chart Timeline
        </Typography>
        <Box sx={{ height: 350, position: 'relative', overflow: 'auto' }}>
          {loading ? (
            <Typography>Loading...</Typography>
          ) : (
            timelineData.map((item: any) => {
              const startDate = new Date(item.start);
              const endDate = new Date(item.end);

              const startOffset = Math.ceil((startDate.getTime() - projectStart.getTime()) / (1000 * 60 * 60 * 24)) / totalDays * 100;
              const duration = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) / totalDays * 100;

              return (
                <Box key={item.id} sx={{ display: 'flex', alignItems: 'center', height: 40, mb: 1 }}>
                  <Box sx={{ width: '25%', pr: 2 }}>
                    <Typography variant="body2" fontWeight="medium">
                      {item.task}
                    </Typography>
                  </Box>
                  <Box sx={{ width: '75%', height: 24, bgcolor: 'grey.100', borderRadius: 1, position: 'relative' }}>
                    <Box 
                      sx={{ 
                        position: 'absolute', 
                        height: 24, 
                        borderRadius: 1, 
                        bgcolor: '#4CAF50',
                        left: `${startOffset}%`,
                        width: `${duration}%`
                      }}
                    />
                    {today >= startDate && today <= endDate && (
                      <Box 
                        sx={{ 
                          position: 'absolute', 
                          height: 24, 
                          width: 2, 
                          bgcolor: 'black',
                          left: `${(new Date(today).getTime() - projectStart.getTime()) / (1000 * 60 * 60 * 24) / totalDays * 100}%`
                        }}
                      />
                    )}
                  </Box>
                </Box>
              );
            })
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default TimelineCard;
