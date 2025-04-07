import { useState } from "react";
import {
  Grid, Typography, Box, TextField, Button, Accordion, AccordionSummary,
  AccordionDetails, Avatar, Chip, List, ListItem, Dialog, DialogTitle,
  DialogContent, DialogActions, MenuItem, IconButton
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import BusinessIcon from "@mui/icons-material/Business";
import PersonIcon from "@mui/icons-material/Person";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import DeleteIcon from "@mui/icons-material/Delete";
import { InputAdornment } from "@mui/material";
import apiService from "../../services/apiService";
import { useParams } from "react-router-dom";
import { useAuth } from './../Signup&Login/AuthContext';

interface CommunicationLog {
  id: string;
  stakeholderName: string;
  stakeholderType: string;
  contactPerson: string;
  position: string;
  date: string;
  channel: string;
  sentiment: string;
  summary: string;
  actionItems: string[];
  projectReviewId: string;
  creatorId: string;
  creator: {
    firstName: string;
    lastName: string;
    role: string;
  };
}

interface StakeholderCommunicationsProps {
  communicationLogs: CommunicationLog[];
}

export default function StakeholderCommunications({ communicationLogs: initialLogs }: StakeholderCommunicationsProps) {
  const [allLogs, setAllLogs] = useState<CommunicationLog[]>(initialLogs);
  const [displayedLogs, setDisplayedLogs] = useState<CommunicationLog[]>(initialLogs);
  const [openDialog, setOpenDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSentiment, setFilterSentiment] = useState<string | null>(null);
  const [newCommunication, setNewCommunication] = useState({
    stakeholderName: "",
    stakeholderType: "Client",
    contactPerson: "",
    position: "",
    date: new Date().toISOString().split("T")[0],
    channel: "Email",
    sentiment: "neutral",
    summary: "",
    actionItems: [""]
  });

  const { projectId } = useParams<{ projectId: string }>();
  const { user } = useAuth();
  const isPM = user?.role === 'PM';

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCommunication({ ...newCommunication, [name]: value });
  };

  const handleActionItemChange = (index: number, value: string) => {
    const newActionItems = [...newCommunication.actionItems];
    newActionItems[index] = value;
    setNewCommunication({ ...newCommunication, actionItems: newActionItems });
  };

  const addActionItem = () => {
    setNewCommunication({ ...newCommunication, actionItems: [...newCommunication.actionItems, ""] });
  };

  const handleSubmit = async () => {
    if (!projectId || !isPM) return;
    try {
      const newLog = await apiService.createCommunicationLog(
        projectId,
        newCommunication.stakeholderName,
        newCommunication.stakeholderType,
        newCommunication.contactPerson,
        newCommunication.position,
        newCommunication.date,
        newCommunication.channel,
        newCommunication.sentiment,
        newCommunication.summary,
        newCommunication.actionItems.filter(item => item.trim() !== "")
      );
      const updatedAllLogs = [newLog, ...allLogs];
      setAllLogs(updatedAllLogs);
      filterLogs(searchTerm, filterSentiment, updatedAllLogs);
      setNewCommunication({
        stakeholderName: "",
        stakeholderType: "Client",
        contactPerson: "",
        position: "",
        date: new Date().toISOString().split("T")[0],
        channel: "Email",
        sentiment: "neutral",
        summary: "",
        actionItems: [""]
      });
      handleCloseDialog();
    } catch (error) {
      console.error("Failed to create communication log:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!isPM) return;
    try {
      await apiService.deleteCommunicationLog(id);
      const updatedAllLogs = allLogs.filter(log => log.id !== id);
      setAllLogs(updatedAllLogs);
      filterLogs(searchTerm, filterSentiment, updatedAllLogs);
    } catch (error) {
      console.error("Failed to delete communication log:", error);
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    filterLogs(term, filterSentiment, allLogs);
  };

  const handleFilter = () => {
    const sentiments = ["positive", "negative", "neutral"];
    const currentIndex = filterSentiment ? sentiments.indexOf(filterSentiment) : -1;
    const newFilter = currentIndex === sentiments.length - 1 ? null : sentiments[currentIndex + 1];
    setFilterSentiment(newFilter);
    filterLogs(searchTerm, newFilter, allLogs);
  };

  const filterLogs = (search: string, sentiment: string | null, logs: CommunicationLog[]) => {
    let filtered = [...logs];

    if (search) {
      filtered = filtered.filter(log =>
        log.stakeholderName.toLowerCase().includes(search) ||
        log.contactPerson.toLowerCase().includes(search) ||
        log.summary.toLowerCase().includes(search)
      );
    }

    if (sentiment) {
      filtered = filtered.filter(log => log.sentiment === sentiment);
    }

    setDisplayedLogs(filtered);
  };

  const resetFilters = () => {
    setSearchTerm("");
    setFilterSentiment(null);
    setDisplayedLogs(allLogs);
  };

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Stakeholder Communications ({displayedLogs.length})
          </Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              size="small"
              placeholder="Search communications..."
              value={searchTerm}
              onChange={handleSearch}
              sx={{ width: 220, "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                )
              }}
            />
            <Button
              variant="outlined"
              startIcon={<FilterListIcon />}
              onClick={handleFilter}
              sx={{ borderRadius: 2, textTransform: "none", fontWeight: 500 }}
            >
              {filterSentiment ? `Filter: ${filterSentiment}` : "Filter"}
            </Button>
            {isPM && (
              <Button
                variant="contained"
                onClick={handleOpenDialog}
                sx={{ borderRadius: 2, textTransform: "none", fontWeight: 500 }}
              >
                Record New Communication
              </Button>
            )}
            {(searchTerm || filterSentiment) && (
              <Button
                variant="text"
                onClick={resetFilters}
                sx={{ textTransform: "none" }}
              >
                Reset
              </Button>
            )}
          </Box>
        </Box>

        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
          <DialogTitle>Record New Communication</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              label="Stakeholder Name"
              name="stakeholderName"
              value={newCommunication.stakeholderName}
              onChange={handleInputChange}
              margin="normal"
            />
            <TextField
              fullWidth
              select
              label="Type"
              name="stakeholderType"
              value={newCommunication.stakeholderType}
              onChange={handleInputChange}
              margin="normal"
            >
              <MenuItem value="Client">Client</MenuItem>
              <MenuItem value="Individual">Individual</MenuItem>
            </TextField>
            <TextField
              fullWidth
              label="Contact Person"
              name="contactPerson"
              value={newCommunication.contactPerson}
              onChange={handleInputChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Position"
              name="position"
              value={newCommunication.position}
              onChange={handleInputChange}
              margin="normal"
            />
            <TextField
              fullWidth
              select
              label="Channel"
              name="channel"
              value={newCommunication.channel}
              onChange={handleInputChange}
              margin="normal"
            >
              <MenuItem value="Email">Email</MenuItem>
              <MenuItem value="Phone">Phone</MenuItem>
              <MenuItem value="Meeting">Meeting</MenuItem>
            </TextField>
            <TextField
              fullWidth
              select
              label="Sentiment"
              name="sentiment"
              value={newCommunication.sentiment}
              onChange={handleInputChange}
              margin="normal"
            >
              <MenuItem value="positive">Positive</MenuItem>
              <MenuItem value="neutral">Neutral</MenuItem>
              <MenuItem value="negative">Negative</MenuItem>
            </TextField>
            <TextField
              fullWidth
              label="Summary"
              name="summary"
              value={newCommunication.summary}
              onChange={handleInputChange}
              multiline
              rows={3}
              margin="normal"
            />
            <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>Action Items</Typography>
            {newCommunication.actionItems.map((item, index) => (
              <TextField
                key={index}
                fullWidth
                label={`Action Item ${index + 1}`}
                value={item}
                onChange={(e) => handleActionItemChange(index, e.target.value)}
                margin="normal"
              />
            ))}
            <Button onClick={addActionItem} sx={{ mt: 1 }}>Add Action Item</Button>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleSubmit} variant="contained">Save</Button>
          </DialogActions>
        </Dialog>

        {displayedLogs.length > 0 ? (
          displayedLogs.map((log) => (
            <Accordion
              key={log.id}
              elevation={0}
              sx={{
                mb: 2,
                borderRadius: "12px !important",
                overflow: "hidden",
                boxShadow: "0 2px 20px rgba(0,0,0,0.05)",
                "&:before": { display: "none" }
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel-${log.id}-content`}
                id={`panel-${log.id}-header`}
                sx={{ px: 3 }}
              >
                <Box sx={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Avatar sx={{ bgcolor: log.stakeholderType === "Client" ? "#3b82f6" : "#10b981", width: 40, height: 40, mr: 2 }}>
                      {log.stakeholderType === "Client" ? <BusinessIcon fontSize="small" /> : <PersonIcon fontSize="small" />}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{log.stakeholderName}</Typography>
                      <Typography variant="body2" color="textSecondary">{log.stakeholderType} • {log.date} • {log.channel}</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Chip
                      label={log.sentiment}
                      size="small"
                      color={log.sentiment === "positive" ? "success" : log.sentiment === "negative" ? "error" : "default"}
                      sx={{ textTransform: "capitalize", fontWeight: 500 }}
                    />
                    {isPM && (
                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(log.id);
                        }}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    )}
                  </Box>
                </Box>
              </AccordionSummary>
              <AccordionDetails sx={{ px: 3, pb: 3 }}>
                <Typography variant="body1" paragraph><strong>Contact Person:</strong> {log.contactPerson}, {log.position}</Typography>
                <Typography variant="body1" paragraph><strong>Summary:</strong> {log.summary}</Typography>
                <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>Action Items:</Typography>
                <List disablePadding>
                  {log.actionItems.map((item, index) => (
                    <ListItem key={index} sx={{ py: 0.5, px: 0, display: "flex", alignItems: "center" }}>
                      <CheckCircleIcon fontSize="small" color="primary" sx={{ mr: 1 }} />
                      <Typography variant="body2">{item}</Typography>
                    </ListItem>
                  ))}
                </List>
              </AccordionDetails>
            </Accordion>
          ))
        ) : (
          <Box sx={{ textAlign: "center", py: 4 }}>
            <Typography variant="body1" color="textSecondary">
              No communication logs match the current filters.
            </Typography>
          </Box>
        )}
      </Grid>
    </Grid>
  );
}