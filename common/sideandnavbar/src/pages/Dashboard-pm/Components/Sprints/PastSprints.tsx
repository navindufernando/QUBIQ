import React, { useEffect, useState } from 'react'
import { getAllSprints } from '../../../../services/SprintAPI';
import { Box, Card, CardActionArea, CardContent, Chip, FormControl, Grid2, IconButton, InputLabel, LinearProgress, MenuItem, Pagination, Select, Skeleton, Tooltip, Typography } from '@mui/material';
import { AssessmentOutlined, Refresh } from '@mui/icons-material';
import { useAuth } from '../../../Signup&Login/AuthContext';

// Enhanced sprint interface to include all required fields
interface Sprints {
  id: string;
  sprintName: string;
  description: string;
  goal: string;
  status: 'Completed' | 'In Progress' | 'Planned';
  startDate: string;
  endDate: string;
  projectId: string;
}

const PastSprints: React.FC = () => {
  const [sprints, setSprints] = useState<Sprints[]>([]);
  const [filsteredSprints, setFilteredSprints] = useState<Sprints[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState<string>('DateDesc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [error, setError] = useState<string | null>(null);
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    fetchSprints();
  }, []);

  const fetchSprints = async () => {
    try {
      console.log("user: ", user?.firstName)
      if (!isAuthenticated || !user) {
        setError('You must be logged in to view sprints');
        return;
      }
      setLoading(true);
      setError(null);
      const data = await getAllSprints(user.id);
      
      // Filter to show only the completed sprints
      const completedSprints = data.filter((sprint: Sprints) => sprint.status === 'Completed');
      setSprints(completedSprints);
      setFilteredSprints(completedSprints);

    } catch (error) {
      console.error('Failed to fetch sprints:', error);
      setError('Failed to load sprints. Please try again later.');
    } finally {
      setLoading(false);
    }
  }

  // Apply sorting and filtering
  useEffect(() => {
    let sorted = [...sprints];

    // Apply sorting
    switch (sortOrder) {
      case 'DateAsc':
        sorted.sort((a,b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime());
        break;
      case 'DateDesc':
        sorted.sort((a,b) => new Date(b.endDate).getTime() - new Date(a.endDate).getTime());
        break;
      case 'NameAsc':
        sorted.sort((a,b) => a.sprintName.localeCompare(b.sprintName));
        break;
        case 'NameDesc':
          sorted.sort((a,b) => b.sprintName.localeCompare(a.sprintName));
          break;
      default:
        break;
    }

    setFilteredSprints(sorted);
    setCurrentPage(1);
  }, [sortOrder, sprints]);

  // Get current sprints for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSprints = filsteredSprints.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filsteredSprints.length / itemsPerPage);

  // Handle page change
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  // Format date to be more readable
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', flexDirection: {xs: 'column', md: 'row'}, justifyContent: 'space-between', alignItems: { xs: 'stretch', md: 'center' }, mb: 3, width: '100%', gap: 2 }}>
        <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
          Past Sptrints
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, width: { xs: '100%', md: 'auto' } }}>
          <FormControl sx={{ minWidth: {xs: '100%', sm: '200px'}}} size='small'>
            <InputLabel id='sort-order-label'>Sort By</InputLabel>
            <Select
              labelId='sort-order-label'
              id='sort-order'
              value={sortOrder}
              label='Sort By'
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <MenuItem value='DateAsc'>Date (Oldest)</MenuItem>
              <MenuItem value='DateDesc'>Date (Newest)</MenuItem>
              <MenuItem value='NameAsc'>Name (A-Z)</MenuItem>
              <MenuItem value='NameDesc'>Name (Z-A)</MenuItem>
            </Select>
          </FormControl>

          <Tooltip title='Refresh'>
            <IconButton onClick={fetchSprints} color='primary' sx={{display: {xs: 'none', sm: 'inline-flex'}}}>
              <Refresh/>
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* display error if occured */}
      {error && (
        <Box sx={{ bgcolor: 'error.lighter', p: 2, borderRadius: 1, mb: 2 }}>
          <Typography color='error'>{error}</Typography>
        </Box>
      )}
      
      {/* loading state */}
      {loading ? (
        Array.from(new Array(3)).map((_, index) => (
          <Card key={index} sx={{ mb: 2, borderRadius: 2, boxShadow: 1 }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Skeleton variant="text" width="60%" height={40} />
                <Skeleton variant="rounded" width="15%" height={28} />
              </Box>
              <Skeleton variant="text" width="40%" />
              <Skeleton variant="rectangular" height={20} sx={{ my: 2 }} />
              <Grid2 container spacing={2}>
                {Array.from(new Array(4)).map((_, idx) => (
                  <Grid2 sx={{ xs: 6, sm: 3}}key={idx}>
                    <Skeleton variant="text" height={30} />
                    <Skeleton variant="text" width="60%" />
                  </Grid2>
                ))}
              </Grid2>
            </CardContent>
          </Card> 
        ))
      ) : filsteredSprints.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 6, bgcolor: 'lightskyblue', borderRadius: 2 }}>
          <AssessmentOutlined sx={{ fontSize: 60, mb: 2}}/>
          <Typography variant='h6'>
            No completed sprints found
          </Typography>
          <Typography variant='body2' sx={{ mt: 2 }}>
            Completed sprints will appear here
          </Typography>
        </Box>
      ) : (
        // Sptrint cards
        <>
          {currentSprints.map((sprint) => (
            <Card key={sprint.id} sx={{ mb: 2, borderRadius: 2, boxShadow: 1, '&:hover': { boxShadow: 3, transition: 'box-shadow 0.3s' } }}>
              <CardActionArea>
                <CardContent>
                  {/* Sprint header */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant='h6' sx={{ fontWeight: 'bold' }}>{sprint.sprintName}</Typography>
                    <Chip 
                      label={sprint.status} 
                      color={sprint.status === 'Completed' ? 'success' : 'primary'} 
                      variant="filled"
                      size="small"
                      sx={{ fontWeight: 'medium', marginLeft: 15 }}
                    />
                  </Box>

                  {/* Sprint dates */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant='body2' color='text.secondary'>
                      {formatDate(sprint.startDate)} - {formatDate(sprint.endDate)}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography variant='body2' color='text.secondary'>
                      {sprint.description}
                    </Typography>
                  </Box>

                  {/* Completion progress bar */}
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <LinearProgress
                      variant='determinate'
                      value={90}
                      sx={{ 
                        height: 10, 
                        borderRadius: 5, 
                        width: '100%',
                        mr: 2,
                        backgroundColor: '#e0e0e0',
                        '& .MuiLinearProgress-bar': {backgroundColor: '#4caf50'}
                        }
                      }
                    />
                    <Typography variant="body2" fontWeight="bold" width="50px" textAlign="right">
                      %
                    </Typography>
                  </Box>

                  {/* Sprint Metrics */}
                  <Grid2 container spacing={16} textAlign='center'>
                    <Grid2 sx={{ xs: 6, sm: 3 }}>
                      <Typography variant='body1' color='info' sx={{ fontWeight: 'bold' }}>
                        90%
                      </Typography>
                      <Typography variant='body2'>
                        Completed
                      </Typography>
                    </Grid2>
                    <Grid2 sx={{ xs: 6, sm: 3 }}>
                      <Typography variant='body1' color='warning' sx={{ fontWeight: 'bold' }}>
                        24
                      </Typography>
                      <Typography variant='body2'>
                        Tasks
                      </Typography>
                    </Grid2>
                    <Grid2 sx={{ xs: 6, sm: 3 }}>
                      <Typography variant='body1' color='error' sx={{ fontWeight: 'bold' }}>
                        12
                      </Typography>
                      <Typography variant='body2'>
                        Bugs Found
                      </Typography>
                    </Grid2>
                  </Grid2>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
          {/* Pagination */}
          {filsteredSprints.length > itemsPerPage && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
              <Pagination 
                count={totalPages} 
                page={currentPage} 
                onChange={handlePageChange} 
                color="primary" 
                size="large"
              />
            </Box>
          )}
        </>
      )}
    </Box>
  )
}

export default PastSprints
