import React, { useEffect, useState } from 'react';
import API from './../services/api';
import { Link, useNavigate } from 'react-router-dom';
import { notifyError, notifySuccess } from './../services/toastNotifications';
import {
    Card, CardContent, CardActions, Typography, Button, Grid, CircularProgress,
    Container, TextField, Stack, Chip, Pagination, Box
} from '@mui/material';

function Dashboard() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingPredictionIds, setLoadingPredictionIds] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [nameFilter, setNameFilter] = useState('');

    const fetchStudents = async (page = 1, name = '') => {
        setLoading(true);
        try {
            const response = await API.get(`/students`, {
                params: { page, limit: 6, name }
            });
            if (response?.data?.statusCode === 200) {
                setData(response?.data?.data || []);
                setTotalPages(response?.data?.pagination?.totalPages || 1);
            } else {
                notifyError(response?.data?.message || 'Failed to fetch students list');
            }
        } catch (error) {
            notifyError(error?.response?.data?.message || 'An error occurred while fetching students list');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStudents(page, nameFilter);
    }, [page]);

    const handleFilter = () => {
        setPage(1);
        fetchStudents(1, nameFilter);
    };

    const handlePredictResult = async (studentId) => {
        setLoadingPredictionIds((prev) => [...prev, studentId]);
        try {
            const response = await API.post(`/predict/${studentId}`);
            const { message, data } = response?.data || {};
            if (response?.data?.statusCode === 200) {
                notifySuccess(`${message} → ${data?.studentName}: ${data?.prediction}`);
                fetchStudents(page, nameFilter);
            } else {
                notifyError(message || 'An error occurred while predicting the result');
            }
        } catch (error) {
            notifyError(error?.response?.data?.message || 'An error occurred while predicting the result');
        } finally {
            setLoadingPredictionIds((prev) => prev.filter((id) => id !== studentId));
        }
    };

    return (
        <Container>
            <Typography variant="h3" gutterBottom align="center" mt={4}>Students List</Typography>

            <Stack direction="row" spacing={2} justifyContent="space-between" mt={2} mb={2}>
                <div className='flex'>
                    <TextField
                        label="Search by name"
                        variant="outlined"
                        size="small"
                        value={nameFilter}
                        onChange={(e) => setNameFilter(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter') handleFilter(); }}
                    />
                    <Button sx={{ marginLeft: `15px` }} variant="contained" size="small" onClick={handleFilter}>Search</Button>
                </div>
                <Button size="small" variant="contained" color="primary" onClick={() => navigate(`/students/add`)}>
                    Add Student
                </Button>
            </Stack>

            {loading ? (
                <Box display="flex" justifyContent="center" mt={4}><CircularProgress /></Box>
            ) : data.length > 0 ? (
                <>
                    <Grid container spacing={4} mt={2}>
                        {data.map((student) => {
                            const {
                                _id,
                                name = '',
                                attendance = 0,
                                studyHours = 0,
                                previousMarks = 0,
                                assignmentScore = 0,
                                predictions = [],
                            } = student;
                            const latestPrediction = predictions?.[0];

                            return (
                                <Grid item xs={12} sm={6} md={4} key={_id}>
                                    <Card elevation={4} sx={{ borderRadius: 3 }}>
                                        <CardContent>
                                            <Box display="flex" justifyContent="space-between">
                                                <Typography variant="h6" fontWeight="bold">{name}</Typography>
                                                <svg
                                                    onClick={() => navigate(`/students/edit/${_id}`)}
                                                    className="cursor-pointer" height="16" width="16" viewBox="0 0 16 16"
                                                >
                                                    <path d="M11.013 1.427a1.75 1.75 0 0 1 2.474 0l1.086 1.086a1.75 1.75 0 0 1 0 2.474l-8.61 8.61c-.21.21-.47.364-.756.445l-3.251.93a.75.75 0 0 1-.927-.928l.929-3.25c.081-.286.235-.547.445-.758l8.61-8.61Zm.176 4.823L9.75 4.81l-6.286 6.287a.253.253 0 0 0-.064.108l-.558 1.953 1.953-.558a.253.253 0 0 0 .108-.064Zm1.238-3.763a.25.25 0 0 0-.354 0L10.811 3.75l1.439 1.44 1.263-1.263a.25.25 0 0 0 0-.354Z"></path>
                                                </svg>
                                            </Box>

                                            <Stack spacing={1} mt={2} mb={2}>
                                                <Typography variant="body2">Attendance: <strong>{attendance}%</strong></Typography>
                                                <Typography variant="body2">Study Hours: <strong>{studyHours} hrs</strong></Typography>
                                                <Typography variant="body2">Previous Marks: <strong>{previousMarks}</strong></Typography>
                                                <Typography variant="body2">Assignment Score: <strong>{assignmentScore}</strong></Typography>
                                            </Stack>

                                            <Typography variant="body2" fontWeight="500" component={'span'}>
                                                Recent Prediction:{' '}
                                                {latestPrediction?.predictedResult ? (
                                                    <Chip
                                                        label={latestPrediction.predictedResult}
                                                        color={latestPrediction.predictedResult === 'Pass' ? 'success' : 'error'}
                                                        size="small"
                                                    />
                                                ) : (
                                                    <Chip label="--" variant="outlined" size="small" />
                                                )}
                                            </Typography>
                                        </CardContent>

                                        <CardActions sx={{ justifyContent: 'space-between', px: 2 }}>
                                            <Button size="small" onClick={() => navigate(`/students/${_id}`)}>
                                                View Details
                                            </Button>
                                            {
                                                loadingPredictionIds.includes(_id)
                                                    ?
                                                    <Button size="small" variant="contained" color="primary"
                                                    >
                                                        {'Predicting...'}

                                                    </Button>
                                                    :
                                                    <Button size="small" variant="contained" color="primary"
                                                        onClick={() => handlePredictResult(_id)}
                                                        disabled={loadingPredictionIds.length}
                                                    >
                                                        {'Predict Result'}

                                                    </Button>
                                            }
                                        </CardActions>
                                    </Card>
                                </Grid>
                            );
                        })}
                    </Grid>

                    <Box display="flex" justifyContent="center" mt={4}>
                        <Pagination
                            count={totalPages}
                            page={page}
                            onChange={(e, value) => setPage(value)}
                            color="primary"
                        />
                    </Box>
                </>
            ) : (
                <Typography variant="h6" align="center" color="textSecondary" mt={4}>
                    No data available.
                </Typography>
            )}
        </Container>
    );
}

export default Dashboard;
