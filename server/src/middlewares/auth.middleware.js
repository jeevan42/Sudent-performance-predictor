import jwt from "jsonwebtoken";
import { Teacher } from "../models/Teacher.js";

const protect = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer "))
        return res.status(401).json({ message: "No token provided" });

    try {
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.teacher = await Teacher.findById(decoded.id).select("-password");
        next();
    } catch (err) {
        res.status(401).json({ message: "Token invalid or expired" });
    }
};

export default protect;
