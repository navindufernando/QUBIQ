import { Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid2, Paper, Stack, TextField, Tooltip, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import { createSprint } from '../../../../services/SprintAPI';
import { ChangeEvent, useEffect, useState } from 'react';
import { CalendarTodayOutlined, Flag, SpeedOutlined } from '@mui/icons-material';

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
    <Box sx={{padding: 3 }}>
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
                            icon={<CalendarTodayOutlined/>} 
                            label="March 1 - March 14, 2025" 
                            variant="outlined" 
                            color="primary"
                        />
                    </Box>
                    <Divider sx={{ marginBottom: 3 }}/>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 2 }}>
                        <Box>
                            <Typography variant='h6'>
                                Sprint Release Name <Chip sx={{ marginLeft: 1 }} label="Active" color="success" variant="filled" size='small'/>
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 1 }}>
                                <Typography variant="body2" color="text.secondary">
                                    Current sprint in progress
                                </Typography>
                            </Box>
                        </Box>
                        <Tooltip title={`15 days until sprint end`}>
                            <Chip icon={<SpeedOutlined/>} label={`15 days until sprint end`} color='warning' variant='filled' sx={{ fontWeight: 'bold'}}/>
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
        </Grid2>
      
      <Dialog open={openModal} onClose={handleClose}>
        <DialogTitle>Create Sprint</DialogTitle>
        <DialogContent>
        <TextField
            autoFocus
            margin='dense'
            label='Sprint Name'
            fullWidth
            name='sprintName'
            value={sprintData.sprintName}
            onChange={handleInputChange}
            variant='outlined'
            sx={{ marginBottom: 2 }}
            error={!!errors.sprintName}
            helperText={errors.sprintName || ''}
          />
          <TextField
            margin='dense'
            label='Description'
            fullWidth
            name='description'
            value={sprintData.description}
            onChange={handleInputChange}
            variant='outlined'
            sx={{ marginBottom: 2 }}
          />
          <TextField
            margin='dense'
            label='Goal'
            fullWidth
            name='goal'
            value={sprintData.goal}
            onChange={handleInputChange}
            variant='outlined'
            sx={{ marginBottom: 2 }}
          />
          <TextField
            margin='dense'
            label='Status'
            fullWidth
            name='status'
            value={sprintData.status}
            onChange={handleInputChange}
            variant='outlined'
            sx={{ marginBottom: 2 }}
          />
          <TextField
            margin='dense'
            label='Start Date'
            fullWidth
            name='startDate'
            value={sprintData.startDate}
            onChange={handleInputChange}
            variant='outlined'
            sx={{ marginBottom: 2 }}
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            error={!!errors.dates}
            helperText={errors.dates || ''}
          />
          <TextField
            margin='dense'
            label='End Date'
            fullWidth
            name='endDate'
            value={sprintData.endDate}
            onChange={handleInputChange}
            variant='outlined'
            sx={{ marginBottom: 2 }}
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            error={!!errors.dates}
            helperText={errors.dates || ''}
          />
        </DialogContent>
        {errors.general && (
          <Typography color="error" sx={{ padding: 2 }}>
            {errors.general}
          </Typography>
        )}
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleCreateSprint} color='primary'>
            Create
          </Button>
        </DialogActions>
      </Dialog>
      
      <Paper elevation={2} sx={{padding: 10}}>
      <Button variant="contained" size='small' sx={{ marginLeft: 46 }} startIcon={<AddIcon />} onClick={handleOpen}>
            Create Sprint
          </Button>
      </Paper>
    </Box>
  )
}

export default CreateSprint