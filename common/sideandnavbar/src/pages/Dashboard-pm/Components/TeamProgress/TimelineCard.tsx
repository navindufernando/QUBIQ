import { Box, Paper, Typography, Tooltip, CircularProgress, Chip, Divider } from '@mui/material';
import React, { useEffect, useState } from 'react';

const SprintTimelineCard = ({ projectId, sprintId }: { projectId: string, sprintId: string }) => {
  const [timelineData, setTimelineData] = useState<any[]>([
    {
      id: 'task-1',
      task: 'Task 1',
      start: '2025-03-01',
      end: '2025-03-05',
      status: 'completed',
      assignee: 'Alice',
    },
    {
      id: 'task-2',
      task: 'Task 2',
      start: '2025-03-03',
      end: '2025-03-07',
      status: 'in progress',
      assignee: 'Bob',
    },
    {
      id: 'task-3',
      task: 'Task 3',
      start: '2025-03-02',
      end: '2025-03-10',
      status: 'delayed',
      assignee: 'Charlie',
    },
    {
      id: 'task-4',
      task: 'Task 4',
      start: '2025-03-04',
      end: '2025-03-08',
      status: 'blocked',
      assignee: 'Dave',
    },
  ]);
  const [projectStart, setProjectStart] = useState<Date>(new Date('2025-03-01'));
  const [projectEnd, setProjectEnd] = useState<Date>(new Date('2025-03-10'));
  const [totalDays, setTotalDays] = useState(10);
  const [loading, setLoading] = useState(false);
  const [sprintProgress, setSprintProgress] = useState(60);
  const today = new Date();

  // Format date to display in a readable format
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getStatusColor = (status: string): string => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return '#4CAF50';
      case 'in progress':
        return '#2196F3';
      case 'delayed':
        return '#FF9800';
      case 'blocked':
        return '#F44336';
      default:
        return '#9E9E9E';
    }
  };

  const getTaskCompletion = (task: any): number => {
    if (task.status === 'completed') return 100;

    const startDate = new Date(task.start);
    const endDate = new Date(task.end);
    const totalTaskDuration = endDate.getTime() - startDate.getTime();

    if (today < startDate) return 0;
    if (today > endDate) return task.status === 'completed' ? 100 : 80;

    const elapsed = today.getTime() - startDate.getTime();
    return Math.min(Math.round((elapsed / totalTaskDuration) * 100), 100);
  };

  return (
    <Box sx={{ my: 4 }}>
      <Paper
        elevation={3}
        sx={{
          p: 3,
          borderRadius: 2,
          background: 'linear-gradient(to right, #ffffff, #f8f9fa)',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2,
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            Sprint Timeline
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Chip label={`${timelineData.length} Tasks`} size="small" color="primary" variant="outlined" />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CircularProgress
                variant="determinate"
                value={sprintProgress}
                size={24}
                thickness={5}
                sx={{
                  color: sprintProgress >= 70 ? '#4CAF50' : sprintProgress >= 30 ? '#FF9800' : '#F44336',
                }}
              />
              <Typography variant="body2" fontWeight="medium">
                {sprintProgress}% Complete
              </Typography>
            </Box>
          </Box>
        </Box>

        <Divider sx={{ mb: 2 }} />

        {/* Date range display */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body2" color="text.secondary">
            {formatDate(projectStart)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {formatDate(projectEnd)}
          </Typography>
        </Box>

        <Box sx={{ height: 350, position: 'relative', overflow: 'auto', pr: 1 }}>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <CircularProgress size={40} />
            </Box>
          ) : timelineData.length === 0 ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <Typography color="text.secondary">No tasks found for this sprint</Typography>
            </Box>
          ) : (
            timelineData.map((item: any) => {
              const startDate = new Date(item.start);
              const endDate = new Date(item.end);
              const taskCompletion = getTaskCompletion(item);

              const startOffset =
                (Math.ceil((startDate.getTime() - projectStart.getTime()) / (1000 * 60 * 60 * 24)) / totalDays) * 100;
              const duration =
                (Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) / totalDays) * 100;

              return (
                <Box key={item.id} sx={{ display: 'flex', alignItems: 'center', height: 48, mb: 1.5 }}>
                  <Box sx={{ width: '30%', pr: 2 }}>
                    <Tooltip title={`Assigned to: ${item.assignee || 'Unassigned'}`}>
                      <Box>
                        <Typography variant="body2" fontWeight="medium" noWrap>
                          {item.task}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" noWrap>
                          {formatDate(startDate)} - {formatDate(endDate)}
                        </Typography>
                      </Box>
                    </Tooltip>
                  </Box>
                  <Box sx={{ width: '70%', height: 28, bgcolor: 'grey.100', borderRadius: 1, position: 'relative' }}>
                    <Tooltip
                      title={
                        <>
                          <Typography variant="body2">{item.task}</Typography>
                          <Typography variant="body2">Status: {item.status || 'Not started'}</Typography>
                          <Typography variant="body2">Start: {startDate.toLocaleDateString()}</Typography>
                          <Typography variant="body2">End: {endDate.toLocaleDateString()}</Typography>
                          <Typography variant="body2">Progress: {taskCompletion}%</Typography>
                        </>
                      }
                    >
                      <Box
                        sx={{
                          position: 'absolute',
                          height: 28,
                          borderRadius: 1,
                          bgcolor: getStatusColor(item.status),
                          opacity: 0.8,
                          left: `${startOffset}%`,
                          width: `${duration}%`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          '&:hover': {
                            opacity: 1,
                            cursor: 'pointer',
                          },
                        }}
                      >
                        <Typography variant="caption" sx={{ color: 'white', fontSize: '0.7rem', fontWeight: 'bold' }}>
                          {taskCompletion}%
                        </Typography>
                      </Box>
                    </Tooltip>

                    {/* Today indicator */}
                    {today >= projectStart && today <= projectEnd && (
                      <Tooltip title={`Today: ${today.toLocaleDateString()}`}>
                        <Box
                          sx={{
                            position: 'absolute',
                            height: 28,
                            width: 2,
                            bgcolor: 'error.main',
                            left: `${((today.getTime() - projectStart.getTime()) / (1000 * 60 * 60 * 24)) / totalDays * 100}%`,
                            zIndex: 2,
                            '&::after': {
                              content: '""',
                              position: 'absolute',
                              top: -5,
                              left: -4,
                              width: 10,
                              height: 10,
                              borderRadius: '50%',
                              backgroundColor: 'error.main',
                            },
                          }}
                        />
                      </Tooltip>
                    )}
                  </Box>
                </Box>
              );
            })
          )}
        </Box>

        {/* Legend */}
        <Box sx={{ display: 'flex', gap: 2, mt: 2, justifyContent: 'center' }}>
          {['Completed', 'In Progress', 'Delayed', 'Blocked'].map((status) => (
            <Box key={status} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: getStatusColor(status) }} />
              <Typography variant="caption">{status}</Typography>
            </Box>
          ))}
        </Box>
      </Paper>
    </Box>
  );
};

export default SprintTimelineCard;
