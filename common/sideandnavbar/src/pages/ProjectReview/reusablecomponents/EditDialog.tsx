import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Select, MenuItem } from "@mui/material";
import { ProjectData, FeedbackItem } from "../types";

interface EditDialogProps {
  isOpen: boolean;
  onClose: () => void;
  editFeedbackId: string | null;
  editFeedbackContent: string;
  setEditFeedbackContent: (value: string) => void;
  editFeedbackSentiment: string;
  setEditFeedbackSentiment: (value: string) => void;
  editSection: string | null;
  editIndex: number | null;
  newDescription: string;
  setNewDescription: (value: string) => void;
  newObjective: string;
  setNewObjective: (value: string) => void;
  newHighlight: string;
  setNewHighlight: (value: string) => void;
  newRisk: { severity: string; description: string };
  setNewRisk: (value: { severity: string; description: string }) => void;
  editedProjectName: string;
  setEditedProjectName: (value: string) => void;
  project: ProjectData;
  onSave: () => void;
}

export default function EditDialog({
  isOpen,
  onClose,
  editFeedbackId,
  editFeedbackContent,
  setEditFeedbackContent,
  editFeedbackSentiment,
  setEditFeedbackSentiment,
  editSection,
  editIndex,
  newDescription,
  setNewDescription,
  newObjective,
  setNewObjective,
  newHighlight,
  setNewHighlight,
  newRisk,
  setNewRisk,
  editedProjectName,
  setEditedProjectName,
  project,
  onSave,
}: EditDialogProps) {
  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {editFeedbackId
          ? "Edit Feedback"
          : editSection
          ? editIndex !== null
            ? `Edit ${editSection}`
            : `Add ${editSection}`
          : project.name
          ? "Edit Project Name"
          : "Add Project Name"}
      </DialogTitle>
      <DialogContent>
        {editFeedbackId ? (
          <>
            <TextField
              autoFocus
              margin="dense"
              label="Feedback"
              fullWidth
              multiline
              rows={3}
              variant="outlined"
              value={editFeedbackContent}
              onChange={(e) => setEditFeedbackContent(e.target.value)}
            />
            <Select
              fullWidth
              value={editFeedbackSentiment}
              onChange={(e) => setEditFeedbackSentiment(e.target.value)}
              sx={{ mt: 2 }}
            >
              <MenuItem value="positive">Positive</MenuItem>
              <MenuItem value="negative">Negative</MenuItem>
              <MenuItem value="neutral">Neutral</MenuItem>
            </Select>
          </>
        ) : editSection === "description" ? (
          <TextField
            autoFocus
            margin="dense"
            label="Project Description"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
          />
        ) : editSection === "objectives" ? (
          <TextField
            autoFocus
            margin="dense"
            label="Objective"
            fullWidth
            variant="outlined"
            value={newObjective}
            onChange={(e) => setNewObjective(e.target.value)}
          />
        ) : editSection === "highlights" ? (
          <TextField
            autoFocus
            margin="dense"
            label="Highlight"
            fullWidth
            variant="outlined"
            value={newHighlight}
            onChange={(e) => setNewHighlight(e.target.value)}
          />
        ) : editSection === "risks" ? (
          <>
            <TextField
              select
              margin="dense"
              label="Severity"
              fullWidth
              variant="outlined"
              value={newRisk.severity}
              onChange={(e) => setNewRisk({ ...newRisk, severity: e.target.value })}
            >
              <MenuItem value="high">High</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="low">Low</MenuItem>
            </TextField>
            <TextField
              autoFocus
              margin="dense"
              label="Risk Description"
              fullWidth
              variant="outlined"
              value={newRisk.description}
              onChange={(e) => setNewRisk({ ...newRisk, description: e.target.value })}
            />
          </>
        ) : (
          <TextField
            autoFocus
            margin="dense"
            label="Project Name"
            fullWidth
            variant="outlined"
            value={editedProjectName}
            onChange={(e) => setEditedProjectName(e.target.value)}
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={onSave}
          variant="contained"
          disabled={
            editFeedbackId
              ? !editFeedbackContent.trim()
              : editSection === "description"
              ? !newDescription.trim()
              : editSection === "objectives"
              ? !newObjective.trim()
              : editSection === "highlights"
              ? !newHighlight.trim()
              : editSection === "risks"
              ? !newRisk.severity || !newRisk.description.trim()
              : !editedProjectName.trim()
          }
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}