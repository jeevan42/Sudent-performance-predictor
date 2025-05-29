import React from 'react';
import { Container, Box, Typography, Button } from '@mui/material';
import { notifySuccess, notifyError } from '../services/toastNotifications';

const Header = () => {
  const name = localStorage.getItem('name');

  const handleLogout = async () => {
    try {
      localStorage.clear();
      notifySuccess('Logged Out Successfully');
    } catch (error) {
      notifyError('Something went wrong !!');
    } finally {
      window.location.reload();
    }
  };

  return (
    <Box sx={{ bgcolor: '#f9f9f9', py: 2, borderBottom: '1px solid #ddd' }}>
      <Container maxWidth="lg">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" fontWeight="bold" color="primary">
            👨‍🏫 {name}
          </Typography>
          <Button
            variant="contained"
            color="error"
            onClick={handleLogout}
            sx={{ textTransform: 'none' }}
          >
            Log out
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Header;
