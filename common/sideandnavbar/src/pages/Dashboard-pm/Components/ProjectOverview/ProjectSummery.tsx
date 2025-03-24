import { Box, Chip, LinearProgress, Paper, Typography } from '@mui/material'
import { getProjectById } from '../../../../services/ProjectAPI'
import { useEffect, useState } from 'react'

const ProjectSummary = ({ projectId }: { projectId: string }) => {
    const [projectData, setProjectData] = useState<{
        projectName: string;
        phase: string;
        progress: number;
    } | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const data = await getProjectById(projectId);
                console.log('Fetched project data:', data);
                setProjectData(data);
            } catch (error) {
                console.error('Failed to fetch project: ', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProject();
    }, [projectId]);

    if (loading) {
        return (
            <Paper elevation={2} sx={{ p: 4, width: '100%', textAlign: 'center' }}>
                <Typography variant="h6">Loading project data...</Typography>
            </Paper>
        )
    }

    if (!projectData) {
        return (
            <Paper elevation={2} sx={{ p: 4, width: '100%', textAlign: 'center', bgcolor: '#f9f9f9' }}>
                <Typography variant="h6" color="text.secondary">No Project data found.</Typography>
            </Paper>
        )
    }
  
    return (
        <Paper
            elevation={3}
            sx={{
                p: 4,
                mb: 4,
                width: '100%',
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                justifyContent: 'space-between',
                alignItems: { xs: 'flex-start', md: 'center'},
                gap: 3,
                borderRadius: 2,
                background: 'linear-gradient(to right, #ffffff, #f7fafc)',
                borderLeft: '5px solid',
                borderColor: 'primary.main',
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: 4
                }
            }}
        >
            <Box sx={{ flex: 1 }}>
                <Typography 
                    variant='h5' 
                    component='h1' 
                    gutterBottom
                    sx={{ 
                        fontWeight: 'bold',
                        color: 'text.primary'
                    }}
                >
                    {projectData.projectName}
                </Typography>
                <Chip
                    label={`${projectData.phase} Phase`}
                    color='primary'
                    sx={{ 
                        fontWeight: 'medium',
                        py: 0.5,
                        px: 1,
                        borderRadius: 1.5
                    }} 
                />
            </Box>
            <Box sx={{ width: { xs: '100%', md: 300 }}}>
                <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    mb: 1
                }}>
                    <Typography 
                        variant='subtitle2'
                        sx={{ fontWeight: 'medium' }}
                    >
                        Overall Progress
                    </Typography>
                    <Typography 
                        variant='subtitle2'
                        sx={{ 
                            fontWeight: 'bold',
                            color: 'primary.main'
                        }}
                    >
                        {projectData.progress}%
                    </Typography>
                </Box>
                <LinearProgress
                    variant='determinate'
                    value={projectData.progress}
                    sx={{ 
                        height: 12, 
                        borderRadius: 2, 
                        mt: 1,
                        bgcolor: 'rgba(0,0,0,0.05)',
                        '& .MuiLinearProgress-bar': {
                            borderRadius: 2,
                            backgroundImage: 'linear-gradient(to right, #3f51b5, #2196f3)'
                        }
                    }}
                />
            </Box>
        </Paper>
    )
}

export default ProjectSummary