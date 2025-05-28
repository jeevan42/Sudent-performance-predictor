import React, { useEffect, useState } from 'react';
import API from './../services/api';
import { Link } from 'react-router-dom';
import { notifyError } from './../services/toastNotifications';
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
} from '@mui/material';

function Dashboard() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true); // To manage loading state
    const [currentPage, setCurrentPage] = useState(1); // Current page
    const [totalPosts, setTotalPosts] = useState(0); // Total number of posts
    const [postsPerPage, setPostsPerPage] = useState(10); // Number of posts per page

    useEffect(() => {
        const fetchStudents = async () => {
            setLoading(true); // Start loading
            try {
                const offset = (currentPage - 1) * postsPerPage; // Correctly calculate offset
                const response = await API.get(`/students`);
                // const response = await API.get(`/students/all-posts?offset=${offset}&limit=${postsPerPage}`);
                console.log(`response`, response)
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

    // Handle like/unlike post
    const handleLikePost = async (postId, isLiked) => {
        try {
            // const response = await API.post(`/posts/like-post/${postId}`);
            // if (response?.data?.code === 200) {
            setPosts((prevPosts) =>
                prevPosts.map((post) =>
                    post?._id === postId ? { ...post, isLiked: !isLiked } : post
                )
            )
            // } else {
            //     notifyError(response?.data?.message || 'Failed to update your action on post');
            // }
        } catch (error) {
            notifyError(error?.response?.data?.message || 'An error occurred while liking the post');
        }
    };

    return (
        <Container>
            <Typography variant="h3" gutterBottom align="center" mt={4}>
                Students List
            </Typography>

            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
                    <CircularProgress />
                </div>
            ) : data.length > 0 ? (
                <Grid container spacing={4} mt={2}>
                    {data.map((student) => {
                        let { name = '', attendance = 0, studyHours = 0, previousMarks = 0, assignmentScore = 0, predictions = [] } = student;
                        return (
                            <Grid item xs={12} sm={6} md={4} key={student?._id}>
                                <Card>
                                    <CardContent>
                                        <Typography variant="h5" gutterBottom>
                                            {name}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            Attendance:  {attendance}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            Study Hours:  {studyHours}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            Previous Marks:  {previousMarks}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            Assignment Score:  {assignmentScore}
                                        </Typography>
                                         <Typography variant="body2" color="textSecondary">
                                            Recent Prediction:  {predictions?.[0]?.predictedResult || "--"}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small" color="primary" component={Link} to={`/students/${student?._id}`}>
                                            View Details
                                        </Button>
                                        {/* <Button
                                            size="small"
                                            color="secondary"
                                            onClick={() => handleLikePost(post?._id, post?.isLiked)} // Toggle like
                                        >
                                            {post?.isLiked ? (
                                                <i className="bi bi-heart-fill" style={{ color: 'red' }}></i> // Filled heart
                                            ) : (
                                                <i className="bi bi-heart" style={{ color: 'black' }}></i> // Unfilled heart
                                            )}
                                        </Button> */}
                                    </CardActions>
                                </Card>
                            </Grid>
                        )
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