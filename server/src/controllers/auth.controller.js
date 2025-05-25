import jwt from "jsonwebtoken";
import Teacher from "../models/Teacher.js";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existing = await Teacher.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already in use" });

    const teacher = await Teacher.create({ name, email, password });
    res.status(201).json({
      token: generateToken(teacher._id),
      teacher: { id: teacher._id, name: teacher.name, email: teacher.email },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const teacher = await Teacher.findOne({ email });
    if (!teacher || !(await teacher.comparePassword(password)))
      return res.status(400).json({ message: "Invalid credentials" });

    res.status(200).json({
      token: generateToken(teacher._id),
      teacher: { id: teacher._id, name: teacher.name, email: teacher.email },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
