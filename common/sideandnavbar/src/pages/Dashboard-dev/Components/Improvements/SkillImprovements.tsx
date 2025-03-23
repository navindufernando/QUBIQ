import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";

const SkillImprovements = () => {
  // const skillImprovements = [
  //   {
  //     id: "1",
  //     skill: "GraphQL",
  //     description:
  //       "A query language for APIs that enables flexible and efficient data retrieval.",
  //     dateSuggested: "1st January 2025",
  //   },
  //   {
  //     id: "2",
  //     skill: "Docker",
  //     description:
  //       "A platform for developing, shipping, and running applications in containers.",
  //     dateSuggested: "20th April 2025",
  //   },
  //   {
  //     id: "3",
  //     skill: "TypeScript",
  //     description:
  //       "A superset of JavaScript that adds static typing to improve code reliability.",
  //     dateSuggested: "5th May 2025",
  //   },
  //   {
  //     id: "4",
  //     skill: "Unit Testing",
  //     description:
  //       "A software testing method where individual components are tested for correctness.",
  //     dateSuggested: "14th May 2025",
  //   },
  //   {
  //     id: "5",
  //     skill: "Cloud Functions",
  //     description:
  //       "Serverless functions that run in the cloud to handle backend logic efficiently.",
  //     dateSuggested: "10th March 2025",
  //   },
  // ];

  const [improvements, setImprovements] = useState<any[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/dev/improvement/skill"
        );

        const recommendedSkillsWithDetails = Object.values(
          response.data.recommended_skills
        ).map((skillDetails: any, index: number) => {
          return {
            id: index.toString(), // Ensure id is a string
            skill: skillDetails.skill, // Directly access skill property
            description: skillDetails.description,
            dateSuggested:
              skillDetails.dateSuggested || new Date().toLocaleDateString(),
          };
        });

        console.log(recommendedSkillsWithDetails);

        setImprovements(recommendedSkillsWithDetails);
      } catch (error) {
        console.error("Error fetching skill improvements:", error);
      }
    };

    fetchTasks();
  }, []);

  useEffect(() => {
    console.log("Updated improvements:", improvements);
    Array.isArray(improvements)
      ? console.log("array")
      : console.log(`Not array: ${improvements}`);
  }, [improvements]);

  return (
    <>
      <Paper elevation={2} sx={{ p: 2, height: "100%", mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Potential Skill Improvements
        </Typography>
        <Divider />
        <List sx={{ width: "100%" }}>
          {Array.isArray(improvements) &&
            improvements.map(
              (improvement: {
                id: string;
                skill: string;
                description: string;
                dateSuggested: string;
              }) => (
                <ListItem key={improvement.id} alignItems="flex-start">
                  <ListItemText
                    primary={<Box display="flex">{improvement.skill}</Box>}
                    secondary={
                      <Typography
                        component="span"
                        variant="body2"
                        color="text.secondary"
                      >
                        {improvement.description}
                      </Typography>
                    }
                    sx={{ maxWidth: "90%" }}
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
              )
            )}
        </List>
      </Paper>
    </>
  );
};

export default SkillImprovements;
