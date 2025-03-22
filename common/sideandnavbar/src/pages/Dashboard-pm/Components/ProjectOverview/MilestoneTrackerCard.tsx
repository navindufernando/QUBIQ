import { Box, Card, CardContent, CardHeader, Chip, Divider, Paper, Typography } from '@mui/material'
import React, { useState } from 'react'

const MilestoneTrackerCard = () => {

    const [loading, setLoading] = useState(false);

    return (
        <Paper elevation={2}>
            <Card>
                <CardHeader
                    title={
                        <Box display='flex' alignItems='center' marginLeft='6px'>
                            Milestone Tacker
                        </Box>
                    }
                    action={
                        <Box>
                            <Chip
                                label="Completed"
                                size="small"
                                sx={{ mt: 1, mr: 2, bgcolor: 'success.light', color: 'white' }}
                            />
                            <Chip
                                label="At Risk"
                                size="small"
                                sx={{ mt: 1, mr: 2, bgcolor: 'warning.light', color: 'white' }}
                            />
                            <Chip
                                label="Delayed"
                                size="small"
                                sx={{ mt: 1, mr: 2, bgcolor: 'error.light', color: 'white' }}
                            />
                        </Box>
                    }
                />
                <Divider/>
                <CardContent>
                    { loading ? (
                        <Typography>Loading Milestones...</Typography>
                    ) : (
                        <Box sx={{ position: 'relative', pl: 4, mt: 3 }}>
                            <Box
                                sx={{
                                    position: 'absolute',
                                    top: 0,
                                    bottom: 0, 
                                    left: 10,
                                    width: 2,
                                    bgcolor: 'grey.300'
                                }}
                            />
                            
                        </Box>
                    )}
                </CardContent>
            </Card>
        </Paper>

    )
}

export default MilestoneTrackerCard
