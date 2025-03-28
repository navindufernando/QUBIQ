import { useState } from "react";
import { 
  Grid, Typography, Box, TextField, Button, Accordion, AccordionSummary, 
  AccordionDetails, Avatar, Chip, List, ListItem, Dialog, DialogTitle, 
  DialogContent, DialogActions, MenuItem 
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import BusinessIcon from "@mui/icons-material/Business";
import PersonIcon from "@mui/icons-material/Person";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import { InputAdornment } from "@mui/material";

interface CommunicationLog {
  id: string;
  stakeholder: {
    name: string;
    type: string;
    contactPerson: string;
    position: string;
  };
  date: string;
  channel: string;
  sentiment: string;
  summary: string;
  action_items: string[];
}

interface StakeholderCommunicationsProps {
  communicationLogs: CommunicationLog[];
}

export default function StakeholderCommunications({ communicationLogs: initialLogs }: StakeholderCommunicationsProps) {
  const [communicationLogs, setCommunicationLogs] = useState<CommunicationLog[]>(initialLogs);
  const [openDialog, setOpenDialog] = useState(false);
  const [newCommunication, setNewCommunication] = useState({
    stakeholder: {
      name: "",
      type: "Client",
      contactPerson: "",
      position: ""
    },
    date: new Date().toISOString().split("T")[0],
    channel: "Email",
    sentiment: "neutral",
    summary: "",
    action_items: [""]
  });

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name.includes("stakeholder.")) {
      const field = name.split(".")[1];
      setNewCommunication({
        ...newCommunication,
        stakeholder: {
          ...newCommunication.stakeholder,
          [field]: value
        }
      });
    } else {
      setNewCommunication({
        ...newCommunication,
        [name]: value
      });
    }
  };

  const handleActionItemChange = (index: number, value: string) => {
    const newActionItems = [...newCommunication.action_items];
    newActionItems[index] = value;
    setNewCommunication({
      ...newCommunication,
      action_items: newActionItems
    });
  };

  const addActionItem = () => {
    setNewCommunication({
      ...newCommunication,
      action_items: [...newCommunication.action_items, ""]
    });
  };

  const handleSubmit = () => {
    const newLog: CommunicationLog = {
      id: Date.now().toString(),
      ...newCommunication,
      action_items: newCommunication.action_items.filter(item => item.trim() !== "")
    };
    setCommunicationLogs([newLog, ...communicationLogs]);
    setNewCommunication({
      stakeholder: {
        name: "",
        type: "Client",
        contactPerson: "",
        position: ""
      },
      date: new Date().toISOString().split("T")[0],
      channel: "Email",
      sentiment: "neutral",
      summary: "",
      action_items: [""]
    });
    handleCloseDialog();
  };

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>Stakeholder Communications ({communicationLogs.length})</Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              size="small"
              placeholder="Search communications..."
              sx={{ width: 220, "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
              InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment> }}
            />
            <Button variant="outlined" startIcon={<FilterListIcon />} sx={{ borderRadius: 2, textTransform: "none", fontWeight: 500 }}>Filter</Button>
            <Button 
              variant="contained" 
              onClick={handleOpenDialog}
              sx={{ borderRadius: 2, textTransform: "none", fontWeight: 500 }}
            >
              Record New Communication
            </Button>
          </Box>
        </Box>

        {/* Dialog for new communication */}
        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
          <DialogTitle>Record New Communication</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              label="Stakeholder Name"
              name="stakeholder.name"
              value={newCommunication.stakeholder.name}
              onChange={handleInputChange}
              margin="normal"
            />
            <TextField
              fullWidth
              select
              label="Type"
              name="stakeholder.type"
              value={newCommunication.stakeholder.type}
              onChange={handleInputChange}
              margin="normal"
            >
              <MenuItem value="Client">Client</MenuItem>
              <MenuItem value="Individual">Individual</MenuItem>
            </TextField>
            <TextField
              fullWidth
              label="Contact Person"
              name="stakeholder.contactPerson"
              value={newCommunication.stakeholder.contactPerson}
              onChange={handleInputChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Position"
              name="stakeholder.position"
              value={newCommunication.stakeholder.position}
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
            {newCommunication.action_items.map((item, index) => (
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

        {/* Existing communication logs display */}
        {communicationLogs.length > 0 ? (
          communicationLogs.map((log) => (
            <Accordion key={log.id} elevation={0} sx={{ mb: 2, borderRadius: "12px !important", overflow: "hidden", boxShadow: "0 2px 20px rgba(0,0,0,0.05)", "&:before": { display: "none" } }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`panel-${log.id}-content`} id={`panel-${log.id}-header`} sx={{ px: 3 }}>
                <Box sx={{ width: "100%" }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Avatar sx={{ bgcolor: log.stakeholder.type === "Client" ? "#3b82f6" : "#10b981", width: 40, height: 40, mr: 2 }}>
                        {log.stakeholder.type === "Client" ? <BusinessIcon fontSize="small" /> : <PersonIcon fontSize="small" />}
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{log.stakeholder.name}</Typography>
                        <Typography variant="body2" color="textSecondary">{log.stakeholder.type} • {log.date} • {log.channel}</Typography>
                      </Box>
                    </Box>
                    <Chip label={log.sentiment} size="small" color={log.sentiment === "positive" ? "success" : log.sentiment === "negative" ? "error" : "default"} sx={{ textTransform: "capitalize", fontWeight: 500 }} />
                  </Box>
                </Box>
              </AccordionSummary>
              <AccordionDetails sx={{ px: 3, pb: 3 }}>
                <Typography variant="body1" paragraph><strong>Contact Person:</strong> {log.stakeholder.contactPerson}, {log.stakeholder.position}</Typography>
                <Typography variant="body1" paragraph><strong>Summary:</strong> {log.summary}</Typography>
                <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>Action Items:</Typography>
                <List disablePadding>
                  {log.action_items.map((item: string, index: number) => (
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
            <Typography variant="body1" color="textSecondary">No communications recorded yet.</Typography>
          </Box>
        )}
      </Grid>
    </Grid>
  );
}