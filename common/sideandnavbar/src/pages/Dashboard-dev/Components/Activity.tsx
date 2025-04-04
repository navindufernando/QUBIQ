import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Activity = () => {
  const recentActivity = [
    {
      id: 1,
      user: "Sarah Kim",
      action: "Updated website redesign task",
      time: "2 hours ago",
    },
    {
      id: 2,
      user: "Sarah Kim",
      action: "Updated website redesign task",
      time: "2 hours ago",
    },
    {
      id: 3,
      user: "Sarah Kim",
      action: "Updated website redesign task",
      time: "2 hours ago",
    },
    {
      id: 4,
      user: "Sarah Kim",
      action: "Updated website redesign task",
      time: "2 hours ago",
    },
    {
      id: 5,
      user: "Sarah Kim",
      action: "Updated website redesign task",
      time: "2 hours ago",
    },
  ];

  // const [activities, setActivities] = useState([]);

  // useEffect(() => {
  //   const fetchTasks = async () => {
  //     try {
  //       const response = await axios.get(
  //         "http://localhost:3000/dev/activities"
  //       );
  //       setActivities(response.data);
  //     } catch (error) {
  //       console.error("Error fetching recent activities:", error);
  //     }
  //   };

  //   fetchTasks();
  // }, []);

  return (
    <>
      <Paper elevation={3} sx={{ p: 2, mt: 2, borderRadius: 4 }}>
        <Typography variant="h6" gutterBottom>
          Recent Activity
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <List sx={{ width: "100%" }}>
          {recentActivity.map((activity) => (
            <ListItem
              key={activity.id}
              alignItems="flex-start"
              sx={{ px: 1, py: 0.5 }}
            >
              <ListItemAvatar>
                <Avatar sx={{ width: 33, height: 33, fontSize: "0.975" }}>
                  {activity.user.charAt(0)}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={activity.action}
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      color="text.secondary"
                    >
                      {activity.user} . {activity.time}
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </>
  );
};

export default Activity;
