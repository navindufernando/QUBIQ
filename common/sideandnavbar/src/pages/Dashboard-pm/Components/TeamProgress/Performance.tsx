import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  FormControl, 
  Select, 
  MenuItem,
  InputLabel,
  SelectChangeEvent
} from '@mui/material';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart,
  Line,
  TooltipProps
} from 'recharts';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';

// Interface for component props
interface PerformanceAnalyticsProps {
  projectId?: string | number;
  period?: TimeRangeOption;
}

// Type for time range options
type TimeRangeOption = 'last3Months' | 'last6Months' | 'lastYear';

// Interface for bar chart data
interface BarChartData {
  month: string;
  completed: number;
  overdue: number;
}

// Interface for line chart data
interface LineChartData {
  month: string;
  efficiency: number;
}

// Custom tooltip component for the bar chart
const CustomTooltip = ({ active, payload, label }: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ 
        backgroundColor: '#fff', 
        padding: '10px', 
        border: '1px solid #ccc',
        borderRadius: '4px'
      }}>
        <p style={{ margin: '0 0 5px', fontWeight: 'bold' }}>{`Month: ${label}`}</p>
        {payload.map((entry) => (
          <p key={`item-${entry.name}`} style={{ 
            margin: '0',
            color: entry.name === 'completed' ? '#4CAF50' : '#F44336'
          }}>
            {`${entry.name === 'completed' ? 'Completed' : 'Overdue'} Tasks : ${entry.value}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const PerformanceAnalytics: React.FC<PerformanceAnalyticsProps> = ({ projectId, period = 'lastYear' }) => {
  const [barData, setBarData] = useState<BarChartData[]>([]);
  const [lineData, setLineData] = useState<LineChartData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [timeRange, setTimeRange] = useState<TimeRangeOption>(period);
  
  useEffect(() => {
    // Simulating API call to get performance data
    setTimeout(() => {
      // Sample data for bar chart - completed vs overdue
      const barSampleData: BarChartData[] = [
        { month: 'Oct', completed: 24, overdue: 5 },
        { month: 'Nov', completed: 18, overdue: 8 },
        { month: 'Dec', completed: 15, overdue: 10 },
        { month: 'Jan', completed: 22, overdue: 7 },
        { month: 'Feb', completed: 28, overdue: 4 },
        { month: 'Mar', completed: 32, overdue: 3 }
      ];
      
      // Sample data for line chart - efficiency percentage
      const lineSampleData: LineChartData[] = [
        { month: 'Oct', efficiency: 82 },
        { month: 'Nov', efficiency: 74 },
        { month: 'Dec', efficiency: 70 },
        { month: 'Jan', efficiency: 78 },
        { month: 'Feb', efficiency: 85 },
        { month: 'Mar', efficiency: 92 }
      ];
      
      setBarData(barSampleData);
      setLineData(lineSampleData);
      setLoading(false);
    }, 1000);
  }, [projectId, timeRange]);
  
  const handleTimeRangeChange = (event: SelectChangeEvent<TimeRangeOption>): void => {
    setTimeRange(event.target.value as TimeRangeOption);
    setLoading(true);
    // In a real implementation, this would trigger a new data fetch
  };
  
  const lineChartTooltipFormatter = (value: ValueType): [string, string] => {
    return [`${value}%`, 'Efficiency'];
  };
  
  return (
    <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
      <CardContent sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            Performance Analytics
          </Typography>
          
          <Box sx={{ border: 1, borderColor: 'divider', borderRadius: 1, p: 1 }}>
            <Typography variant="caption" sx={{ display: 'block', textAlign: 'center', mb: 0.5 }}>
              Time Range
            </Typography>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <Select
                id="time-range-select"
                value={timeRange}
                displayEmpty
                variant="outlined"
                IconComponent={() => <span style={{ marginRight: '8px' }}>▼</span>}
                sx={{ 
                  '.MuiOutlinedInput-notchedOutline': { border: 'none' },
                  '& .MuiSelect-select': { p: 0, fontWeight: 'medium' }
                }}
                onChange={handleTimeRangeChange}
              >
                <MenuItem value="last3Months">Last 3 Months</MenuItem>
                <MenuItem value="last6Months">Last 6 Months</MenuItem>
                <MenuItem value="lastYear">Last Year</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {/* Bar Chart */}
          <Box>
            <Typography variant="h6" sx={{ mb: 0.5 }}>Tasks by Month</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Comparing completed vs. overdue tasks
            </Typography>
            
            {loading ? (
              <Box sx={{ display: 'flex', height: '230px', alignItems: 'center', justifyContent: 'center' }}>
                <Typography>Loading chart data...</Typography>
              </Box>
            ) : (
              <Box sx={{ height: '230px', mb: 1 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={barData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend align="center" verticalAlign="bottom" />
                    <Bar dataKey="completed" name="Completed" fill="#4CAF50" />
                    <Bar dataKey="overdue" name="Overdue" fill="#F44336" />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            )}
          </Box>
          
          {/* Line Chart */}
          <Box>
            <Typography variant="h6" sx={{ mt: 1, mb: 0.5 }}>Efficiency Trend</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Team efficiency percentage over time
            </Typography>
            
            {loading ? (
              <Box sx={{ display: 'flex', height: '230px', alignItems: 'center', justifyContent: 'center' }}>
                <Typography>Loading chart data...</Typography>
              </Box>
            ) : (
              <Box sx={{ height: '230px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={lineData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip formatter={lineChartTooltipFormatter} />
                    <Legend align="center" verticalAlign="bottom" />
                    <Line 
                      type="monotone" 
                      dataKey="efficiency" 
                      name="Efficiency" 
                      stroke="#2196F3" 
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PerformanceAnalytics;