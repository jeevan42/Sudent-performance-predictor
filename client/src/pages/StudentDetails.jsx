// import React, { useEffect, useState } from 'react';
// import API from '../services/api';
// import { useParams, useNavigate, Link } from 'react-router-dom';
// import { notifyError, notifySuccess } from '../services/toastNotifications';
// import { Card, CardContent, Typography, Button, CircularProgress, Container, Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

// function StudentDetails() {
//     const { id } = useParams();

//     useEffect(() => {
//         const fetchStudentDetails = async () => {
//             try {
//                 const response = await API.get(`/students/${id}`);
//                 console.log(`response`, response);
//                 // if (response?.data?.code === 200) {
//                 //     setPost(response?.data?.data);
//                 // } else {
//                 //     notifyError(response?.data?.message);
//                 // }
//             } catch (err) {
//                 notifyError(err?.response?.data?.message || 'Failed to student details');
//                 console.error('Failed to student details', err);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchStudentDetails();
//     }, [id]);


//     return (

//     );
// }

// export default StudentDetails;


import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Typography, Card, CardContent, Table, TableBody,
    TableCell, TableContainer, TableHead, TableRow,
    Paper, CircularProgress, Container, Box,
    CardActions,
    Button
} from '@mui/material';
import { notifyError, notifySuccess } from '../services/toastNotifications';

function StudentDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadingPrediction, setLoadingPrediction] = useState(false);

    const fetchStudentDetails = async () => {
        setLoading(true);
        try {
            const response = await API.get(`/students/${id}`);
            if (response?.data?.statusCode === 200) {
                setStudent(response?.data?.data);
            } else {
                notifyError(response?.data?.message);
            }
        } catch (err) {
            notifyError(err?.response?.data?.message || 'Failed to fetch student details');
        } finally {
            setLoading(false);
        }
    };


    // Handle Predict Result
    const handlePredictResult = async () => {
        setLoadingPrediction(true);

        try {
            const response = await API.post(`/predict/${id}`);
            console.log(`response`, response)
            const { message, data } = response?.data || {};

            if (response?.data?.statusCode === 200) {
                notifySuccess(`${message} → ${data?.studentName}: ${data?.prediction}`);
                fetchStudentDetails();
            } else {
                notifyError(message || 'An error occurred while predicting the result');
            }
        } catch (error) {
            notifyError(error?.response?.data?.message || 'An error occurred while predicting the result');
        } finally {
            setLoadingPrediction(false);
        }
    };

    useEffect(() => {
        fetchStudentDetails();
    }, [id]);
    if (loading) return <Box display="flex" justifyContent="center" mt={5}><CircularProgress /></Box>;
    if (!student) return null;

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Card sx={{ mb: 4 }}>
                <CardContent>
                    <Typography variant="h5" gutterBottom>Student Details</Typography>
                    <Typography><strong>Name:</strong> {student.name}</Typography>
                    <Typography><strong>Attendance:</strong> {student.attendance}%</Typography>
                    <Typography><strong>Study Hours:</strong> {student.studyHours} hrs</Typography>
                    <Typography><strong>Previous Marks:</strong> {student.previousMarks}</Typography>
                    <Typography><strong>Assignment Score:</strong> {student.assignmentScore}</Typography>

                </CardContent>
                <CardActions sx={{ justifyContent: 'end', px: 2 }}>

                    <Button size="small" variant="contained" color="primary"
                        onClick={() => navigate(`/students/edit/${id}`)}
                    >
                        Edit Details
                    </Button>
                    <Button size="small" variant="contained" color="primary"
                        onClick={() => handlePredictResult()}
                        disabled={loadingPrediction}
                    >
                        {loadingPrediction ? 'Predicting...' : 'Predict Result'}
                    </Button>
                </CardActions>
            </Card>

            <Typography variant="h6" gutterBottom>Prediction History</Typography>
            <TableContainer component={Paper}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>Attendance</TableCell>
                            <TableCell>Study Hours</TableCell>
                            <TableCell>Previous Marks</TableCell>
                            <TableCell>Assignment Score</TableCell>
                            <TableCell>Predicted Result</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {student.predictions.slice().reverse().map(pred => (
                            <TableRow key={pred._id}>
                                <TableCell>{new Date(pred.createdAt).toLocaleString()}</TableCell>
                                <TableCell>{pred.attendance}%</TableCell>
                                <TableCell>{pred.studyHours}</TableCell>
                                <TableCell>{pred.previousMarks}</TableCell>
                                <TableCell>{pred.assignmentScore}</TableCell>
                                <TableCell>
                                    <strong style={{ color: pred.predictedResult === 'Pass' ? 'green' : 'red' }}>
                                        {pred.predictedResult}
                                    </strong>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {!student.predictions.length ?
                <Typography variant="h6" sx={{ display: `flex`, justifyContent: 'center', marginTop: '10px' }} gutterBottom>No Prediction History</Typography>
                : ''}
        </Container>
    );
}

export default StudentDetails;
