import React, { useState, useRef, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Paper, 
  List,
  ListItem,
  ListItemText,
  InputAdornment,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  ThemeProvider,
  createTheme
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import SearchIcon from '@mui/icons-material/Search';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MoreVertIcon from '@mui/icons-material/MoreVert';

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
  
  // Menu state
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(menuAnchorEl);
  
  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };
  
  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

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
      <Box sx={{ display: 'flex', width: '100%', height: 650, boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
        {/* Chat Inbox */}
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '75%', bgcolor: 'background.paper' }}>
          {/* Chat Header */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            p: 2, 
            borderBottom: 1, 
            borderColor: 'divider',
            bgcolor: 'background.paper'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar 
                src="" 
                alt={selectedChat?.name}
                sx={{ width: 40, height: 40, mr: 1.5 }}
              />
              <Box>
                <Typography variant="subtitle1" fontWeight="medium">
                  {selectedChat ? selectedChat.name : 'Select a chat'}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {selectedChat ? 'Last seen 25 min ago' : ''}
                </Typography>
              </Box>
            </Box>
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          </Box>

          {/* Messages Container */}
          <Box sx={{ 
            flexGrow: 1, 
            overflowY: 'auto', 
            p: 2, 
            bgcolor: '#f8f9fa', 
            display: 'flex', 
            flexDirection: 'column', 
            gap: 2
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
                  {message.sender !== 'user' && (
                    <Avatar 
                      src="" 
                      alt={selectedChat.name}
                      sx={{ 
                        width: 32, 
                        height: 32, 
                        mr: 1,
                        alignSelf: 'flex-end',
                        mb: 0.5
                      }}
                    />
                  )}
                  <Paper 
                    elevation={0}
                    sx={{ 
                      maxWidth: '70%', 
                      p: 1.5, 
                      borderRadius: 2,
                      bgcolor: message.sender === 'user' ? '#9f86ff' : 'white',
                      color: message.sender === 'user' ? 'white' : 'inherit',
                      boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
                    }}
                  >
                    <Typography 
                      variant="body2" 
                      sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.5 }}
                    >
                      {message.text}
                    </Typography>
                    <Typography 
                      variant="caption" 
                      color={message.sender === 'user' ? 'rgba(255,255,255,0.8)' : 'text.secondary'} 
                      sx={{ mt: 0.5, display: 'block', textAlign: 'right' }}
                    >
                      {message.timestamp}
                    </Typography>
                  </Paper>
                </Box>
              ))
            ) : (
              <Typography variant="body2" sx={{ textAlign: 'center', color: 'text.secondary', mt: 4 }}>
                Select a chat to view messages
              </Typography>
            )}
            <div ref={messagesEndRef} />
          </Box>

          {/* Message Input */}
          {selectedChat && (
            <Box sx={{ 
              p: 2, 
              bgcolor: 'background.paper', 
              borderTop: 1, 
              borderColor: 'divider' 
            }}>
              <Box sx={{ 
                display: 'flex', 
                gap: 1, 
                alignItems: 'flex-end', 
                bgcolor: '#f5f5f5', 
                borderRadius: 2, 
                p: 0.5, 
                pl: 2 
              }}>
                <TextField
                  multiline
                  maxRows={4}
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type a message..."
                  fullWidth
                  variant="standard"
                  InputProps={{
                    disableUnderline: true,
                    sx: { 
                      fontSize: '0.9rem', 
                      fontFamily: "'Segoe UI', sans-serif",
                      minHeight: '36px',
                      maxHeight: '100px',
                      pt: 0.75,
                      pb: 0.75
                    }
                  }}
                />
                <IconButton size="small" sx={{ color: 'text.secondary', mr: 0.5 }}>
                  <AttachFileIcon fontSize="small" />
                </IconButton>
                <IconButton 
                  onClick={handleSendMessage}
                  sx={{ 
                    bgcolor: 'primary.main', 
                    color: 'white',
                    borderRadius: 1.5,
                    p: 1,
                    '&:hover': {
                      bgcolor: 'primary.dark',
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
          <Box sx={{ 
            p: 1, 
            display: 'flex', 
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <TextField
              placeholder="Search chats..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ fontSize: '0.8rem' }} />
                  </InputAdornment>
                ),
                sx: { 
                  bgcolor: 'background.paper', 
                  borderRadius: 1.5,
                  fontSize: '0.7rem',
                  height: '28px',
                  '& .MuiOutlinedInput-input': {
                    padding: '4px 8px 4px 0'
                  }
                }
              }}
              sx={{
                width: '75%',
                maxWidth: '160px',
                '& .MuiInputAdornment-root': {
                  marginRight: 0
                }
              }}
            />
            <IconButton 
              size="small"
              onClick={handleMenuClick}
              aria-controls={open ? "options-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              sx={{ 
                color: 'primary.dark',
                bgcolor: 'background.paper',
                width: 28,
                height: 28
              }}
            >
              <MoreVertIcon fontSize="small" />
            </IconButton>
            <Menu
              id="options-menu"
              anchorEl={menuAnchorEl}
              open={open}
              onClose={handleMenuClose}
              MenuListProps={{
                'aria-labelledby': 'options-button',
              }}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              PaperProps={{
                sx: {
                  bgcolor: '#f5f5f5',
                  width: 180,
                  mt: 0.5,
                  boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                  '& .MuiMenuItem-root': {
                    fontSize: '0.9rem',
                    py: 1
                  }
                }
              }}
            >
              <MenuItem onClick={handleMenuClose}>Create a group</MenuItem>
              <MenuItem onClick={handleMenuClose}>Delete messages</MenuItem>
              <MenuItem onClick={handleMenuClose}>Personal chats</MenuItem>
              <MenuItem onClick={handleMenuClose}>Board meetings</MenuItem>
            </Menu>
          </Box>

          {/* Chat List */}
          <List sx={{ 
            overflowY: 'auto', 
            flexGrow: 1,
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
                <Avatar sx={{ mr: 1.5, width: 36, height: 36 }} />
                <ListItemText 
                  primary={<Typography fontWeight="bold">{chat.name}</Typography>} 
                  secondary={
                    <Typography variant="caption" color="text.secondary" noWrap>
                      {chat.messages[chat.messages.length-1]?.text.substring(0, 25)}
                      {chat.messages[chat.messages.length-1]?.text.length > 25 ? '...' : ''}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default ChatInbox;