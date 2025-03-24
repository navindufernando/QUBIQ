import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Card,
  CardContent
} from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

// Define interfaces for our data
interface Task {
  id: number;
  name: string;
  assignee: string;
  status: TaskStatus;
  dueDate: string;
  avatarUrl: string;
}

// Using string literal types for task statuses
type TaskStatus = 'Completed' | 'In Progress' | 'Delayed' | 'Blocked';

// Interface for the component props
interface TaskCompletionStatusProps {
  projectId?: string | number;
  sprintId?: string | number;
}

// Interface for chart data
interface ChartData {
  name: string;
  value: number;
}

const TaskCompletionStatus: React.FC<TaskCompletionStatusProps> = ({ projectId, sprintId }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  // Sample data - replace with actual API call
  useEffect(() => {
    // Simulating API call
    setTimeout(() => {
      setTasks([
        { id: 1, name: 'Design UI mockups', assignee: 'Alice Johnson', status: 'Completed', dueDate: '2025-03-20', avatarUrl: '/api/placeholder/32/32' },
        { id: 2, name: 'Implement login screen', assignee: 'Bob Smith', status: 'In Progress', dueDate: '2025-03-25', avatarUrl: '/api/placeholder/32/32' },
        { id: 3, name: 'Fix navigation bug', assignee: 'Charlie Davis', status: 'Delayed', dueDate: '2025-03-15', avatarUrl: '/api/placeholder/32/32' },
        { id: 4, name: 'Add database schema', assignee: 'Dana White', status: 'Blocked', dueDate: '2025-03-18', avatarUrl: '/api/placeholder/32/32' },
        { id: 5, name: 'Write unit tests', assignee: 'Evan Green', status: 'Completed', dueDate: '2025-03-22', avatarUrl: '/api/placeholder/32/32' },
      ]);
      setLoading(false);
    }, 1000);
  }, [projectId, sprintId]);
  
  const getPieChartData = (): ChartData[] => {
    const statuses: TaskStatus[] = ['Completed', 'In Progress', 'Delayed', 'Blocked'];
    const counts: Record<TaskStatus, number> = {
      'Completed': 0,
      'In Progress': 0,
      'Delayed': 0,
      'Blocked': 0
    };
    
    statuses.forEach(status => {
      counts[status] = tasks.filter(task => task.status === status).length;
    });
    
    return statuses.map(status => ({
      name: status,
      value: counts[status]
    }));
  };
  
  const getStatusColor = (status: TaskStatus): string => {
    switch(status) {
      case 'Completed': return '#4CAF50';
      case 'In Progress': return '#2196F3';
      case 'Delayed': return '#FF9800';
      case 'Blocked': return '#F44336';
      default: return '#9E9E9E';
    }
  };
  
  return (
    <Card sx={{ mb: 4, borderRadius: 2, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
          Task Completion Status
        </Typography>
        
        <Box sx={{ width: '100%', height: 400 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Status Breakdown</Typography>
          {loading ? (
            <Box sx={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
              <Typography>Loading chart data...</Typography>
            </Box>
          ) : (
            <ResponsiveContainer width="100%" height="90%">
              <PieChart>
                <Pie
                  data={getPieChartData()}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }: { name: string; percent: number }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {getPieChartData().map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getStatusColor(entry.name as TaskStatus)} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => [`${value} tasks`, 'Count']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default TaskCompletionStatus;