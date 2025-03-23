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

  const [improvements, setImprovements] = useState([]);

  // useEffect(() => {
  //   const fetchTasks = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:3000/dev/codeimp");
  //       setImprovements(response.data);
  //     } catch (error) {
  //       console.error("Error fetching code improvements:", error);
  //     }
  //   };

  //   fetchTasks();
  // }, []);

  return (
    <>
      <Paper elevation={2} sx={{ p: 2, height: "100%", mt: 2 }}>
        <Typography variant="h6" gutterBottom>
          Code Improvements
        </Typography>
        <Divider />
        <List sx={{ width: "100%" }}>
          {codeImprovementsInfo.map((improvement) => (
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
                    {" "}
                    <Chip
                      label={improvement.priority}
                      size="small"
                      sx={{
                        mr: 2,
                        fontSize: "0.75rem",
                        fontWeight: "bold",
                        color: "#fff",
                        minWidth: "60px",
                        backgroundColor:
                          improvement.priority === "High"
                            ? "#d32f2f" // Red for High
                            : improvement.priority === "Medium"
                            ? "#ffa000" // Orange for Medium
                            : "#388e3c", // Green for Low
                      }}
                    />
                    {improvement.improvementType}
                  </Box>
                }
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      color="text.secondary"
                    >
                      {improvement.improvementDescription}
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
                    {improvement.dateSuggested}
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
