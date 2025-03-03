import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Grid, 
  LinearProgress, 
  Chip, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel,
  SelectChangeEvent
} from '@mui/material';

interface Sprint {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  team: string;
  storyPoints: number;
  completionPercentage: number;
  tasks: number;
  bugsFound: number;
  status: 'Completed' | 'In Progress' | 'Planned';
}

const PastSprints: React.FC = () => {
  // Sample data
  const sprintData: Sprint[] = [
    {
      id: 1,
      title: 'UI Redesign Sprint',
      startDate: 'Jan 1, 2025',
      endDate: 'Jan 14, 2025',
      team: 'Frontend',
      storyPoints: 38,
      completionPercentage: 95,
      tasks: 15,
      bugsFound: 2,
      status: 'Completed'
    },
    {
      id: 2,
      title: 'Backend Optimization Sprint',
      startDate: 'Jan 15, 2025',
      endDate: 'Jan 28, 2025',
      team: 'Backend',
      storyPoints: 42,
      completionPercentage: 100,
      tasks: 12,
      bugsFound: 0,
      status: 'Completed'
    }
  ];

  const [sprintFilter, setSprintFilter] = useState<string>('All Sprints');
  const [sortOrder, setSortOrder] = useState<string>('Date');

  const handleSprintFilterChange = (event: SelectChangeEvent) => {
    setSprintFilter(event.target.value);
  };

  const handleSortOrderChange = (event: SelectChangeEvent) => {
    setSortOrder(event.target.value);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, width: '100%' }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', marginRight: 14 }}>
          Past Sprints
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2 }}>
          <FormControl sx={{ minWidth: 150 }}>
            <Select
              value={sprintFilter}
              onChange={handleSprintFilterChange}
              displayEmpty
              size="small"
            >
              <MenuItem value="All Sprints">All Sprints</MenuItem>
              <MenuItem value="Frontend">Frontend</MenuItem>
              <MenuItem value="Backend">Backend</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 150 }}>
            <Select
              value={sortOrder}
              onChange={handleSortOrderChange}
              displayEmpty
              size="small"
            >
              <MenuItem value="Date">Sort by Date</MenuItem>
              <MenuItem value="Team">Sort by Team</MenuItem>
              <MenuItem value="Story Points">Sort by Story Points</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      {sprintData.map((sprint) => (
        <Card key={sprint.id} sx={{ mb: 2, borderRadius: 2, boxShadow: 1 }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                {sprint.title}
              </Typography>
              <Chip 
                label={sprint.status} 
                color={sprint.status === 'Completed' ? 'success' : 'primary'} 
                variant="filled"
                size="small"
              />
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography variant="body2" color="text.secondary">
                {sprint.startDate} - {sprint.endDate}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Team: {sprint.team}
              </Typography>
            </Box>

            <LinearProgress 
              variant="determinate" 
              value={sprint.completionPercentage} 
              sx={{ 
                height: 10, 
                borderRadius: 5, 
                mb: 2,
                backgroundColor: '#e0e0e0',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: '#4caf50'
                }
              }} 
            />

            <Grid container spacing={2} textAlign="center">
              <Grid item xs={3}>
                <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
                  {sprint.storyPoints}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Story Points
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
                  {sprint.completionPercentage}%
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Completed
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
                  {sprint.tasks}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Tasks
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
                  {sprint.bugsFound}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Bugs Found
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default PastSprints;