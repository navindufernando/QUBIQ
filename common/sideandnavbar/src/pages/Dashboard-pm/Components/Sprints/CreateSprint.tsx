import { Box, Button, Chip, Divider, Grid2, IconButton, Paper, Tooltip, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import { getActiveSprint, getSprintById, updateSprint } from '../../../../services/SprintAPI';
import { useCallback, useEffect, useState } from 'react';
import { CalendarTodayOutlined, Flag, SpeedOutlined, EditNote, CheckCircle, Warning } from '@mui/icons-material';
import PastSprints from './PastSprints';
import CreateModal from './CreateModal';
import { Sprintdata } from './CreateModal';

const CreateSprint: React.FC = () => {
    const [openModal, setOpenModal] = useState(false);

    const handleOpen = useCallback(() => {
        setOpenModal(true);
    }, [])

    const handleClose = useCallback(() => {
        setOpenModal(false);
    }, [])

    const [sprintData, setSprintData] = useState<{
        id: string;
        sprintName: string;
        description: string;
        status: string;
        goal: string;
        startDate: string;
        endDate: string;
        projectId: string;
    } | null>(null);;

    const [loading, setLoading] = useState(false);
    const [daysRemaining, setDaysRemaining] = useState<number | null>(null);
    const [sprintToUpdate, setSprintToUpdate] = useState<Sprintdata | null>(null);
    const [sprintDateRange, setSprintDateRange] = useState('');

    // Function to open the modal in update mode
    const handleOpenUpdateModal = async (sprintId: string) => {
        try {
            const sprintDetails = await getSprintById(sprintId);
            setSprintToUpdate(sprintDetails);
            setOpenModal(true);
        } catch (error) {
            console.error('Error fetching sprint details: ', error)
        }
    }

    // Fetch the active sprint details
    useEffect(() => {
        const fetchSprint = async () => {
            try {
                setLoading(true);

                const data = await getActiveSprint();
                console.log('Fetched sprint data: ', data);

                if (data) {
                    setSprintData(data);

                    // Calculate days remaining in the active sprint
                    if (data.endDate) {
                        const endDate = new Date(data.endDate);
                        const currentDate = new Date();
                        const timeDifference = endDate.getTime() - currentDate.getTime();
                        const days = Math.ceil(timeDifference / (1000 * 3600 * 24));
                        setDaysRemaining(days);

                        const startDate = new Date(data.startDate);
                        setSprintDateRange(
                            `${startDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} - ${endDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}`
                        );
                    }
                } else {
                    setSprintData(null);
                }

            } catch (error) {
                console.error('Failed to fetch project: ', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSprint();
    }, []);

    return (
        <Box sx={{ padding: 3, width: '100%' }}>
            <Grid2 container spacing={3}>
                <Grid2 sx={{ xs: 12, md: 12, width: '100%', display: 'flex', flexGrow: 1 }}>
                    <Paper elevation={3} sx={{
                        padding: 3,
                        borderRadius: 2,
                        background: 'linear-gradient(to right, #f5f7fa, #ffffff)',
                        height: '100%',
                        width: '100%'
                    }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 2 }}>
                            <Typography variant='h5' fontWeight='600'>
                                Sprint Overview
                            </Typography>
                            <Chip
                                sx={{ marginLeft: 'auto', marginRight: 1 }}
                                label='Active'
                                color='primary'
                                variant='filled'
                            />
                            {sprintData && (
                                <Chip
                                    icon={<CalendarTodayOutlined fontSize='small' />}
                                    label={sprintDateRange}
                                    variant="outlined"
                                    color="info"
                                />
                            )}
                        </Box>
                        <Divider sx={{ marginBottom: 3 }} />

                        {loading ? (
                            <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                                <Typography>Loading sprint data...</Typography>
                            </Box>
                        ) : sprintData ? (
                            <>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 2 }}>
                                    <Box>
                                        <Typography variant='h6'>
                                            {sprintData.sprintName}
                                        </Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 1 }}>
                                            <Typography variant="body2" color="text.secondary">
                                                Current sprint in progress
                                            </Typography>
                                        </Box>
                                    </Box>

                                    {daysRemaining !== null && sprintData.status === 'Ongoing' && (
                                        <Tooltip title={`${daysRemaining} days until sprint end`}>
                                            <Chip icon={<SpeedOutlined />} label={`${daysRemaining} days until sprint end`} color='warning' variant='filled' sx={{ fontWeight: 'bold' }} />
                                        </Tooltip>
                                    )}

                                </Box>

                                <Box sx={{ mb: 3 }}>
                                    <Typography variant="body1" sx={{ mb: 1 }}>
                                        <strong>Sprint Goal:</strong> {sprintData.goal}
                                    </Typography>
                                    {sprintData.description && (
                                        <Typography variant="body2" color="text.secondary">
                                            {sprintData.description}
                                        </Typography>
                                    )}
                                </Box>

                                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                                    <Chip
                                        icon={<CheckCircle />}
                                        label={`12 tasks completed`}
                                        color="success"
                                        variant="outlined"
                                    />
                                    <Chip
                                        label={`20 tasks in progress`}
                                        color="primary"
                                        variant="outlined"
                                    />
                                    <Chip
                                        icon={<Warning />}
                                        label={`2 tasks blocked`}
                                        color="error"
                                        variant="outlined"
                                    />
                                    {sprintData.status === 'Ongoing' && (
                                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginLeft: 7 }}>
                                            <IconButton
                                                size='medium'
                                                color='primary'
                                                sx={{ backgroundColor: 'lightblue'}}
                                                onClick={() => handleOpenUpdateModal(sprintData.id)}
                                            >
                                                <EditNote />
                                            </IconButton>
                                        </Box>
                                    )}
                                </Box>

                            </>
                        ) : (
                            <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                                <Typography>No active sprint found. Create a new sprint to get started.</Typography>
                            </Box>
                        )}
                    </Paper>
                </Grid2>

                <Grid2 sx={{ xs: 12, md: 12, width: '100%', display: 'flex', flexGrow: 1 }}>
                    <Paper elevation={3} sx={{
                        padding: 3,
                        borderRadius: 2,
                        background: 'linear-gradient(to right, #f5f7fa, #ffffff)',
                        height: '100%',
                        width: '100%'
                    }}>
                        <PastSprints />
                    </Paper>
                </Grid2>
                <Grid2 sx={{ xs: 12, md: 12, width: '100%', display: 'flex', flexGrow: 1 }}>
                    <Paper elevation={3} sx={{
                        padding: 3,
                        borderRadius: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                        width: '100%',
                        background: 'linear-gradient(to bottom right, #f0f4f8, #d1e3fa)'
                    }}>
                        <Typography variant='h6' align='center' gutterBottom>
                            Ready to start a new sprint?
                        </Typography>
                        <Typography variant="body2" align="center" color="text.secondary" sx={{ mb: 3 }}>
                            Create a new sprint to organize your team's work and track progress.
                        </Typography>
                        <Button
                            variant="contained"
                            size="large"
                            startIcon={<AddIcon />}
                            onClick={handleOpen}
                            sx={{
                                py: 1.5,
                                px: 3,
                                borderRadius: 2,
                                boxShadow: 3,
                                textTransform: 'none'
                            }}>
                            Create New Sprint
                        </Button>
                    </Paper>
                </Grid2>
            </Grid2>

            <CreateModal
                openModal={openModal}
                handleClose={handleClose}
                sprintData={sprintToUpdate}
                sprintId={sprintData?.id || null}
            />
        </Box>
    );
};

export default CreateSprint;