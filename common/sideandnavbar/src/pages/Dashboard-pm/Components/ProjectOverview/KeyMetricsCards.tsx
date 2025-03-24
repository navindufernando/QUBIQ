import { CheckCircle, PendingActions, RunCircle, ErrorOutline } from '@mui/icons-material';
import { Box, Grid, Paper, Typography, useTheme, CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getTaskByCounts } from '../../../../services/TaskAPI';

interface TaskCountData {
    completedTasks: number;
    pendingTasks: number;
    inProgressTasks: number;
    overdueTasks: number;
}

const KeyMetricsCards = ({ projectId }: { projectId: string }) => {
    const theme = useTheme();
    const [taskCountData, setTaskCountData] = useState<TaskCountData | null>(null);
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
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!taskCountData) {
        return (
            <Paper 
                elevation={2} 
                sx={{ 
                    p: 3, 
                    textAlign: 'center', 
                    backgroundColor: theme.palette.grey[50],
                    borderRadius: 2
                }}
            >
                <Typography variant="h6" color="text.secondary">No project data found.</Typography>
            </Paper>
        );
    }

    const metrics = [
        {
            label: 'Completed',
            value: taskCountData.completedTasks,
            icon: CheckCircle,
            color: theme.palette.success.main,
            backgroundColor: theme.palette.success.light + '20' // 20 is for opacity
        },
        {
            label: 'In Progress',
            value: taskCountData.inProgressTasks,
            icon: RunCircle,
            color: theme.palette.info.main,
            backgroundColor: theme.palette.info.light + '20'
        },
        {
            label: 'Pending',
            value: taskCountData.pendingTasks,
            icon: PendingActions,
            color: theme.palette.warning.main,
            backgroundColor: theme.palette.warning.light + '20'
        },
        {
            label: 'Overdue',
            value: taskCountData.overdueTasks,
            icon: ErrorOutline,
            color: theme.palette.error.main,
            backgroundColor: theme.palette.error.light + '20'
        }
    ];

    return (
        <Box sx={{ width: '100%', mb: 4 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 500 }}>Project Task Overview</Typography>
            <Grid container spacing={3}>
                {metrics.map((metric, index) => {
                    const Icon = metric.icon;
                    return (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <Paper 
                                elevation={1} 
                                sx={{ 
                                    p: 3, 
                                    height: '100%', 
                                    borderRadius: 2,
                                    transition: 'transform 0.2s, box-shadow 0.2s',
                                    '&:hover': {
                                        transform: 'translateY(-4px)',
                                        boxShadow: theme.shadows[4]
                                    },
                                    backgroundColor: metric.backgroundColor
                                }}
                            >
                                <Box sx={{ 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'space-between',
                                    mb: 1 
                                }}>
                                    <Typography 
                                        variant="h5" 
                                        component="div" 
                                        sx={{ 
                                            fontWeight: 'bold',
                                            color: theme.palette.text.primary 
                                        }}
                                    >
                                        {metric.value}
                                    </Typography>
                                    <Box 
                                        sx={{ 
                                            backgroundColor: metric.color + '30', 
                                            p: 1.2, 
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        <Icon sx={{ fontSize: 24, color: metric.color }} />
                                    </Box>
                                </Box>
                                <Typography 
                                    variant="subtitle1" 
                                    sx={{ 
                                        color: theme.palette.text.secondary,
                                        fontWeight: 500
                                    }}
                                >
                                    {`Tasks ${metric.label}`}
                                </Typography>
                            </Paper>
                        </Grid>
                    );
                })}
            </Grid>
        </Box>
    );
};

export default KeyMetricsCards;