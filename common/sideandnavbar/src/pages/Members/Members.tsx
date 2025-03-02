import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Grid, 
  Avatar, 
  Paper, 
  Stack, 
  Container,
  InputAdornment,
  Pagination,
  Link,
  useTheme,
  ThemeProvider,
  createTheme,
  alpha
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const theme = createTheme({
  palette: {
    primary: {
      main: '#9f86ff',
      light: '#c8b6ff',
    },
    background: {
      default: '#ffffff',
    },
    text: {
      primary: '#222',
    },
  },
  typography: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
});

interface TeamMemberType {
  id: number;
  imageUrl: string;
  name: string;
}
const TeamMember: React.FC<{ member: TeamMemberType }> = ({ member }) => {
  return (
    <Box>
      <Avatar 
        src={member.imageUrl} 
        alt={member.name} 
        sx={{ width: 50, height: 50 }}
      />
    </Box>
  );
};

const TeamMembersGrid: React.FC = () => {
  const members: TeamMemberType[] = Array.from({ length: 8 }, (_, index) => ({
    id: index,
    imageUrl: '/api/placeholder/50/50',
    name: `Team Member ${index + 1}`
  }));
  
  return (
    <Grid container spacing={2} sx={{ mb: 2 }}>
      {members.map(member => (
        <Grid item xs={1.5} key={member.id} sx={{ display: 'flex', justifyContent: 'center' }}>
          <TeamMember member={member} />
        </Grid>
      ))}
    </Grid>
  );
};

const CustomPagination: React.FC<{
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}> = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
      <Pagination 
        count={totalPages} 
        page={currentPage} 
        onChange={(_, page) => onPageChange(page)}
        color="primary"
        shape="rounded"
      />
    </Box>
  );
};
