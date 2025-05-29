import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import API from '../../services/api';
import { Link } from 'react-router-dom';
import { TextField, Button, Container, Typography } from '@mui/material';
import { notifyError, notifySuccess } from '../../services/toastNotifications';

const Register = () => {
    const [isSubmitting, setIsSubmitting] = useState(false); // State to track submission
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('name is required'),
            email: Yup.string().email('Invalid email format').required('Email is required'),
            password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
        }),
        onSubmit: async (values) => {
            setIsSubmitting(true);
            try {
                const response = await API.post('/auth/register', values);
                // console.log(`/auth/register response`, response);
                if (response?.data?.statusCode === 201) {
                    notifySuccess(response?.data?.message)
                    localStorage.setItem('token', response?.data?.token);
                    localStorage.setItem('userId', response?.data?.teacher?.id);
                    localStorage.setItem('name', response?.data?.teacher?.name);
                    window.location.href = '/';
                } else {
                    notifyError(response?.data?.message)
                }
            } catch (err) {
                notifyError(err?.response?.data?.message || `Something went wrong`)
                console.error('Registration failed', err);
            } finally {
                setIsSubmitting(false);
            }
        },
    });

    return (
        <Container maxWidth="sm" style={{ marginTop: '50px' }}>
            <Typography variant="h4" gutterBottom>
                Teacher Register
            </Typography>
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    fullWidth
                    margin="normal"
                    id="name"
                    name="name"
                    label="name"
                    variant="outlined"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                />

                <TextField
                    fullWidth
                    margin="normal"
                    id="email"
                    name="email"
                    label="Email"
                    variant="outlined"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                />

                <TextField
                    fullWidth
                    margin="normal"
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    variant="outlined"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                />

                <Button color="primary" variant="contained" fullWidth type="submit" disabled={isSubmitting} >
                    {isSubmitting ? 'Submitting...' : 'Register'} {/* Dynamic button text */}
                </Button>
            </form>
            <div className='d-flex w-100 mt-2 justify-content-end'>
                <span className='me-2'>Already have an account</span>  <Link to="/login">Log in</Link><span className='ms-2'>here.</span>
            </div>
        </Container>
    );
};

export default Register;
