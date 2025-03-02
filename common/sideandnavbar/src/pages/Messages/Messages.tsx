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
