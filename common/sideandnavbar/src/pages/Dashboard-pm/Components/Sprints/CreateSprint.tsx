import { Button, Chip, Divider, Paper, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import React from 'react'

const CreateSprint = () => {
  return (
    <div>
      <Paper elevation={2} sx={{ padding: 3 }}>
        <Typography variant='h6' gutterBottom>
          Sprint Overview
          <Button variant="contained" size='small' sx={{ marginLeft: 46 }} startIcon={<AddIcon />}>
            Create Sprint
          </Button>
        </Typography>
        <Divider />
        <Typography variant='h6' sx={{ marginTop: 2 }}>
          Sprint Release Name <Chip sx={{ marginLeft: 1 }} label="Active" color="primary" variant="outlined" size='small' />
        </Typography>
        <Typography variant='caption' sx={{ marginTop: 1 }}>
          March 1, 2025 - March 14, 2025
        </Typography>
        <Chip label="15 days remaining" color="warning" variant="filled" sx={{ alignSelf: 'flex-start' }} />
      </Paper>
    </div>
  )
}

export default CreateSprint
