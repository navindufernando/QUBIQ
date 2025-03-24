import React from 'react';
import { Box, Typography, Paper, Grid, Card, CardContent, CardHeader, Button, Divider, Chip } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PieChart, Pie, Cell } from 'recharts';

const CustomCharts = () => {
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  // Sample data for preview charts
  const sampleData = [
    { name: 'Jan', value: 400 },
    { name: 'Feb', value: 300 },
    { name: 'Mar', value: 600 },
    { name: 'Apr', value: 800 },
  ];

  const comingSoonCharts = [
    { 
      title: 'Line Charts', 
      description: 'Trend analysis and time series data visualization',
      eta: 'Q2 2025',
      preview: (
        <ResponsiveContainer width="100%" height={120}>
          <BarChart data={sampleData}>
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      )
    },
    { 
      title: 'Area Charts', 
      description: 'Visualize volume and distribution over time',
      eta: 'Q2 2025',
      preview: (
        <ResponsiveContainer width="100%" height={120}>
          <PieChart>
            <Pie 
              data={sampleData} 
              cx="50%" 
              cy="50%" 
              outerRadius={40} 
              fill="#8884d8" 
              dataKey="value"
            >
              {sampleData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      )
    },
    { 
      title: 'Scatter Plots', 
      description: 'Show correlations between different variables',
      eta: 'Q3 2025',
      preview: (
        <ResponsiveContainer width="100%" height={120}>
          <BarChart data={sampleData}>
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      )
    },
    { 
      title: 'Radar Charts', 
      description: 'Compare multiple variables in a radial format',
      eta: 'Q3 2025',
      preview: (
        <ResponsiveContainer width="100%" height={120}>
          <PieChart>
            <Pie 
              data={sampleData} 
              cx="50%" 
              cy="50%" 
              outerRadius={40} 
              fill="#8884d8" 
              dataKey="value"
            >
              {sampleData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      )
    }
  ];

  return (
    <Paper sx={{ p: 3, maxWidth: '100%' }}>
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4"  fontWeight='bold'>
            Coming Soon
          </Typography>
          <Chip label="Under Development" color="secondary" />
        </Box>
        
        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3 }}>
          We're constantly improving...
        </Typography>
        
        <Grid container spacing={2}>
          {comingSoonCharts.map((chart, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Card sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                position: 'relative',
                overflow: 'hidden',
                border: '1px solid #eaeaea',
              }}>
                <Box sx={{ position: 'absolute', top: 10, right: 10, zIndex: 10 }}>
                  <Chip 
                    label={chart.eta} 
                    size="small" 
                    color="primary" 
                    variant="outlined"
                    sx={{ fontSize: '0.7rem' }}
                  />
                </Box>
                
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom>
                    {chart.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {chart.description}
                  </Typography>
                  
                  {/* Chart preview with subtle overlay */}
                  <Box sx={{ 
                    position: 'relative', 
                    height: 120, 
                    mb: 2,
                    filter: 'grayscale(90%)',
                    opacity: 0.6,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      filter: 'grayscale(70%)',
                      opacity: 0.8,
                    }
                  }}>
                    {chart.preview}
                    <Box sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      backdropFilter: 'blur(1px)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Typography 
                        variant="overline" 
                        sx={{ 
                          backgroundColor: 'rgba(0,0,0,0.3)', 
                          color: 'white', 
                          px: 2, 
                          py: 0.5, 
                          borderRadius: 1,
                          letterSpacing: 1 
                        }}
                      >
                        Sneak Peek
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
                
                <Box sx={{ p: 2, pt: 0 }}>
                  <Button 
                    variant="outlined" 
                    disabled 
                    fullWidth
                    sx={{
                      '&.Mui-disabled': {
                        color: 'primary.main',
                        borderColor: 'primary.main',
                        opacity: 0.7
                      }
                    }}
                  >
                    Coming Soon
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
        
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
          <Chip 
            label="More chart types coming in the future..." 
            variant="outlined" 
            color="primary"
            sx={{ px: 2 }}
          />
        </Box>
      </Box>
    </Paper>
  );
};

export default CustomCharts;