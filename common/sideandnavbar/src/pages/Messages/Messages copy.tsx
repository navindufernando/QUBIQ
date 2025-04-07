import React, { useState, useEffect, useRef } from 'react';
import { 
  Box, Typography, TextField, Button, Paper, List, ListItem, 
  ListItemText, InputAdornment, Avatar, IconButton, ThemeProvider, createTheme 
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import SearchIcon from '@mui/icons-material/Search';

// Types
interface Message {
  id: number;
  text: string;
  timestamp: string;
  sender: 'user' | 'ASANA';
  senderName: string;
  avatarUrl?: string;
}

interface Chat {
  id: number;
  name: string;
  is_group: boolean;
  last_message?: string;
  last_message_time?: string;
}

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
});

const ChatInbox = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const currentUserId = 4; // Assuming the current user has ID 4

  // Fetch chats on component mount
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/chats/${currentUserId}`);
        const data = await response.json();
        setChats(data);
        if (data.length > 0) {
          setSelectedChat(data[0]);
        }
      } catch (error) {
        console.error('Error fetching chats:', error);
      }
    };
    fetchChats();
  }, []);

  // Fetch messages when selected chat changes
  useEffect(() => {
    if (selectedChat) {
      const fetchMessages = async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/chats/${selectedChat.id}/messages`);
          const data = await response.json();
          setMessages(data);
        } catch (error) {
          console.error('Error fetching messages:', error);
        }
      };
      fetchMessages();
    }
  }, [selectedChat]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (newMessage.trim() && selectedChat) {
      try {
        const response = await fetch(`http://localhost:5000/api/chats/${selectedChat.id}/messages`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text: newMessage,
            senderId: currentUserId
          })
        });
        
        if (response.ok) {
          const newMsg = await response.json();
          setMessages([...messages, {
            id: newMsg.id,
            text: newMsg.text,
            timestamp: new Date(newMsg.sent_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            sender: 'user',
            senderName: 'You'
          }]);
          setNewMessage('');
        }
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/chats/search?query=${searchQuery}&userId=${currentUserId}`);
      const data = await response.json();
      setChats(data);
    } catch (error) {
      console.error('Error searching chats:', error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', width: '100%', height: 650, boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
        {/* Chat Inbox */}
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '75%', bgcolor: 'background.paper' }}>
          {/* Chat Header */}
          {selectedChat && (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2, borderBottom: 1, borderColor: 'divider' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar src="" alt={selectedChat.name} sx={{ width: 40, height: 40, mr: 1.5 }} />
                <Typography variant="subtitle1" fontWeight="medium">{selectedChat.name}</Typography>
              </Box>
            </Box>
          )}

          {/* Messages Container */}
          <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 2, bgcolor: '#f8f9fa', display: 'flex', flexDirection: 'column', gap: 2 }}>
            {messages.length > 0 ? (
              messages.map((message) => (
                <Box key={message.id} sx={{ display: 'flex', justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start' }}>
                  {message.sender !== 'user' && (
                    <Avatar src={message.avatarUrl} alt={message.senderName} sx={{ width: 32, height: 32, mr: 1, alignSelf: 'flex-end', mb: 0.5 }} />
                  )}
                  <Paper elevation={0} sx={{ 
                    maxWidth: '70%', 
                    p: 1.5, 
                    borderRadius: 2,
                    bgcolor: message.sender === 'user' ? '#9f86ff' : 'white',
                    color: message.sender === 'user' ? 'white' : 'inherit'
                  }}>
                    {message.sender !== 'user' && (
                      <Typography variant="caption" fontWeight="bold" sx={{ display: 'block', mb: 0.5 }}>
                        {message.senderName}
                      </Typography>
                    )}
                    <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.5 }}>
                      {message.text}
                    </Typography>
                    <Typography variant="caption" color={message.sender === 'user' ? 'rgba(255,255,255,0.8)' : 'text.secondary'} sx={{ mt: 0.5, display: 'block', textAlign: 'right' }}>
                      {message.timestamp}
                    </Typography>
                  </Paper>
                </Box>
              ))
            ) : (
              <Typography variant="body2" sx={{ textAlign: 'center', color: 'text.secondary', mt: 4 }}>
                {selectedChat ? 'No messages yet' : 'Select a chat to view messages'}
              </Typography>
            )}
            <div ref={messagesEndRef} />
          </Box>

          {/* Message Input */}
          {selectedChat && (
            <Box sx={{ p: 2, bgcolor: 'background.paper', borderTop: 1, borderColor: 'divider' }}>
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-end', bgcolor: '#f5f5f5', borderRadius: 2, p: 0.5, pl: 2 }}>
                <TextField
                  multiline
                  maxRows={4}
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type a message..."
                  fullWidth
                  variant="standard"
                  InputProps={{ disableUnderline: true }}
                />
                <IconButton onClick={handleSendMessage} sx={{ bgcolor: 'primary.main', color: 'white', borderRadius: 1.5, p: 1 }}>
                  <SendIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>
          )}
        </Box>

        {/* Right Sidebar */}
        <Box sx={{ width: '25%', height: '100%', bgcolor: '#E2DDFF', display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ p: 1, display: 'flex', alignItems: 'center' }}>
            <TextField
              placeholder="Search chats..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ fontSize: '0.8rem' }} />
                  </InputAdornment>
                ),
                sx: { bgcolor: 'background.paper', borderRadius: 1.5, fontSize: '0.7rem', height: '28px' }
              }}
              sx={{ width: '100%', maxWidth: '160px' }}
            />
          </Box>

          {/* Chat List */}
          <List sx={{ overflowY: 'auto', flexGrow: 1, padding: 0 }}>
            {chats.map(chat => (
              <ListItem 
                key={chat.id}
                onClick={() => setSelectedChat(chat)}
                sx={{ 
                  p: 1.5, 
                  cursor: 'pointer',
                  bgcolor: selectedChat?.id === chat.id ? '#D1C8FF' : 'transparent',
                  '&:hover': { bgcolor: '#D1C8FF' }
                }}
              >
                <Avatar sx={{ mr: 1.5, width: 36, height: 36 }} />
                <ListItemText 
                  primary={<Typography fontWeight="bold">{chat.name}</Typography>} 
                  secondary={
                    <Typography variant="caption" color="text.secondary" noWrap>
                      {chat.last_message?.substring(0, 25)}
                      {chat.last_message && chat.last_message.length > 25 ? '...' : ''}
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