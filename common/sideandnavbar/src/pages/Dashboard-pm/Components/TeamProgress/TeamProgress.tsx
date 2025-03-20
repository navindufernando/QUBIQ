import { Box, Container, Typography } from '@mui/material'
import React from 'react'
import TimelineCard from './TimelineCard'

const TeamProgress: React.FC = () => {
  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant='h4' component='h1' gutterBottom>
          Project Progress Dashboard
        </Typography>
        <TimelineCard projectId='5ce2a85b-8709-4a7c-ae43-047289314c34' sprintId='a5715266-e77d-4d48-acf0-1bf0d33eb3d2'/>
      </Box>
    </Container>
  )
}

export default TeamProgress
