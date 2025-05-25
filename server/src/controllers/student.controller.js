// controllers/student.controller.js
import Student from '../models/student.model.js';

export const addStudent = async (req, res) => {
  try {
    const { name, attendance, study_hours, previous_marks, assignment_score } = req.body;

    const student = new Student({
      teacher: req.teacher.id, // set via protect middleware
      name,
      attendance,
      study_hours,
      previous_marks,
      assignment_score,
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
