import React, { useState, useRef, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Paper, 
  Divider,
  List,
  ListItem,
  ListItemText,
  InputAdornment,
  Avatar,
  Container,
  IconButton,
  Stack,
  ThemeProvider,
  createTheme
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import SearchIcon from '@mui/icons-material/Search';


const theme = createTheme({
  palette: {
    primary: {
      main: '#9f86ff',
      light: '#c8b6ff',
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
    text: {
      primary: '#222',
    },
  },
  typography: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
});
interface Message {
  id: number;
  text: string;
  timestamp: string;
  sender: 'user' | 'ASANA';
}

interface Chat {
  id: number;
  name: string;
  messages: Message[];
}

const ChatInbox = () => {
  const [chats, setChats] = useState<Chat[]>([
    {
      id: 1,
      name: 'Inuthi',
      messages: [
        {
          id: 1,
          text: "Hi Navindu,\nAre you free for a quick call?",
          timestamp: "10:34 AM",
          sender: "ASANA"
        },
        {
          id: 2,
          text: "Yes, I'm free",
          timestamp: "8:54 PM",
          sender: "user"
        }
      ]
    },
    {
      id: 2,
      name: 'Timothy',
      messages: [
        {
          id: 3,
          text: "I will schedule a meeting",
          timestamp: "9:38 PM",
          sender: "ASANA"
        }
      ]
    },
    {
      id: 3,
      name: 'ASANA',
      messages: [
        {
          id: 4,
          text: "Reminder on today's design review meeting",
          timestamp: "1:05 PM",
          sender: "ASANA"
        }
      ]
    }
  ]);

  const [selectedChat, setSelectedChat] = useState<Chat | null>(chats[0]);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [selectedChat?.messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedChat) {
      const message: Message = {
        id: selectedChat.messages.length + 1,
        text: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sender: 'user'
      };
      const updatedChat = {
        ...selectedChat,
        messages: [...selectedChat.messages, message]
      };
      setChats(chats.map(chat => chat.id === updatedChat.id ? updatedChat : chat));
      setSelectedChat(updatedChat);
      setNewMessage('');
    }
  };
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', width: '100%', height: 650 }}>
        {/* Chat Inbox */}
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '75%', bgcolor: 'background.paper' }}>
          {/* Chat Header */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            p: 1.5, 
            borderBottom: 1, 
            borderColor: 'divider',
            bgcolor: 'background.paper'
          }}>
            <Typography variant="body2" color="text.secondary">
              {selectedChat ? `${selectedChat.name} - last seen 25 min ago` : 'Select a chat'}
            </Typography>
            <Avatar 
              src="" // Replace with your logo URL
              alt="Profile"
              sx={{ width: 32, height: 32 }}
            />
          </Box>
{/* Messages Container */}
<Box sx={{ 
            flexGrow: 1, 
            overflowY: 'auto', 
            p: 1.5, 
            bgcolor: 'background.paper', 
            display: 'flex', 
            flexDirection: 'column', 
            gap: 1.5 
          }}>
            {selectedChat ? (
              selectedChat.messages.map((message) => (
                <Box 
                  key={message.id} 
                  sx={{ 
                    display: 'flex', 
                    justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                  }}
                >
                  <Paper 
                    elevation={0}
                    sx={{ 
                      maxWidth: '70%', 
                      p: 1, 
                      borderRadius: 2,
                      border: 1,
                      borderColor: 'divider'
                    }}
                  >
                    {message.sender !== 'user' && (
                      <Typography 
                        variant="subtitle2" 
                        sx={{ color: 'orange', fontWeight: 600, mb: 0.5 }}
                      >
                        {selectedChat?.name}
                      </Typography>
                    )}
                    <Typography 
                      variant="body2" 
                      sx={{ whiteSpace: 'pre-wrap' }}
                    >
                      {message.text}
                    </Typography>
                    <Typography 
                      variant="caption" 
                      color="text.secondary" 
                      sx={{ mt: 0.5, display: 'block' }}
                    >
                      {message.timestamp}
                    </Typography>
                  </Paper>
                </Box>
              ))
            ) : (
              <Typography variant="body2">Select a chat to view messages</Typography>
            )}
            <div ref={messagesEndRef} />
          </Box>
 {/* Message Input */}
 {selectedChat && (
            <Box sx={{ 
              p: 1.5, 
              bgcolor: 'background.paper', 
              borderTop: 1, 
              borderColor: 'divider' 
            }}>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <TextField
                  multiline
                  maxRows={4}
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Write a message..."
                  fullWidth
                  size="small"
                  InputProps={{
                    sx: { 
                      fontSize: '0.875rem', 
                      minHeight: '36px',
                      maxHeight: '100px'
                    }
                  }}
                />
                <IconButton 
                  onClick={handleSendMessage}
                  sx={{ 
                    bgcolor: 'primary.light', 
                    color: 'primary.dark',
                    p: 1,
                    '&:hover': {
                      bgcolor: 'primary.main',
                    }
                  }}
                >
                  <SendIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>
          )}
        </Box>

{/* Right Sidebar */}
<Box sx={{ 
          width: '25%', 
          height: '100%', 
          bgcolor: '#E2DDFF',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <Box sx={{ p: 1.5 }}>
            <TextField
              placeholder="Search chats..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              fullWidth
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
                sx: { 
                  bgcolor: 'background.paper', 
                  borderRadius: 2,
                  fontSize: '0.875rem'
                }
              }}
            />
          </Box>

          {/* Chat List */}
          <List sx={{ 
            overflowY: 'auto', 
            height: 'calc(100% - 400px)',
            padding: 0
          }}>
            {filteredChats.map(chat => (
              <ListItem 
                key={chat.id}
                onClick={() => setSelectedChat(chat)}
                sx={{ 
                  p: 1.5, 
                  cursor: 'pointer',
                  bgcolor: selectedChat?.id === chat.id ? '#D1C8FF' : 'transparent',
                  '&:hover': {
                    bgcolor: '#D1C8FF'
                  }
                }}
              >
                <ListItemText 
                  primary={<Typography fontWeight="bold">{chat.name}</Typography>} 
                />
              </ListItem>
            ))}
          </List>
