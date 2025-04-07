import { useState } from "react";
import {
  Grid, Paper, Typography, Box, TextField, Button, Select, MenuItem, Chip, Avatar,
  InputAdornment, Menu
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import { FeedbackItem } from "./types";
import apiService from "../../services/apiService";
import { useParams } from "react-router-dom";
import { useAuth } from './../Signup&Login/AuthContext';

interface CommentsFeedbackProps {
  feedback: FeedbackItem[];
  setFeedback: (feedback: FeedbackItem[]) => void;
  handleEditFeedback: (id: string) => void;
}

export default function CommentsFeedback({ feedback, setFeedback, handleEditFeedback }: CommentsFeedbackProps) {
  const [newComment, setNewComment] = useState("");
  const [newSentiment, setNewSentiment] = useState("neutral");
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(null);
  const [filterOption, setFilterOption] = useState<string>("All Feedback");
  const [searchTerm, setSearchTerm] = useState("");
  const [replyInputs, setReplyInputs] = useState<{ [key: string]: string }>({});
  const [showReplyInput, setShowReplyInput] = useState<{ [key: string]: boolean }>({});

  const { projectId } = useParams<{ projectId: string }>();
  const { user } = useAuth();

  const handleAddComment = async () => {
    if (!newComment.trim() || !projectId) return;
    try {
      const newFeedbackItem = await apiService.createFeedback(
        projectId,
        newComment,
        newSentiment,
        new Date().toISOString().split("T")[0]
      );
      setFeedback([newFeedbackItem, ...feedback]);
      setNewComment("");
      setNewSentiment("neutral");
    } catch (error) {
      console.error("Failed to add feedback:", error);
    }
  };

  const handleFilterClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  const handleFilterSelect = (option: string) => {
    setFilterOption(option);
    setFilterAnchorEl(null);
  };

  const toggleReplyInput = (feedbackId: string) => {
    setShowReplyInput((prev) => ({ ...prev, [feedbackId]: !prev[feedbackId] }));
  };

  const handleReplyChange = (feedbackId: string, value: string) => {
    setReplyInputs((prev) => ({ ...prev, [feedbackId]: value }));
  };

  const handleAddReply = async (feedbackId: string) => {
    const replyText = replyInputs[feedbackId]?.trim();
    if (!replyText) return;
    try {
      const newReply = await apiService.createReply(
        feedbackId,
        replyText,
        new Date().toISOString().split("T")[0]
      );
      setFeedback(feedback.map((item) => item.id === feedbackId ? { ...item, replies: [...item.replies, newReply] } : item));
      setReplyInputs((prev) => ({ ...prev, [feedbackId]: "" }));
      setShowReplyInput((prev) => ({ ...prev, [feedbackId]: false }));
    } catch (error) {
      console.error("Failed to add reply:", error);
    }
  };

  const handleDeleteFeedback = async (id: string) => {
    try {
      await apiService.deleteFeedback(id);
      setFeedback(feedback.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Failed to delete feedback:", error);
    }
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case "positive": return <SentimentVerySatisfiedIcon color="success" />;
      case "negative": return <SentimentDissatisfiedIcon color="error" />;
      default: return <SentimentSatisfiedIcon color="action" />;
    }
  };

  const filteredFeedback = feedback.filter((item) => {
    if (filterOption === "All Feedback") return true;
    if (filterOption === "Positive Only") return item.sentiment === "positive";
    if (filterOption === "Negative Only") return item.sentiment === "negative";
    if (filterOption === "Neutral Only") return item.sentiment === "neutral";
    if (filterOption === "With Replies") return item.replies && item.replies.length > 0;
    return true;
  }).filter((item) => item.content.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Paper elevation={0} sx={{ p: 3, borderRadius: 3, boxShadow: "0 2px 20px rgba(0,0,0,0.05)", mb: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>Add Your Feedback</Typography>
          <TextField
            fullWidth
            multiline
            rows={3}
            placeholder="Share your thoughts, feedback, or questions about the project..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <Select fullWidth value={newSentiment} onChange={(e) => setNewSentiment(e.target.value)} sx={{ mb: 2 }}>
            <MenuItem value="positive">Positive</MenuItem>
            <MenuItem value="negative">Negative</MenuItem>
            <MenuItem value="neutral">Neutral</MenuItem>
          </Select>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button startIcon={<AttachFileIcon />} sx={{ borderRadius: 2, textTransform: "none", fontWeight: 500 }}>Attach Files</Button>
            <Button variant="contained" endIcon={<SendIcon />} onClick={handleAddComment} disabled={!newComment.trim()} sx={{ borderRadius: 2, textTransform: "none", fontWeight: 500, boxShadow: 2 }}>Submit Feedback</Button>
          </Box>
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>Feedback & Comments ({filteredFeedback.length})</Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              size="small"
              placeholder="Search feedback..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ width: 220, "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
              InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment> }}
            />
            <Button variant="outlined" startIcon={<FilterListIcon />} onClick={handleFilterClick} sx={{ borderRadius: 2, textTransform: "none", fontWeight: 500 }}>Filter: {filterOption}</Button>
            <Menu anchorEl={filterAnchorEl} open={Boolean(filterAnchorEl)} onClose={handleFilterClose}>
              <MenuItem onClick={() => handleFilterSelect("All Feedback")}>All Feedback</MenuItem>
              <MenuItem onClick={() => handleFilterSelect("Positive Only")}>Positive Only</MenuItem>
              <MenuItem onClick={() => handleFilterSelect("Negative Only")}>Negative Only</MenuItem>
              <MenuItem onClick={() => handleFilterSelect("Neutral Only")}>Neutral Only</MenuItem>
              <MenuItem onClick={() => handleFilterSelect("With Replies")}>With Replies</MenuItem>
            </Menu>
          </Box>
        </Box>

        {filteredFeedback.length > 0 ? (
          filteredFeedback.map((item) => (
            <Paper key={item.id} elevation={0} sx={{ p: 3, borderRadius: 3, boxShadow: "0 2px 20px rgba(0,0,0,0.05)", mb: 3 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Avatar sx={{ bgcolor: "#3b82f6", width: 40, height: 40, mr: 2 }}>{item.author.firstName.charAt(0)}</Avatar>
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{`${item.author.firstName} ${item.author.lastName}`}</Typography>
                    <Typography variant="body2" color="textSecondary">{item.author.role} • {item.date}</Typography>
                  </Box>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Chip label={item.sentiment} size="small" color={item.sentiment === "positive" ? "success" : item.sentiment === "negative" ? "error" : "default"} sx={{ textTransform: "capitalize" }} />
                  {getSentimentIcon(item.sentiment)}
                </Box>
              </Box>
              <Typography variant="body1" paragraph sx={{ mt: 2 }}>{item.content}</Typography>
              <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
                <Button size="small" startIcon={<ThumbUpIcon />} sx={{ borderRadius: 2, textTransform: "none" }}>Helpful</Button>
                <Button size="small" startIcon={<ThumbDownIcon />} sx={{ borderRadius: 2, textTransform: "none" }}>Not Helpful</Button>
                <Button size="small" onClick={() => toggleReplyInput(item.id)} sx={{ borderRadius: 2, textTransform: "none" }}>Reply</Button>
                {item.authorId === user?.id && (
                  <>
                    <Button size="small" startIcon={<EditIcon />} onClick={() => handleEditFeedback(item.id)} sx={{ borderRadius: 2, textTransform: "none" }}>Edit</Button>
                    <Button size="small" startIcon={<DeleteIcon />} onClick={() => handleDeleteFeedback(item.id)} color="error" sx={{ borderRadius: 2, textTransform: "none" }}>Delete</Button>
                  </>
                )}
              </Box>
              {showReplyInput[item.id] && (
                <Box sx={{ mt: 2 }}>
                  <TextField
                    fullWidth
                    multiline
                    rows={2}
                    placeholder="Write a reply..."
                    value={replyInputs[item.id] || ""}
                    onChange={(e) => handleReplyChange(item.id, e.target.value)}
                    variant="outlined"
                    sx={{ mb: 2 }}
                  />
                  <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
                    <Button size="small" onClick={() => toggleReplyInput(item.id)} sx={{ borderRadius: 2, textTransform: "none" }}>Cancel</Button>
                    <Button size="small" variant="contained" endIcon={<SendIcon />} onClick={() => handleAddReply(item.id)} disabled={!replyInputs[item.id]?.trim()} sx={{ borderRadius: 2, textTransform: "none" }}>Submit Reply</Button>
                  </Box>
                </Box>
              )}
              {item.replies && item.replies.length > 0 && (
                <Box sx={{ mt: 3, ml: 5 }}>
                  {item.replies.map((reply) => (
                    <Box key={reply.id} sx={{ mb: 3 }}>
                      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                        <Avatar sx={{ bgcolor: "#10b981", width: 32, height: 32, mr: 1.5 }}>{reply.author.firstName.charAt(0)}</Avatar>
                        <Box>
                          <Typography variant="subtitle2">{`${reply.author.firstName} ${reply.author.lastName}`}</Typography>
                          <Typography variant="caption" color="textSecondary">{reply.author.role} • {reply.date}</Typography>
                        </Box>
                      </Box>
                      <Typography variant="body2" sx={{ ml: 6 }}>{reply.content}</Typography>
                    </Box>
                  ))}
                </Box>
              )}
            </Paper>
          ))
        ) : (
          <Box sx={{ textAlign: "center", py: 4 }}>
            <Typography variant="body1" color="textSecondary">No feedback matches the current filter.</Typography>
          </Box>
        )}
      </Grid>
    </Grid>
  );
}