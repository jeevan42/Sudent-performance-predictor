import { Student } from '../models/Student.js';

export const addStudent = async (req, res) => {
    try {
        const { name, attendance, studyHours, previousMarks, assignmentScore } = req.body;

        const student = new Student({
            teacher: req.teacher.id, // set via protect middleware
            name,
            attendance,
            studyHours,
            previousMarks,
            assignmentScore,
        });

        await student.save();
        res.status(201).json(student);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getStudents = async (req, res) => {
    try {
        const students = await Student.find({ teacher: req.teacher.id });
        res.json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
