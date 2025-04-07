import { useState } from "react";
import { 
  Grid, Typography, Box, Button, Card, CardContent, Avatar, Rating, 
  Chip, TextField, Dialog, DialogTitle, DialogContent, DialogActions, 
  IconButton, MenuItem 
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import DeleteIcon from "@mui/icons-material/Delete";
import apiService from "./../../../../../backend/src/services/apiService";
import { useParams } from "react-router-dom";

interface TeamInsight {
  id: string;
  memberName: string;
  memberRole: string;
  date: string;
  rating: number;
  content: string;
  focusAreas: string[];
}

interface TeamInsightsProps {
  teamInsights: TeamInsight[];
}

export default function TeamInsights({ teamInsights: initialInsights }: TeamInsightsProps) {
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

  const { projectId } = useParams<{ projectId: string }>();
  const token = localStorage.getItem("token") || ""; // Assume token is stored in localStorage

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewInsight({ ...newInsight, [name]: value });
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
    if (!projectId) return;
    try {
      const newInsightData = await apiService.createTeamInsight(
        projectId,
        newInsight.memberName,
        newInsight.memberRole,
        newInsight.date,
        newInsight.rating,
        newInsight.content,
        newInsight.focusAreas.filter(area => area.trim() !== ""),
        token
      );
      const updatedAllInsights = [newInsightData, ...allInsights];
      setAllInsights(updatedAllInsights);
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
    try {
      await apiService.deleteTeamInsight(id, token);
      const updatedInsights = allInsights.filter(insight => insight.id !== id);
      setAllInsights(updatedInsights);
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
            <Button 
              variant="contained" 
              onClick={handleOpenDialog}
              sx={{ borderRadius: 2, textTransform: "none", fontWeight: 500 }}
            >
              Request New Insights
            </Button>
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

        {/* Dialog for new insight */}
        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
          <DialogTitle>Record New Team Insight</DialogTitle>
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
            <Box sx={{ mt: 2, mb: 2 }}>
              <Typography variant="subtitle2">Rating</Typography>
              <Rating
                name="rating"
                value={newInsight.rating}
                precision={0.5}
                onChange={(_, value) => setNewInsight({ ...newInsight, rating: value || 0 })}
              />
            </Box>
            <TextField
              fullWidth
              label="Content"
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
            <Button onClick={handleSubmit} variant="contained">Save</Button>
          </DialogActions>
        </Dialog>

        {displayedInsights.length > 0 ? (
          displayedInsights.map((insight) => (
            <Card key={insight.id} elevation={0} sx={{ borderRadius: 3, boxShadow: "0 2px 20px rgba(0,0,0,0.05)", mb: 3, overflow: "visible" }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Avatar sx={{ bgcolor: "#6366f1", width: 40, height: 40, mr: 2 }}>{insight.memberName.charAt(0)}</Avatar>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{insight.memberName}</Typography>
                      <Typography variant="body2" color="textSecondary">{insight.memberRole} • {insight.date}</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Box sx={{ display: "flex", alignItems: "center", bgcolor: "rgba(99, 102, 241, 0.1)", p: 1, borderRadius: 2 }}>
                      <Rating value={insight.rating} precision={0.5} readOnly size="small" />
                      <Typography variant="body2" sx={{ fontWeight: 500, ml: 1 }}>{insight.rating.toFixed(1)}</Typography>
                    </Box>
                    <IconButton
                      onClick={() => handleDelete(insight.id)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
                <Typography variant="body1" paragraph sx={{ mt: 2 }}>{insight.content}</Typography>
                <Box sx={{ mt: 3 }}>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>Focus Areas:</Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {insight.focusAreas.map((area: string, index: number) => (
                      <Chip key={index} label={area} size="small" sx={{ borderRadius: 2, bgcolor: "rgba(99, 102, 241, 0.1)", color: "#6366f1", fontWeight: 500 }} />
                    ))}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))
        ) : (
          <Box sx={{ textAlign: "center", py: 4 }}>
            <Typography variant="body1" color="textSecondary">No team insights available yet.</Typography>
          </Box>
        )}
      </Grid>
    </Grid>
  );
}