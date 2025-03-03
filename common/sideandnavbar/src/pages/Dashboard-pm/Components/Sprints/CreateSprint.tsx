import { Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, Grid2, IconButton, MenuItem, Paper, Stack, TextField, Tooltip, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import { createSprint } from '../../../../services/SprintAPI';
import { ChangeEvent, useEffect, useState } from 'react';
import { CalendarTodayOutlined, CloseOutlined, ErrorOutline, Flag, SpeedOutlined } from '@mui/icons-material';
import PastSprints from './PastSprints';

const CreateSprint = () => {
    const [openModal, setOpenModal] = useState(false);
    const [sprintData, setSprintData] = useState({
        sprintName: '',
        description: '',
        goal: '',
        status: '',
        startDate: '',
        endDate: '',
        projectId: ''
    });
    // Handle validation for required fields
    const [errors, setErrors] = useState({
        sprintName: '',
        dates: '',
        general: ''
    });

    // Handle input changes for the form fields
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSprintData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleOpen = () => {
        setOpenModal(true);
    }

    const handleClose = () => {
        setOpenModal(false);
    }

    const handleCreateSprint = async () => {
        setErrors({
            sprintName: '',
            dates: '',
            general: ''
        });

        try {
            const response = await createSprint(sprintData);

            handleClose();
            console.log('Sprint created:', response);
        } catch (error: any) {
            if (error.response && error.response.data) {
                const backendErrors = error.response.data.error || {};

                setErrors({
                    sprintName: backendErrors.sprintName || '',
                    dates: backendErrors.dates || '',
                    general: backendErrors.general || ''
                });
            }
        }

    }

    return (
        <Box sx={{ padding: 3 }}>
            <Grid2 container spacing={3}>
                <Grid2 sx={{ xs: 12, md: 8 }}>
                    <Paper elevation={3} sx={{
                        padding: 3,
                        borderRadius: 2,
                        background: 'linear-gradient(to right, #f5f7fa, #ffffff)',
                        height: '100%'
                    }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 2 }}>
                            <Typography variant='h5' fontWeight='600'>
                                Sprint Overview
                            </Typography>
                            <Chip
                                icon={<CalendarTodayOutlined />}
                                label="March 1 - March 14, 2025"
                                variant="outlined"
                                color="primary"
                            />
                        </Box>
                        <Divider sx={{ marginBottom: 3 }} />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 2 }}>
                            <Box>
                                <Typography variant='h6'>
                                    Sprint Release Name <Chip sx={{ marginLeft: 1 }} label="Active" color="success" variant="filled" size='small' />
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 1 }}>
                                    <Typography variant="body2" color="text.secondary">
                                        Current sprint in progress
                                    </Typography>
                                </Box>
                            </Box>
                            <Tooltip title={`15 days until sprint end`}>
                                <Chip icon={<SpeedOutlined />} label={`15 days until sprint end`} color='warning' variant='filled' sx={{ fontWeight: 'bold' }} />
                            </Tooltip>
                        </Box>
                        <Box sx={{ mb: 3 }}>
                            <Typography variant="body1">
                                Sprint Goal: Complete the core functionality for the user dashboard and implement the new notification system.
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                            <Chip icon={<Flag />} label="6 tasks completed" color="info" variant="outlined" />
                            <Chip label="8 tasks in progress" color="primary" variant="outlined" />
                            <Chip label="3 tasks blocked" color="error" variant="outlined" />
                        </Box>
                    </Paper>
                </Grid2>
                
                <Grid2 sx={{ xs: 12, md: 8 }}>
                    <Paper elevation={3} sx={{
                        padding: 3,
                        borderRadius: 2,
                        background: 'linear-gradient(to right, #f5f7fa, #ffffff)',
                        height: '100%'
                    }}>
                        <PastSprints/>
                    </Paper>
                </Grid2>
                <Grid2 sx={{ xs: 12, md: 4 }}>
                    <Paper elevation={3} sx={{
                        padding: 3,
                        borderRadius: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
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

            <Dialog
                open={openModal}
                onClose={handleClose}
                maxWidth="sm"
                fullWidth
                slotProps={{
                    paper: {
                        sx: {
                            borderRadius: 2,
                            boxShadow: '0 3px 5px rgba(0,0,0,0.1)',
                            overflow: 'hidden'
                        }
                    }
                }}
            >
                <DialogTitle
                    sx={{
                        borderBottom: '1px solid',
                        borderColor: 'divider',
                        padding: 3,
                    }}
                >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant='h5' fontWeight={600}>
                            Start New Sprint
                        </Typography>
                        <IconButton
                            onClick={handleClose}
                            size="small"
                        >
                            <CloseOutlined />
                        </IconButton>
                    </Box>
                </DialogTitle>

                <DialogContent sx={{ padding: 3, marginTop: 2 }}>
                    <Grid2 spacing={3}>
                        <Grid2 sx={{ xs: 12 }}>
                            <TextField
                                label='Sprint Name'
                                fullWidth
                                margin='dense'
                                name='sprintName'
                                value={sprintData.sprintName}
                                onChange={handleInputChange}
                                variant='outlined'
                                slotProps={{
                                    input: { sx: { borderRadius: 1.5, marginBottom: 2 } }
                                }}
                                error={!!errors.sprintName}
                                helperText={errors.sprintName || ''}
                            />
                        </Grid2>

                        <Grid2 sx={{ xs: 12 }}>
                            <TextField
                                label='Description'
                                fullWidth
                                name='description'
                                multiline
                                rows={3}
                                value={sprintData.description}
                                onChange={handleInputChange}
                                variant='outlined'
                                slotProps={{
                                    input: { sx: { borderRadius: 1.5, marginBottom: 2 } }
                                }}
                            />
                        </Grid2>

                        <Grid2 sx={{ xs: 12 }}>
                            <TextField
                                label='Sprint Goal'
                                fullWidth
                                name='goal'
                                value={sprintData.goal}
                                onChange={handleInputChange}
                                variant='outlined'
                                slotProps={{
                                    input: { sx: { borderRadius: 1.5, marginBottom: 2 } }
                                }}
                            />
                        </Grid2>

                        <Grid2 sx={{ xs: 12, md: 6 }}>
                            <TextField
                                select
                                label='Status'
                                fullWidth
                                name='status'
                                value={sprintData.status}
                                onChange={handleInputChange}
                                variant='outlined'
                                slotProps={{
                                    input: { sx: { borderRadius: 1.5, marginBottom: 2 } }
                                }}
                            >
                                <MenuItem value="planning">Planning</MenuItem>
                                <MenuItem value="active">Active</MenuItem>
                                <MenuItem value="completed">Completed</MenuItem>
                            </TextField>
                        </Grid2>

                        <Grid2 sx={{ xs: 12, md: 6 }}>
                            <TextField
                                label="Start Date"
                                fullWidth
                                name="startDate"
                                value={sprintData.startDate}
                                onChange={handleInputChange}
                                variant="outlined"
                                type="date"
                                error={!!errors.dates}
                                helperText={errors.dates ? errors.dates : ""}
                                slotProps={{
                                    input: { sx: { borderRadius: 1.5, marginBottom: 2 } },
                                    inputLabel: { shrink: true }
                                }}
                            />
                        </Grid2>

                        <Grid2 sx={{ xs: 12, md: 6 }}>
                            <TextField
                                label="End Date"
                                fullWidth
                                name="endDate"
                                value={sprintData.endDate}
                                onChange={handleInputChange}
                                variant="outlined"
                                type="date"
                                error={!!errors.dates}
                                helperText={errors.dates ? errors.dates : ""}
                                slotProps={{
                                    input: { sx: { borderRadius: 1.5, marginBottom: 2 } },
                                    inputLabel: { shrink: true }
                                }}
                            />
                        </Grid2>
                    </Grid2>

                    {errors.general && (
                        <Box sx={{
                            mt: 2,
                            p: 2,
                            bgcolor: 'error.light',
                            borderRadius: 1,
                            color: 'error.dark',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1
                        }}>
                            <ErrorOutline fontSize="small" color="error" />
                            <Typography variant="body2" fontWeight={500}>
                                {errors.general}
                            </Typography>
                        </Box>
                    )}
                </DialogContent>

                <DialogActions sx={{
                    px: 3,
                    py: 2.5,
                    borderTop: '1px solid',
                    borderColor: 'divider',
                    backgroundColor: 'grey.50'
                }}>
                    <Button
                        onClick={handleClose}
                        color="inherit"
                        variant="outlined"
                        sx={{
                            borderRadius: 1.5,
                            textTransform: 'none',
                            fontWeight: 500,
                            px: 3
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleCreateSprint}
                        color="primary"
                        variant="contained"
                        sx={{
                            borderRadius: 1.5,
                            px: 3,
                            py: 1,
                            textTransform: 'none',
                            fontWeight: 600,
                            boxShadow: 2
                        }}
                    >
                        Create Sprint
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default CreateSprint;