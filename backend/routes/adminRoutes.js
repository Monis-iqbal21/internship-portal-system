import express, { application } from "express";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import { applicationsHandler, applicationsapprovehandler , submittedApplicationsHandler} from "../controllers/adminController.js";

const router = express.Router();

router.get("/dashboard", protect, adminOnly, (req, res) => {
  res.json({ message: `Welcome, Admin ${req.user.name}` });
});
router.get("/applications", protect, adminOnly, applicationsHandler);
router.put("/approve/:userId", protect, adminOnly, applicationsapprovehandler);
router.get("/dashboard/submitted-applications/submissions", protect, adminOnly, submittedApplicationsHandler);


export default router;
