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
const HeroSection: React.FC = () => {
  return (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      py: 3 
    }}>
      <Box sx={{ width: '50%' }}>
        <Typography variant="h2" component="h1" fontWeight="bold" lineHeight={1.2}>
          Bring your teams together & get more done.
        </Typography>
      </Box>
      
      <Box sx={{ position: 'relative', width: '45%', height: 300 }}>
        {/* Dashboard screenshots */}
        <Paper 
          sx={{ 
            position: 'absolute', 
            width: '90%',
            top: 0,
            right: 0,
            zIndex: 3,
            borderRadius: 3,
            overflow: 'hidden',
            boxShadow: 3
          }}
        >
          <img src="src/images/dashboard2.png" alt="Dashboard" width="100%" />
        </Paper>
        
        <Paper 
          sx={{ 
            position: 'absolute', 
            width: '70%',
            top: '30%',
            right: '10%',
            zIndex: 2,
            borderRadius: 3,
            overflow: 'hidden',
            boxShadow: 3
          }}
        >
          <img src="/api/placeholder/300/150" alt="Dashboard" width="100%" />
        </Paper>
        
        <Paper 
          sx={{ 
            position: 'absolute', 
            width: '50%',
            top: '60%',
            right: '20%',
            zIndex: 1,
            borderRadius: 3,
            overflow: 'hidden',
            boxShadow: 3
          }}
        >
          <img src="/api/placeholder/200/100" alt="Dashboard" width="100%" />
        </Paper>
        
        {/* Profile bubbles */}
        <Box sx={{ position: 'absolute', width: '100%', height: '100%' }}>
          <Avatar 
            src="/api/placeholder/40/40" 
            sx={{ 
              position: 'absolute', 
              width: 40, 
              height: 40, 
              top: '20%', 
              left: 0,
              boxShadow: 1
            }} 
          />
          <Avatar 
            src="/api/placeholder/40/40" 
            sx={{ 
              position: 'absolute', 
              width: 40, 
              height: 40, 
              top: '10%', 
              right: '10%',
              boxShadow: 1
            }} 
          />
          <Avatar 
            src="/api/placeholder/40/40" 
            sx={{ 
              position: 'absolute', 
              width: 40, 
              height: 40, 
              top: '50%', 
              right: 0,
              boxShadow: 1
            }} 
          />
          <Avatar 
            src="/api/placeholder/40/40" 
            sx={{ 
              position: 'absolute', 
              width: 40, 
              height: 40, 
              bottom: '20%', 
              right: '15%',
              boxShadow: 1
            }} 
          />
          <Avatar 
            src="/api/placeholder/40/40" 
            sx={{ 
              position: 'absolute', 
              width: 40, 
              height: 40, 
              bottom: '10%', 
              left: '30%',
              boxShadow: 1
            }} 
          />
        </Box>
      </Box>
    </Box>
  );
};
const TeamDashboard: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
        <Container maxWidth="lg" sx={{ py: 3 }}>
          <Stack spacing={4}>
            <HeroSection />
            <TeamSection />
          </Stack>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default TeamDashboard;