import { useState } from "react";
import {
  Grid, Typography, Box, Button, Card, CardContent, Avatar, Rating,
  Chip, TextField, Dialog, DialogTitle, DialogContent, DialogActions,
  IconButton, MenuItem
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import DeleteIcon from "@mui/icons-material/Delete";
import apiService from "../../services/apiService";
import { useAuth } from "../Signup&Login/AuthContext";

interface TeamInsight {
  id: string;
  memberName: string;
  memberRole: string;
  date: string;
  rating: number;
  content: string;
  focusAreas: string[];
  projectReviewId: string;
  creatorId: string;
  creator: {
    firstName: string;
    lastName: string;
    role: string;
  };
}

interface TeamInsightsProps {
  teamInsights: TeamInsight[];
  projectId: string;
  setTeamInsights: (insights: TeamInsight[]) => void;
}

export default function TeamInsights({ teamInsights: initialInsights, projectId, setTeamInsights }: TeamInsightsProps) {
  const [allInsights, setAllInsights] = useState<TeamInsight[]>(initialInsights);
  const [displayedInsights, setDisplayedInsights] = useState<TeamInsight[]>(initialInsights);
  const [openDialog, setOpenDialog] = useState(false);
  const [filterName, setFilterName] = useState<string>("");
  const [newInsight, setNewInsight] = useState({
    memberName: "",
    memberRole: "",
    date: new Date().toISOString().split("T")[0],
    rating: 0,
    content: "",
    focusAreas: [""]
  });
  const { user } = useAuth();
  const isPM = user?.role === 'PM';

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewInsight({ ...newInsight, [name]: value });
  };

  const handleRatingChange = (event: React.ChangeEvent<{}>, value: number | null) => {
    setNewInsight({ ...newInsight, rating: value || 0 });
  };

  const handleFocusAreaChange = (index: number, value: string) => {
    const newFocusAreas = [...newInsight.focusAreas];
    newFocusAreas[index] = value;
    setNewInsight({ ...newInsight, focusAreas: newFocusAreas });
  };

  const addFocusArea = () => {
    setNewInsight({ ...newInsight, focusAreas: [...newInsight.focusAreas, ""] });
  };

  const handleSubmit = async () => {
    if (!projectId || !isPM) return;
    try {
      const newInsightData = await apiService.createTeamInsight(
        projectId,
        newInsight.memberName,
        newInsight.memberRole,
        newInsight.date,
        newInsight.rating,
        newInsight.content,
        newInsight.focusAreas.filter(area => area.trim() !== "")
      );
      const updatedAllInsights = [newInsightData, ...allInsights];
      setAllInsights(updatedAllInsights);
      setTeamInsights(updatedAllInsights);
      filterInsights(filterName, updatedAllInsights);
      setNewInsight({
        memberName: "",
        memberRole: "",
        date: new Date().toISOString().split("T")[0],
        rating: 0,
        content: "",
        focusAreas: [""]
      });
      handleCloseDialog();
    } catch (error) {
      console.error("Failed to create team insight:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!isPM) return;
    try {
      await apiService.deleteTeamInsight(id);
      const updatedInsights = allInsights.filter(insight => insight.id !== id);
      setAllInsights(updatedInsights);
      setTeamInsights(updatedInsights);
      filterInsights(filterName, updatedInsights);
    } catch (error) {
      console.error("Failed to delete team insight:", error);
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setFilterName(name);
    filterInsights(name, allInsights);
  };

  const filterInsights = (name: string, insights: TeamInsight[]) => {
    let filtered = [...insights];
    if (name) {
      filtered = filtered.filter(insight =>
        insight.memberName.toLowerCase().includes(name.toLowerCase())
      );
    }
    setDisplayedInsights(filtered);
  };

  const resetFilter = () => {
    setFilterName("");
    setDisplayedInsights(allInsights);
  };

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>Team Insights ({displayedInsights.length})</Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              size="small"
              placeholder="Filter by Name"
              value={filterName}
              onChange={handleFilterChange}
              sx={{ width: 220, "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
              InputProps={{
                startAdornment: (
                  <FilterListIcon fontSize="small" sx={{ mr: 1, color: "action.active" }} />
                )
              }}
            />
            {isPM && (
              <Button
                variant="contained"
                onClick={handleOpenDialog}
                sx={{ borderRadius: 2, textTransform: "none", fontWeight: 500 }}
              >
                Add New Insight
              </Button>
            )}
            {filterName && (
              <Button
                variant="text"
                onClick={resetFilter}
                sx={{ textTransform: "none" }}
              >
                Reset
              </Button>
            )}
          </Box>
        </Box>

        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
          <DialogTitle>Add New Team Insight</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              label="Team Member Name"
              name="memberName"
              value={newInsight.memberName}
              onChange={handleInputChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Role"
              name="memberRole"
              value={newInsight.memberRole}
              onChange={handleInputChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Date"
              type="date"
              name="date"
              value={newInsight.date}
              onChange={handleInputChange}
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
            <Typography component="legend" sx={{ mt: 2 }}>Performance Rating</Typography>
            <Rating
              name="rating"
              value={newInsight.rating}
              onChange={handleRatingChange}
              precision={0.5}
            />
            <TextField
              fullWidth
              label="Insight Content"
              name="content"
              value={newInsight.content}
              onChange={handleInputChange}
              multiline
              rows={3}
              margin="normal"
            />
            <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>Focus Areas</Typography>
            {newInsight.focusAreas.map((area, index) => (
              <TextField
                key={index}
                fullWidth
                label={`Focus Area ${index + 1}`}
                value={area}
                onChange={(e) => handleFocusAreaChange(index, e.target.value)}
                margin="normal"
              />
            ))}
            <Button onClick={addFocusArea} sx={{ mt: 1 }}>Add Focus Area</Button>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button
              onClick={handleSubmit}
              variant="contained"
              disabled={!newInsight.memberName.trim() || !newInsight.content.trim()}
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>

        {displayedInsights.length > 0 ? (
          displayedInsights.map((insight) => (
            <Card
              key={insight.id}
              elevation={0}
              sx={{ mb: 3, borderRadius: 3, boxShadow: "0 2px 20px rgba(0,0,0,0.05)" }}
            >
              <CardContent>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Avatar sx={{ bgcolor: "#10b981", width: 40, height: 40, mr: 2 }}>
                      {insight.memberName.charAt(0)}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        {insight.memberName}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {insight.memberRole} • {insight.date}
                      </Typography>
                    </Box>
                  </Box>
                  {isPM && (
                    <IconButton
                      onClick={() => handleDelete(insight.id)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  )}
                </Box>
                <Rating value={insight.rating} readOnly precision={0.5} sx={{ mb: 2 }} />
                <Typography variant="body1" paragraph>{insight.content}</Typography>
                <Box>
                  {insight.focusAreas.map((area, index) => (
                    <Chip
                      key={index}
                      label={area}
                      size="small"
                      sx={{ mr: 1, mb: 1, bgcolor: "rgba(59, 130, 246, 0.1)", color: "#3b82f6" }}
                    />
                  ))}
                </Box>
              </CardContent>
            </Card>
          ))
        ) : (
          <Box sx={{ textAlign: "center", py: 4 }}>
            <Typography variant="body1" color="textSecondary">
              No team insights available yet.
            </Typography>
          </Box>
        )}
      </Grid>
    </Grid>
  );
}