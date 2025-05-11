import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Person as PersonIcon,
  QrCodeScanner as QrCodeIcon,
  CardGiftcard as GiftIcon,
  CloudUpload as UploadIcon,
} from '@mui/icons-material';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Event Management System
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            color="inherit"
            component={RouterLink}
            to="/"
            startIcon={<DashboardIcon />}
          >
            Dashboard
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/check-in"
            startIcon={<QrCodeIcon />}
          >
            Check In
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/kit-collection"
            startIcon={<GiftIcon />}
          >
            Kit Collection
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/attendees"
            startIcon={<PersonIcon />}
          >
            Attendees
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/upload"
            startIcon={<UploadIcon />}
          >
            Upload
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 