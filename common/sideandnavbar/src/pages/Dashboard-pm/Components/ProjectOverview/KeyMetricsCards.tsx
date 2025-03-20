import { CheckCircle, Height } from '@mui/icons-material'
import { Box, Grid2, Paper, Typography, useTheme } from '@mui/material'
import React from 'react'

const KeyMetricsCards = () => {
    const theme = useTheme();

  return (
    <><Grid2 container spacing={3} sx={{ mb: 3 }}>
          <Grid2 sx={{ xs: 12, sm: 6, md: 3 }}>
              <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
                  <Box sx={{ textAlign: 'center' }}>
                      <CheckCircle sx={{ fontSize: 40, color: theme.palette.success.main, mb: 1 }} />
                      <Typography variant='h4' component='div' sx={{ fontWeight: 'bold' }}>
                          12
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
                          20
                      </Typography>
                      <Typography variant='body2' color='text.secondary'>
                          Tasks In Progress
                      </Typography>
                  </Box>
              </Paper>
          </Grid2>

      </Grid2><Grid2 container spacing={3} sx={{ mb: 3 }}>
              <Grid2 sx={{ xs: 12, sm: 6, md: 3 }}>
                  <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
                      <Box sx={{ textAlign: 'center' }}>
                          <CheckCircle sx={{ fontSize: 40, color: theme.palette.error.main, mb: 1 }} />
                          <Typography variant='h4' component='div' sx={{ fontWeight: 'bold' }}>
                              3
                          </Typography>
                          <Typography variant='body2' color='text.secondary'>
                              Tasks Overdue
                          </Typography>
                      </Box>
                  </Paper>
              </Grid2>
              <Grid2 sx={{ xs: 12, sm: 6, md: 3 }}>
                  <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
                      <Box sx={{ textAlign: 'center' }}>
                          <CheckCircle sx={{ fontSize: 40, color: theme.palette.primary.main, mb: 1 }} />
                          <Typography variant='h4' component='div' sx={{ fontWeight: 'bold' }}>
                              12
                          </Typography>
                          <Typography variant='body2' color='text.secondary'>
                              Team Members Active
                          </Typography>
                      </Box>
                  </Paper>
              </Grid2>
          </Grid2></>
    
  )
}

export default KeyMetricsCards
