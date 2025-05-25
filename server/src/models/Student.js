import mongoose from "mongoose";

const predictionSchema = new mongoose.Schema({
    attendance: Number,
    studyHours: Number,
    previousMarks: Number,
    assignmentScore: Number,
    predictedResult: String, // 'Pass' or 'Fail'
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher',
        required: true
    },
    attendance: Number,
    studyHours: Number,
    previousMarks: Number,
    assignmentScore: Number,
    predictions: [predictionSchema]
});

export const Student = mongoose.model('Student', studentSchema);
