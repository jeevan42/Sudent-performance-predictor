import { Router } from 'express';
import protect from '../middlewares/auth.middleware.js';
import { addStudent, getStudents } from '../controllers/student.controller.js';

const router = Router();
router.post('/addStudent', protect, addStudent);
router.get('/', protect, getStudents);

export default router;
