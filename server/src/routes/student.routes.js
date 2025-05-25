import { Router } from 'express';
import protect from '../middlewares/auth.middleware';
import { addStudent, getStudents } from '../controllers/student.controller';

const router = Router();
router.post('/', protect, addStudent);
router.get('/', protect, getStudents);

export default { router };
