import { Student } from "../models/Student.js";
import { spawn } from "child_process";

export const predictStudentResult = async (req, res) => {
    try {
        const student = await Student.findOne({
            _id: req.params.studentId,
            teacher: req.teacher.id,
        });

        if (!student) {
            return res.status(404).json({ statusCode: 404, message: "Student not found" });
        }

        const py = spawn("python", [
            "./microservice/predict.py",
            student.attendance,
            student.studyHours,
            student.previousMarks,
            student.assignmentScore,
        ]);

        let output = "";

        py.stdout.on("data", (data) => {
            output += data.toString();
        });

        py.stderr.on("data", (err) => {
            console.error("Python error:", err.toString());
        });

        py.on("close", async () => {
            // Save prediction
            let outputResponse = {
                predictedResult: output.trim(),
                attendance: student.attendance,
                studyHours: student.studyHours,
                previousMarks: student.previousMarks,
                assignmentScore: student.assignmentScore,
            }
            student.predictions.push(outputResponse);
            await student.save();

            res.status(200).json({
                statusCode: 200,
                message: `Prediction done successfully.`,
                data: {
                    studentName: student.name,
                    prediction: outputResponse.predictedResult,
                }
            });
        });

    } catch (error) {
        res.status(500).json({ statusCode: 500, message: error.message });
    }
};
