import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Grid, 
  Avatar, 
  Paper, 
  Stack, 
  Container,
  InputAdornment,
  Pagination,
  Link,
  useTheme,
  ThemeProvider,
  createTheme,
  alpha
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const theme = createTheme({
  palette: {
    primary: {
      main: '#9f86ff',
      light: '#c8b6ff',
    },
    background: {
      default: '#ffffff',
    },
    text: {
      primary: '#222',
    },
  },
  typography: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
});

interface TeamMemberType {
  id: number;
  imageUrl: string;
  name: string;
}
