import express from "express";
import { predictStudentResult } from "../controllers/predict.controller.js";
import protect from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/:studentId", protect, predictStudentResult);

export default router;
