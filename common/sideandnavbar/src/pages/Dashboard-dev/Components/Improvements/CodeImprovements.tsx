import {
  Avatar,
  Box,
  Chip,
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
import { useAuth } from "../../../Signup&Login/AuthContext";

interface CodeSuggestion {
  id: string;
  userId: string;
  issueType: string;
  description: string;
  createdAt: string;
}

const CodeImprovements = () => {
  const [improvements, setImprovements] = useState<CodeSuggestion[]>([]);
  const { user } = useAuth();
  const userId = user?.id;

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        console.log("userId being sent:", userId);
        const response = await axios.get("http://localhost:3000/dev/codeimp", {
          params: { userId },
        });
        if (response.data && Array.isArray(response.data)) {
          console.log("Response:", response.data);
          setImprovements(response.data);
        } else {
          console.error("Received invalid response structure");
        }
      } catch (error) {
        console.error("Error fetching code improvements:", error);
      }
    };

    fetchTasks();
  }, []);

  useEffect(() => {
    console.log(improvements);
  }, [improvements]);

  return (
    <>
      <Paper
        elevation={3}
        sx={{
          p: 2,
          height: "100%",
          mt: 2,
          borderRadius: 4,
          background: "linear-gradient(to right,#F5F7FA, #ffffff)",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Code Improvements
        </Typography>
        <Divider />
        <List sx={{ width: "100%" }}>
          {improvements.map((improvement) => (
            <ListItem
              key={improvement.id}
              alignItems="flex-start"
              sx={{ px: 1.5, py: 0.75 }}
            >
              <ListItemText
                primary={
                  <Box
                    display="flex"
                    justifyContent="left"
                    alignItems="center"
                    sx={{ mb: 0.25 }}
                  >
                    {improvement.issueType}
                  </Box>
                }
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      color="text.secondary"
                    >
                      {improvement.description}
                    </Typography>
                  </React.Fragment>
                }
              />
              <ListItemText
                secondary={
                  <Typography
                    component="span"
                    variant="body2"
                    color="text.secondary"
                  >
                    {improvement.createdAt.split("T")[0]}
                  </Typography>
                }
                sx={{ textAlign: "right" }}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </>
  );
};

export default CodeImprovements;
