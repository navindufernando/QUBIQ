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
const TeamSection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  
  const totalMembers = 39;
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); 
  };
  
  return (
    <Paper 
      elevation={0} 
      sx={{ 
        p: 3, 
        borderRadius: 4, 
        backgroundColor: alpha(theme.palette.primary.light, 0.5) 
      }}
    >
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 3 
      }}>
        <Box>
          <Typography variant="h6" component="span" fontWeight={600} sx={{ mr: 1 }}>
            UI Developers
          </Typography>
          <Typography variant="body1" component="span" color="text.secondary">
            ({totalMembers})
          </Typography>
        </Box>
        
        <TextField
          placeholder="Search members..."
          value={searchTerm}
          onChange={handleSearch}
          size="small"
          sx={{ width: 300 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        
        <Link href="#" underline="none" color="inherit" fontWeight={500}>
          View all
        </Link>
      </Box>
      
      <TeamMembersGrid />
      <TeamMembersGrid />
      <TeamMembersGrid />
      
      <CustomPagination 
        currentPage={currentPage} 
        totalPages={3} 
        onPageChange={setCurrentPage} 
      />
    </Paper>
  );
};
