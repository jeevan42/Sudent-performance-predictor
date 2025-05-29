import React, { useState } from 'react';
import {
    Container, Box, Typography, Button, Dialog, DialogTitle,
    DialogContent, DialogContentText, DialogActions
} from '@mui/material';
import { notifySuccess, notifyError } from '../services/toastNotifications';

const Header = () => {
    const name = localStorage.getItem('name');
    const [open, setOpen] = useState(false);

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
                        onClick={() => setOpen(true)}
                        sx={{ textTransform: 'none' }}
                    >
                        Log out
                    </Button>
                </Box>
            </Container>

            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Confirm Logout</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to log out?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} color="primary">Cancel</Button>
                    <Button onClick={handleLogout} color="error" variant="contained">Logout</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Header;
