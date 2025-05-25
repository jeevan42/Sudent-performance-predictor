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

export const updateStudentData = async (req, res) => {
    try {
        const { studentId } = req.params;
        const { name, attendance, studyHours, previousMarks, assignmentScore } = req.body;

        const student = await Student.findOneAndUpdate(
            { _id: studentId, teacher: req.teacher.id },
            { name, attendance, studyHours, previousMarks, assignmentScore },
            { new: true }
        );

        if (!student) return res.status(404).json({ message: "Student not found or unauthorized" });

        res.json({ message: "Student updated", student });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
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

export const getStudentDetails = async (req, res) => {
    try {
        const student = await Student.findOne({
            _id: req.params.studentId,
            teacher: req.teacher.id,
        });

        if (!student) return res.status(404).json({ message: "Student not found" });

        res.json({ student });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};
