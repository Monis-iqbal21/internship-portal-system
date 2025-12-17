import express from "express";
import { studentApply, studentDashboard, studentTaskSubmission } from "../controllers/studentController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.put("/apply", verifyToken, studentApply);
router.get("/dashboard/tasks", verifyToken, studentDashboard);
router.post("/dashboard/task-submission/:taskId", verifyToken, studentTaskSubmission);
router.get("/dashboard/test", (req, res) => {
    res.json({ message: "Student dashboard test route is working" });

})
export default router;