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
  const codeImprovementsInfo = [
    {
      id: 1,
      improvementType: "Code Structure",
      improvementDescription:
        "Refactor the nested loops to improve readability and reduce complexity.",
      priority: "High",
      dateSuggested: "14th March 2025",
    },
    {
      id: 2,
      improvementType: "Code Efficiency",
      improvementDescription:
        "Use a more efficient algorithm for sorting the large dataset.",
      priority: "Medium",
      dateSuggested: "10th March 2025",
    },
    {
      id: 3,
      improvementType: "Code Quality",
      improvementDescription:
        "Add comments and documentation to clarify the function of the code.",
      priority: "Low",
      dateSuggested: "12th March 2025",
    },
    {
      id: 4,
      improvementType: "Performance",
      improvementDescription:
        "Optimize database queries to reduce response time in API calls.",
      priority: "High",
      dateSuggested: "15th March 2025",
    },
    {
      id: 5,
      improvementType: "Security",
      improvementDescription:
        "Implement input validation to prevent SQL injection vulnerabilities.",
      priority: "High",
      dateSuggested: "8th March 2025",
    },
    {
      id: 6,
      improvementType: "Code Readability",
      improvementDescription:
        "Break down long functions into smaller, more manageable pieces.",
      priority: "Medium",
      dateSuggested: "7th March 2025",
    },
    {
      id: 7,
      improvementType: "Code Style",
      improvementDescription:
        "Follow consistent naming conventions across the entire codebase.",
      priority: "Low",
      dateSuggested: "9th March 2025",
    },
    {
      id: 8,
      improvementType: "Code Efficiency",
      improvementDescription:
        "Refactor function to eliminate redundant code and improve performance.",
      priority: "High",
      dateSuggested: "11th March 2025",
    },
  ];

  const [improvements, setImprovements] = useState<CodeSuggestion[]>([]);
  const { user } = useAuth();
  const userId = user?.id;

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:3000/dev/codeimp", {
          params: { userId },
        });
        setImprovements(response.data);
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
