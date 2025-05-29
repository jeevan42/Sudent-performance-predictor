import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import API from '../services/api';
import { TextField, Button, Container, Typography } from '@mui/material';
import { notifyError, notifySuccess } from '../services/toastNotifications';
import { useParams, useNavigate } from 'react-router-dom';

const EditStudentForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState({
    name: '',
    attendance: '',
    studyHours: '',
    previousMarks: '',
    assignmentScore: '',
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);


  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await API.get(`/students/${id}`);
        const data = response?.data?.data;
        setInitialValues({
          name: data?.name || '',
          attendance: data?.attendance || '',
          studyHours: data?.studyHours || '',
          previousMarks: data?.previousMarks || '',
          assignmentScore: data?.assignmentScore || '',
        });
      } catch (err) {
        notifyError(err?.response?.data?.message || 'Failed to fetch student');
      } finally {
        setLoading(false);
      }
    };
    fetchStudent();
  }, [id]);

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    attendance: Yup.number().min(0).max(100).required('Attendance is required'),
    studyHours: Yup.number().min(0).required('Study hours required'),
    previousMarks: Yup.number().min(0).max(100).required('Previous marks required'),
    assignmentScore: Yup.number().min(0).max(10).required('Assignment score required'),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      setSubmitting(true);
      try {
        const response = await API.patch(`/students/update/${id}`, values);
        if (response?.data?.statusCode === 200) {
          notifySuccess(response?.data?.message || 'Student updated successfully');
          navigate(`/students/${id}`);
        } else {
          notifyError(response?.data?.message);
        }
      } catch (err) {
        notifyError(err?.response?.data?.message || 'Update failed');
      } finally {
        setSubmitting(false);
      }
    },
  });

  if (loading) return <p>Loading...</p>;

  return (
    <Container maxWidth="sm" style={{ marginTop: '40px' }}>
      <Typography variant="h5" gutterBottom>Edit Student</Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          name="name"
          label="Name"
          variant="outlined"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />

        <TextField
          fullWidth
          margin="normal"
          name="attendance"
          label="Attendance (%)"
          type="number"
          variant="outlined"
          value={formik.values.attendance}
          onChange={formik.handleChange}
          error={formik.touched.attendance && Boolean(formik.errors.attendance)}
          helperText={formik.touched.attendance && formik.errors.attendance}
        />

        <TextField
          fullWidth
          margin="normal"
          name="studyHours"
          label="Study Hours"
          type="number"
          variant="outlined"
          value={formik.values.studyHours}
          onChange={formik.handleChange}
          error={formik.touched.studyHours && Boolean(formik.errors.studyHours)}
          helperText={formik.touched.studyHours && formik.errors.studyHours}
        />

        <TextField
          fullWidth
          margin="normal"
          name="previousMarks"
          label="Previous Marks"
          type="number"
          variant="outlined"
          value={formik.values.previousMarks}
          onChange={formik.handleChange}
          error={formik.touched.previousMarks && Boolean(formik.errors.previousMarks)}
          helperText={formik.touched.previousMarks && formik.errors.previousMarks}
        />

        <TextField
          fullWidth
          margin="normal"
          name="assignmentScore"
          label="Assignment Score"
          type="number"
          variant="outlined"
          value={formik.values.assignmentScore}
          onChange={formik.handleChange}
          error={formik.touched.assignmentScore && Boolean(formik.errors.assignmentScore)}
          helperText={formik.touched.assignmentScore && formik.errors.assignmentScore}
        />

        <Button
          color="primary"
          variant="contained"
          fullWidth
          type="submit"
          style={{ marginTop: '20px' }}
          disabled={submitting}
        >
          {submitting ? `Updating Student...` : `Update Student`}
        </Button>
      </form>
    </Container>
  );
};

export default EditStudentForm;
