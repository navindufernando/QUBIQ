import { Avatar, Divider, List, ListItem, ListItemAvatar, ListItemIcon, ListItemText, Paper, Typography } from '@mui/material'
import React from 'react'

const mockRecentActivity = [
    { id: 1, user: 'Sarah Kim', action: 'Updated website redesign task', time: '2 hours ago' },
    { id: 2, user: 'Sarah Kim', action: 'Updated website redesign task', time: '2 hours ago' },
    { id: 3, user: 'Sarah Kim', action: 'Updated website redesign task', time: '2 hours ago' },
    { id: 4, user: 'Sarah Kim', action: 'Updated website redesign task', time: '2 hours ago' },
    { id: 5, user: 'Sarah Kim', action: 'Updated website redesign task', time: '2 hours ago' }
]

const Activity = () => {
    return (
        <div>
            <Paper elevation={6} sx={{ p: 2, height: '100%', mt: 2 }}>
                <Typography variant='h6' gutterBottom>
                    Recent Activity
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <List sx={{ width: '100%' }}>
                    {mockRecentActivity.map((activity) => (
                        <ListItem key={activity.id} alignItems='flex-start' sx={{ px: 1, py: 0.5 }}>
                            <ListItemAvatar sx={{ minWidth: 40 }}>
                                <Avatar sx={{ width: 33, height: 33, fontSize: '0.975' }}>
                                    {activity.user.charAt(0)}
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={activity.action}
                                secondary={
                                    <React.Fragment>
                                        <Typography component='span' variant='body2' color='text.secondary'>
                                            {activity.user} . {activity.time}
                                        </Typography>
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                    ))}
                </List>
            </Paper>
        </div>
    )
}

export default Activity
