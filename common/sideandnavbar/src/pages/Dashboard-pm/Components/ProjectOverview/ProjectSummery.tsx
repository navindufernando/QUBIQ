import { Box, Chip, LinearProgress, Paper, Typography } from '@mui/material'
import { getProjectById } from '../../../../services/ProjectAPI'
import { useEffect, useState } from 'react'

const ProjectSummery = ({ projectId }: { projectId: string }) => {
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
            <Typography>Loading project data...</Typography>
        )
    }

    if (!projectData) {
        return (
            <Typography>No Project data found.</Typography>
        )
    }
  
    return (
    <Paper
        elevation={2}
        sx={{
            p: 3,
            mb: 3,
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', md: 'center'},
            gap: 2
        }}
    >
        <Box>
            <Typography variant='h5' component='h1' gutterBottom>
                Project Name: {projectData.projectName}
            </Typography>
            <Chip
                label={`${projectData.phase} Phase`}
                color='primary'
                sx={{ fontWeight: 'medium'}} 
            />
        </Box>
        <Box sx={{ width: { xs: '100%', md: 270 }}}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between'}}>
                <Typography variant='body2'>Overall Progress</Typography>
                <Typography variant='body2'>{projectData.progress}</Typography>
            </Box>
            <LinearProgress
                variant='determinate'
                value={projectData.progress}
                sx={{ height: 10, borderRadius: 1, mt: 1 }}
            />
        </Box>
    </Paper>
  )
}

export default ProjectSummery
