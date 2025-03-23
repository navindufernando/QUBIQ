import { CloseOutlined, ErrorOutline } from '@mui/icons-material'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid2, IconButton, MenuItem, TextField, Typography } from '@mui/material'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { createSprint, updateSprint } from '../../../../services/SprintAPI';

interface modalProps {
  openModal: boolean;
  handleClose: () => void;
  sprintData: Sprintdata | null;
  sprintId: string | null;
  userId: string;
}

export interface Sprintdata {
  sprintName: string;
  description: string;
  goal: string;
  status: string;
  startDate: string;
  endDate: string;
  projectId: string;
}

const CreateModal: React.FC<modalProps> = ({ openModal, handleClose, sprintData, sprintId, userId }) => {

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Sprintdata>({
    sprintName: '',
    description: '',
    goal: '',
    status: 'planning',
    startDate: '',
    endDate: '',
    projectId: ''
  });

  // Handle validation for required fields
  const [errors, setErrors] = useState({
    sprintName: '',
    startDate: '',
    endDate: '',
    general: ''
  });

  // Reset form after closing
  const resetForm = () => {
    setData({
      sprintName: '',
      description: '',
      goal: '',
      status: 'planning',
      startDate: '',
      endDate: '',
      projectId: ''
    });
    setErrors({
      sprintName: '',
      startDate: '',
      endDate: '',
      general: ''
    });
  };  

  // If sprintData is passed, set the form field to the existing data for update
  useEffect(() => {
    if (sprintData) {
      setData(sprintData)
    } else { 
      resetForm();
    }
  }, [sprintData, openModal])

  // Handle input changes for the form fields
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevState: any) => ({
      ...prevState,
      [name]: value
    }));

    if (name in errors) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { 
      sprintName: '',
      startDate: '',
      endDate: '',
      general: ''
    };

    if (!data.sprintName.trim()) {
      newErrors.sprintName = 'Sprint name is required';
      isValid = false;
    }

    if (!data.startDate) {
      newErrors.startDate = 'Start date is required';
      isValid = false;
    }

    if (!data.endDate) {
      newErrors.endDate = 'End date is required';
      isValid = false;
    }

    if (data.startDate && data.endDate) {
      const startDate = new Date(data.startDate);
      const endDate = new Date(data.endDate);

      if (endDate <= startDate) {
        newErrors.endDate = 'End date must be after start date';
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleCreateOrUpdateSprint = async () => {
    if(!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {

      if (sprintId) {
        // if there is an id, update the sprint
        const response = await updateSprint(sprintId, userId, data);
        console.log('Sprint updated: ', response);
      } else {
        // else, create a new spriint
        const response = await createSprint(data, userId);
        console.log('Sprint created:', response);
      }
      handleClose();
    } catch (error: any) {
      console.log('Sprint operation failed:', error);

      if (error.response && error.response.data) {
        const backendErrors = error.response.data.error || {};

        setErrors({
          sprintName: backendErrors.sprintName || '',
          startDate: backendErrors.startDate || '',
          endDate: backendErrors.endDate || '',
          general: backendErrors.general || error.message || 'An internal error occured'
        });
      } else {
        setErrors(prev => ({
          ...prev,
          general: 'An unexpected error occured. Please try again.'
        }));
      } 
    } finally {
      setIsLoading(false);
    }
  }

  return (
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
            {sprintData ? 'Update Sprint' : 'Start New Sprint'}
          </Typography>
          <IconButton
            onClick={handleClose}
            size="small"
            aria-label='close'
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
              value={data.sprintName}
              onChange={handleInputChange}
              variant='outlined'
              slotProps={{
                input: { sx: { borderRadius: 1.5} }
              }}
              error={!!errors.sprintName}
              helperText={errors.sprintName || ''}
              required
              sx={{ marginBottom: 2 }}
            />
          </Grid2>

          <Grid2 sx={{ xs: 12 }}>
            <TextField
              label='Description'
              fullWidth
              name='description'
              multiline
              rows={3}
              value={data.description}
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
              value={data.goal}
              onChange={handleInputChange}
              variant='outlined'
              slotProps={{
                input: { sx: { borderRadius: 1.5, marginBottom: 2 } }
              }}
            />
          </Grid2>

          <Grid2 sx={{ xs: 12, md: 6 }}>
            <FormControl fullWidth error={!!errors.startDate}>
            <TextField
              label="Start Date"
              fullWidth
              name="startDate"
              value={data.startDate}
              onChange={handleInputChange}
              variant="outlined"
              type="date"
              error={!!errors.startDate}
              helperText={errors.startDate || ""}
              slotProps={{
                input: { sx: { borderRadius: 1.5 } },
                inputLabel: { shrink: true }
              }}
              sx={{ marginBottom: 2 }}
              required
            />
            </FormControl>
          </Grid2>

          <Grid2 sx={{ xs: 12, md: 6 }}>
          <FormControl fullWidth error={!!errors.endDate}>
            <TextField
              label="End Date"
              fullWidth
              name="endDate"
              value={data.endDate}
              onChange={handleInputChange}
              variant="outlined"
              type="date"
              error={!!errors.endDate}
              helperText={errors.endDate || ""}
              slotProps={{
                input: { sx: { borderRadius: 1.5 } },
                inputLabel: { shrink: true }
              }}
              sx={{ marginBottom: 2 }}
              required
            />
            </FormControl>
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
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button
          onClick={handleCreateOrUpdateSprint}
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
          disabled={isLoading}
        >
          {isLoading ? 'Saving...' : sprintData ? 'Update Sprint' : 'Create Sprint'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CreateModal
