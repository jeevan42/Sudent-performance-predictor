import React, { useEffect, useState } from 'react';
import API from './../services/api';
import { Link, useNavigate } from 'react-router-dom';
import { notifyError, notifySuccess } from './../services/toastNotifications';
import {
    Card,
    CardContent,
    CardActions,
    Typography,
    Button,
    Grid,
    CircularProgress,
    Container,
    Box,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Stack,
    Chip,
} from '@mui/material';

function Dashboard() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true); // To manage loading state
    const [currentPage, setCurrentPage] = useState(1); // Current page
    const [totalPosts, setTotalPosts] = useState(0); // Total number of posts
    const [postsPerPage, setPostsPerPage] = useState(10); // Number of posts per page
    const [loadingPredictionIds, setLoadingPredictionIds] = useState([]);

    useEffect(() => {
        const fetchStudents = async () => {
            setLoading(true); // Start loading
            try {
                const offset = (currentPage - 1) * postsPerPage; // Correctly calculate offset
                const response = await API.get(`/students`);
                // const response = await API.get(`/students/all-posts?offset=${offset}&limit=${postsPerPage}`);
                // console.log(`response`, response)
                if (response?.data?.statusCode === 200) {
                    setData(response?.data?.data || []); // Use empty array if data is undefined/null
                    setTotalPosts(response?.data?.total || 0); // Get total posts count
                } else {
                    notifyError(response?.data?.message || 'Failed to fetch students list');
                }
            } catch (error) {
                notifyError(error?.response?.data?.message || 'An error occurred while fetching students list');
            } finally {
                setLoading(false); // Set loading to false when done
            }
        };
        fetchStudents();
    }, [currentPage, postsPerPage]); // Fetch posts whenever the current page or postsPerPage changes

    // Calculate total number of pages
    const totalPages = Math.ceil(totalPosts / postsPerPage);

    // Handle page change
    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page); // Update current page
        }
    };

    // Handle limit change
    const handleLimitChange = (event) => {
        setPostsPerPage(event.target.value); // Update posts per page
        setCurrentPage(1); // Reset to first page when limit changes
    };

    // Handle Predict Result
    const handlePredictResult = async (studentId) => {
        setLoadingPredictionIds((prev) => [...prev, studentId]);

        try {
            const response = await API.post(`/predict/${studentId}`);
            // console.log(`response`, response)
            const { message, data } = response?.data || {};

            if (response?.data?.statusCode === 200) {
                notifySuccess(`${message} → ${data?.studentName}: ${data?.prediction}`);
                window.location.reload()
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
            <Typography variant="h3" gutterBottom align="center" mt={4}>
                Students List
            </Typography>
            <div className="flex w-100 mt-2 justify-end">
                <Button size="small" variant="contained" color="primary"
                    onClick={() => navigate(`/students/add`)}
                >
                    Add Student
                </Button>
            </div>
            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
                    <CircularProgress />
                </div>
            ) : data.length > 0 ? (
                // <Grid container spacing={4} mt={2}>
                //     {data.map((student) => {
                //         let { name = '', attendance = 0, studyHours = 0, previousMarks = 0, assignmentScore = 0, predictions = [] } = student;
                //         return (
                //             <Grid item xs={12} sm={6} md={4} key={student?._id}>
                //                 <Card>
                //                     <CardContent>
                //                         <Typography variant="h5" gutterBottom>
                //                             {name}
                //                         </Typography>
                //                         <Typography variant="body2" color="textSecondary">
                //                             Attendance:  {attendance}
                //                         </Typography>
                //                         <Typography variant="body2" color="textSecondary">
                //                             Study Hours:  {studyHours}
                //                         </Typography>
                //                         <Typography variant="body2" color="textSecondary">
                //                             Previous Marks:  {previousMarks}
                //                         </Typography>
                //                         <Typography variant="body2" color="textSecondary">
                //                             Assignment Score:  {assignmentScore}
                //                         </Typography>
                //                         <Typography variant="body2" color="textSecondary">
                //                             Recent Prediction:  {predictions?.[0]?.predictedResult || "--"}
                //                         </Typography>
                //                     </CardContent>
                //                     <CardActions>
                //                         <Button size="small" color="primary" onClick={() => navigate(`/students/${student?._id}`)}>
                //                             View Details
                //                         </Button>
                //                         <Button size="small" color="primary">
                //                             Predict Result
                //                         </Button>
                //                     </CardActions>
                //                 </Card>
                //             </Grid>
                //         )
                //     })}
                // </Grid>
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
                                        <div className='flex justify-between items-center'>
                                            <Typography variant="h6" fontWeight="bold" gutterBottom>
                                                {name}
                                            </Typography>
                                            <svg
                                                onClick={() => navigate(`/students/edit/${_id}`)}
                                                aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" className="cursor-pointer octicon octicon-pencil">
                                                <path d="M11.013 1.427a1.75 1.75 0 0 1 2.474 0l1.086 1.086a1.75 1.75 0 0 1 0 2.474l-8.61 8.61c-.21.21-.47.364-.756.445l-3.251.93a.75.75 0 0 1-.927-.928l.929-3.25c.081-.286.235-.547.445-.758l8.61-8.61Zm.176 4.823L9.75 4.81l-6.286 6.287a.253.253 0 0 0-.064.108l-.558 1.953 1.953-.558a.253.253 0 0 0 .108-.064Zm1.238-3.763a.25.25 0 0 0-.354 0L10.811 3.75l1.439 1.44 1.263-1.263a.25.25 0 0 0 0-.354Z"></path>
                                            </svg>
                                        </div>
                                        <Stack spacing={1} mb={2}>
                                            <Typography variant="body2" color="text.secondary">
                                                Attendance: <strong>{attendance}%</strong>
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Study Hours: <strong>{studyHours} hrs</strong>
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Previous Marks: <strong>{previousMarks}</strong>
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Assignment Score: <strong>{assignmentScore}</strong>
                                            </Typography>
                                        </Stack>

                                        <Typography variant="body2" fontWeight="500" mt={1} component={'span'}>
                                            Recent Prediction:{' '}
                                            {latestPrediction?.predictedResult ? (
                                                <Chip
                                                    label={latestPrediction.predictedResult}
                                                    color={latestPrediction.predictedResult === 'Pass' ? 'success' : 'error'}
                                                    size="small"
                                                    sx={{ fontWeight: 'bold' }}
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
                                        {/* <Button size="small" variant="contained" color="primary"
                                            onClick={() => handlePredictResult(_id)}
                                            disabled={loadingPredictionIds.length}
                                        >
                                            {loadingPredictionIds.includes(_id) ? 'Predicting...' : 'Predict Result'}

                                        </Button> */}
                                    </CardActions>
                                </Card>
                            </Grid>
                        );
                    })}
                </Grid>

            ) : (
                <Typography variant="h6" align="center" color="textSecondary" mt={4}>
                    No data available.
                </Typography>
            )}

            {/* Pagination Controls */}
            {/* <Box display="flex" justifyContent="center" marginTop={4}>
                <Button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </Button>
                <Typography variant="h6" style={{ margin: '0 10px' }}>
                    Page {currentPage} of {totalPages}
                </Typography>
                <Button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </Button>
            </Box> */}
            {/* Select for Posts Limit */}
            {/* <FormControl variant="outlined" fullWidth>
                <InputLabel id="posts-per-page-label">Posts Per Page</InputLabel>
                <Select
                    labelId="posts-per-page-label"
                    value={postsPerPage}
                    onChange={handleLimitChange}
                    label="Posts Per Page"
                >
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={15}>15</MenuItem>
                    <MenuItem value={20}>20</MenuItem>
                </Select>
            </FormControl> */}
        </Container>
    );
}

export default Dashboard;