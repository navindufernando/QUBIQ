import React from 'react';
import { 
  Paper, 
  Typography, 
  Box, 
  Divider, 
  Chip, 
  Avatar, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText,
  ListItemSecondaryAction,
  Tooltip,
  Theme,
  useTheme
} from '@mui/material';
import { 
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Warning as WarningIcon,
  HourglassEmpty as HourglassEmptyIcon,
  ArrowForward as ArrowForwardIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

// Define milestone status type
type MilestoneStatus = 'completed' | 'inProgress' | 'atRisk' | 'delayed' | 'upcoming';

// Define milestone interface
interface Milestone {
  id: number;
  name: string;
  description?: string;
  deadline: string;
  status: MilestoneStatus;
  owner?: string;
}

// Props interface for the component
interface MilestoneTrackerProps {
  title?: string;
  milestones: Milestone[];
}

// Custom styled components
const MilestoneConnector = styled('div')(({ theme }) => ({
  position: 'absolute',
  left: 35,
  width: 2,
  height: '100%',
  backgroundColor: theme.palette.divider,
  zIndex: 0
}));

// Helper function to get status icon and color
const getStatusDetails = (status: MilestoneStatus, theme: Theme) => {
  switch (status) {
    case 'completed':
      return {
        icon: <CheckCircleIcon />,
        color: theme.palette.success.main,
        label: 'Completed'
      };
    case 'inProgress':
      return {
        icon: <HourglassEmptyIcon />,
        color: theme.palette.info.main,
        label: 'In Progress'
      };
    case 'atRisk':
      return {
        icon: <WarningIcon />,
        color: theme.palette.warning.main,
        label: 'At Risk'
      };
    case 'delayed':
      return {
        icon: <ErrorIcon />,
        color: theme.palette.error.main,
        label: 'Delayed'
      };
    case 'upcoming':
      return {
        icon: <ArrowForwardIcon />,
        color: theme.palette.text.secondary,
        label: 'Upcoming'
      };
    default:
      return {
        icon: <ArrowForwardIcon />,
        color: theme.palette.text.secondary,
        label: 'Upcoming'
      };
  }
};

const MilestoneTracker: React.FC<MilestoneTrackerProps> = ({ 
  title = "Milestone Tracker",
  milestones 
}) => {
  const theme = useTheme();

  return (
    <Paper elevation={2} sx={{ 
      overflow: 'hidden',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      width: '100%'
    }}>
      <Box sx={{ p: 2, bgcolor: 'primary.main', color: 'primary.contrastText' }}>
        <Typography variant="h6">{title}</Typography>
      </Box>
      
      <Box sx={{ p: 0, position: 'relative', flex: 1, overflowY: 'auto' }}>
        {milestones.length > 1 && <MilestoneConnector />}
        
        <List sx={{ py: 0, width: '100%' }}>
          {milestones.map((milestone, index) => {
            const { icon, color, label } = getStatusDetails(milestone.status, theme);
            const isLast = index === milestones.length - 1;
            
            return (
              <React.Fragment key={milestone.id}>
                <ListItem 
                  sx={{ 
                    py: 2,
                    width: '100%'
                  }}
                >
                  <ListItemIcon>
                    <Avatar 
                      sx={{ 
                        bgcolor: 'background.paper',
                        color: color,
                        boxShadow: 1,
                        zIndex: 1
                      }}
                    >
                      {icon}
                    </Avatar>
                  </ListItemIcon>
                  
                  <ListItemText
                    primary={
                      <Typography variant="subtitle1" component="div">
                        {milestone.name}
                      </Typography>
                    }
                    secondary={
                      <Box sx={{ mt: 0.5 }}>
                        {milestone.description && (
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                            {milestone.description}
                          </Typography>
                        )}
                        <Typography variant="caption" component="div" color="text.secondary">
                          Due: {milestone.deadline}
                        </Typography>
                        {milestone.owner && (
                          <Typography variant="caption" component="div" color="text.secondary">
                            Owner: {milestone.owner}
                          </Typography>
                        )}
                      </Box>
                    }
                  />
                  
                  <ListItemSecondaryAction>
                    <Tooltip title={label}>
                      <Chip 
                        label={label}
                        size="small"
                        sx={{ 
                          bgcolor: `${color}15`, // Using alpha for background
                          color: color,
                          borderColor: color,
                          borderStyle: 'solid',
                          borderWidth: '1px'
                        }}
                      />
                    </Tooltip>
                  </ListItemSecondaryAction>
                </ListItem>
                {!isLast && <Divider variant="inset" component="li" />}
              </React.Fragment>
            );
          })}
        </List>
      </Box>
    </Paper>
  );
};

export default MilestoneTracker;