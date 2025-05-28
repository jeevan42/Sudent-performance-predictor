import mongoose from 'mongoose';
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
        res.status(201).json({
            statusCode: 201,
            message: "Student added successfully",
            data: student
        });
    } catch (error) {
        res.status(500).json({ statusCode: 500, message: error.message });
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

        if (!student) return res.status(404).json({ statusCode: 404, message: "Student not found or unauthorized" });

        res.status(200).json({ statusCode: 200, message: "Student updated successfully", data: student });
    } catch (error) {
        console.error(error);
        res.status(500).json({ statusCode: 500, message: "Something went wrong" });
    }
};

export const getStudents = async (req, res) => {
    try {
        // const students = await Student.find({ teacher: req.teacher.id });
        const students = await Student.aggregate([
            {
                $match: {
                    teacher: new mongoose.Types.ObjectId(req.teacher.id)
                }
            },
            {
                $addFields: {
                    predictions: {
                        $sortArray: {
                            input: "$predictions",
                            sortBy: { createdAt: -1 } // Descending order
                        }
                    }
                }
            }
        ]);

        res.status(200).json({
            statusCode: 200,
            message: 'Students list fetched',
            data: students || []
        });
    } catch (error) {
        res.status(500).json({ statusCode: 500, message: error.message });
    }
};

export const getStudentDetails = async (req, res) => {
    try {
        const student = await Student.findOne({
            _id: req.params.studentId,
            teacher: req.teacher.id,
        });

        if (!student) return res.status(404).json({ statusCode: 404, message: "Student not found" });

        res.status(200).json({
            statusCode: 200,
            message: 'Student details fetched',
            data: student
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ statusCode: 500, message: "Something went wrong" });
    }
};
